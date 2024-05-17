import { MAX_CHAR } from '@constants/string';
import { DBCompositeFilter, DBDocData, DBFilter, DBFilterOptions, DBFilters, DBOrderBy, DBOrderByOptions, DBQueryOptions, DBQueryOptionsState, DBQueryResult, FirestoreCompositeFilterFn, FirestoreQueryFilter } from '@interfaces/db';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { logErr } from '@util/log';
import { toTitleCase } from '@util/string';
import deepMerge from 'deepmerge';

export * from '@interfaces/db';

const and: FirestoreCompositeFilterFn = firestore.Filter.and as any;
const or: FirestoreCompositeFilterFn = firestore.Filter.or as any;

/**
 * Gets a document from a remote DB collection.
 * May return locally cached data if offline.
 *
 * @template TRaw The type of the raw queried document data.
 * @template T The (refined) type of the queried data.
 * @param collectionPath A slash-separated path to a collection.
 * @param documentPath A slash-separated path to a document.
 * @param map A function to map the raw document data to the desired type.
 * @returns A promise that resolves to the queried document data.
 * @throws An error is thrown if the operation unexpectedly fails.
 */
export async function getDBDoc<TRaw extends DBDocData = DBDocData, T = TRaw>(
  collectionPath: string,
  documentPath: string,
  map: (doc: TRaw) => T = (doc) => doc as any
): Promise<T> {
  const snapshot = await firestore().collection<TRaw>(collectionPath).doc(documentPath).get();
  return map(toDBDoc(snapshot));
}

/**
 * Lists documents in a remote DB collection.
 *
 * @template TRaw The type of the raw queried document data.
 * @template T The (refined) type of the queried data.
 * @param collectionPath A slash-separated path to a collection.
 * @param options The {@link DBQueryOptions}.
 * @param map A function to map the raw document data to the desired type.
 * @returns A promise that resolves to a {@link DBQueryResult}.
 */
export async function listDBDocs<TRaw extends DBDocData = DBDocData, T = TRaw>(
  collectionPath: string,
  {
    filters,
    limit,
    orderBy,
    startAfter,
  }: DBQueryOptions<TRaw> = {},
  map: (doc: TRaw) => T = (doc) => doc as any
): Promise<DBQueryResult<T>> {
  let query: FirebaseFirestoreTypes.Query<TRaw> = firestore().collection<TRaw>(collectionPath);

  for (const whereFilter of genWhereFilters(filters)) {
    query = query.where(whereFilter);
  }

  if (limit != null) {
    query = query.limit(limit);
  }

  for (const orderByArgList of genOrderByArgLists(orderBy)) {
    query = query.orderBy(...orderByArgList);
  }

  if (startAfter != null) {
    query = query.startAfter(startAfter);
  }

  const querySnapshot = await query.get();
  return {
    cursor: querySnapshot.docs[querySnapshot.docs.length - 1],
    items: querySnapshot.docs.map((doc) =>
      map(toDBDoc(doc))
    ),
  };
}

/**
 * Generates Firestore query filters from given {@link filters} options.
 *
 * @param filters The {@link DBFilterOptions} to apply to the query.
 * @param baseFieldPath The base field path to prepend to each filter field path.
 * @returns An array of Firestore query filters.
 */
export function genWhereFilters(filters: DBFilterOptions, baseFieldPath = ''): FirestoreQueryFilter[] {
  if (!filters) return [];
  if (Array.isArray(filters)) return filters;

  const whereFilters: FirestoreQueryFilter[] = [];

  for (const [fieldPath, filter] of Object.entries(filters || {})) {
    const filterKeys = Object.keys(filter);

    // e.g. filter => 'str_to_match_with_=='
    if (!(filter instanceof Object)) {
      whereFilters.push(firestore.Filter(`${baseFieldPath}${fieldPath}`, '==', filter));
    // e.g. filter => { operator: '>=', value: 123 }.
    } else if (filterKeys.length === 2 && filterKeys.includes('operator') && filterKeys.includes('value')) {
      const dbFilter = filter as DBFilter;
      switch (dbFilter.operator) { // Handle custom operators.
      case 'starts-with':
        if (dbFilter.value) {
          whereFilters.push(
            firestore.Filter(`${baseFieldPath}${fieldPath}`, '>=', dbFilter.value),
            firestore.Filter(`${baseFieldPath}${fieldPath}`, '<=', `${dbFilter.value}${MAX_CHAR}`)
          );
        }
        break;
      case 'starts-with-i':
        if (dbFilter.value) {
          whereFilters.push(or(
            and(
              firestore.Filter(`${baseFieldPath}${fieldPath}`, '>=', dbFilter.value),
              firestore.Filter(`${baseFieldPath}${fieldPath}`, '<=', `${dbFilter.value}${MAX_CHAR}`)
            ),
            and(
              firestore.Filter(`${baseFieldPath}${fieldPath}`, '>=', dbFilter.value.toLowerCase()),
              firestore.Filter(`${baseFieldPath}${fieldPath}`, '<=', `${dbFilter.value.toLowerCase()}${MAX_CHAR}`)
            ),
            and(
              firestore.Filter(`${baseFieldPath}${fieldPath}`, '>=', toTitleCase(dbFilter.value)),
              firestore.Filter(`${baseFieldPath}${fieldPath}`, '<=', `${toTitleCase(dbFilter.value)}${MAX_CHAR}`)
            )
          ));
        }
        break;
      default:
        whereFilters.push(firestore.Filter(`${baseFieldPath}${fieldPath}`, dbFilter.operator, dbFilter.value));
      }
    // e.g. filter => { operator: 'OR', filters: [ { ... }, { ... } ] }
    } else if (filterKeys.length === 2 && filterKeys.includes('operator') && filterKeys.includes('filters')) {
      const dbCompositeFilter = filter as DBCompositeFilter;
      const operatorFn = (dbCompositeFilter.operator === 'OR')
        ? or
        : and;
      whereFilters.push(operatorFn(...genWhereFilters(dbCompositeFilter.filters, baseFieldPath)));
    // e.g. filter => { subfield: { ... } }
    } else {
      whereFilters.push(...genWhereFilters(filter as DBFilters, `${baseFieldPath}${fieldPath}.`));
    }
  }

  return whereFilters;
}

/**
 * Generates order-by argument lists from given {@link orderBy} options.
 *
 * @template T The type of the document data.
 * @param orderBy The {@link DBOrderByOptions} to apply to the query.
 * @returns An array of {@link OrderByArgList order-by argument lists}.
 */
function genOrderByArgLists<T>(orderBy: DBOrderByOptions<T>): OrderByArgList<T>[] {
  if (!orderBy) return null;

  const orderByArgLists: OrderByArgList<T>[] = [];
  const orderByOptions = Array.isArray(orderBy)
    ? orderBy
    : [orderBy];

  for (const orderByOption of orderByOptions) {
    if (orderByOption instanceof Object && Object.hasOwn(orderByOption, 'fieldPath')) {
      const dbOrderBy = orderBy as DBOrderBy<T>;
      orderByArgLists.push([dbOrderBy.fieldPath as string, dbOrderBy.direction ?? 'asc']);
    }
    orderByArgLists.push([orderByOption as string | FirebaseFirestoreTypes.FieldPath, 'asc']);
  }

  return orderByArgLists;
}

/**
 * Listens for changes in a document in a remote DB collection.
 * If the document does not yet exist, listens for it to be created.
 *
 * @template T The type of the document data.
 * @param collectionPath A slash-separated path to a collection.
 * @param documentPath A slash-separated path to a document.
 * @param onSuccess A callback function that receives the {@link DBDocData}.
 * @param onError A callback function that receives an {@link Error} if the operation fails.
 * @returns A function that unsubscribes the listener.
 */
export function listenDBDoc<T extends DBDocData = DBDocData>(
  collectionPath: string,
  documentPath: string,
  onSuccess: (docData: T) => void,
  onError = (error: Error) => logErr('Failed to listen for document:', error)
): () => void {
  return firestore().collection<T>(collectionPath).doc(documentPath).onSnapshot(
    (snapshot) => {
      if (snapshot.exists) {
        const docData = toDBDoc(snapshot);
        onSuccess(docData);
      }
    },
    onError
  );
}

/**
 * Creates a new document in a remote DB collection.
 *
 * @param collectionPath A slash-separated path to a collection.
 * @param docData The document data to create.
 * @returns A promise that resolves to the new document's unique ID.
 */
export async function createDBDoc<T extends FirebaseFirestoreTypes.DocumentData = FirebaseFirestoreTypes.DocumentData>(
  collectionPath: string,
  docData: T
): Promise<string> {
  const docRef = await firestore().collection<T>(collectionPath).add(docData);
  return docRef.id;
}

/**
 * Sets a document in a remote DB collection.
 * If the document does not yet exist, it will be created.
 *
 * @template T The type of the document data.
 * @param collectionPath A slash-separated path to a collection.
 * @param documentPath A slash-separated path to a document.
 * @param docData The document data to set.
 * @param options The set options that specify merge strategies.
 * @returns A promise that resolves when the operation is complete.
 */
export async function setDBDoc<T extends FirebaseFirestoreTypes.DocumentData = FirebaseFirestoreTypes.DocumentData>(
  collectionPath: string,
  documentPath: string,
  docData: FirebaseFirestoreTypes.SetValue<T>,
  options: FirebaseFirestoreTypes.SetOptions = {}
): Promise<void> {
  await firestore().collection<T>(collectionPath).doc(documentPath).set(docData, options);
}

/**
 * Merges a given {@link mergeValue} into given {@link queryOptionsState}.
 *
 * @template TData The type of the query data.
 * @template TFilters The type of the filters to apply to the query.
 * @param queryOptionsState The {@link DBQueryOptionsState} to merge into.
 * @param mergeValue The value to merge into the {@link DBQueryOptionsState}. If falsy, no merge is performed.
 * @param merge A function to merge the {@link mergeValue} into the {@link DBQueryOptions}.
 * If not given, the {@link mergeValue} is assumed to be a {@link DBQueryOptions} and is merged as-is.
 */
export function mergeQueryOptions<
  TData = any,
  TFilters extends DBFilterOptions = DBFilterOptions<TData>
>(
  {
    setFilters,
    setLimit,
    setOrderBy,
    setStartAfter,
  }: DBQueryOptionsState<TData, TFilters>,
  mergeValue: any,
  merge?: (value: any) => DBQueryOptions<TData, TFilters>
): void {
  if (!mergeValue) return; // No merge value to apply

  const mergeOptions = merge?.(mergeValue)
                    ?? mergeValue as DBQueryOptions<TData, TFilters>;

  setFilters((prevFilters) => (mergeOptions.filters
    ? deepMerge<TFilters>(prevFilters, mergeOptions.filters)
    : (mergeOptions.filters === null)
      ? null
      : prevFilters
  ));

  setLimit((prevLimit) => (mergeOptions.limit !== undefined
    ? mergeOptions.limit
    : prevLimit
  ));

  setOrderBy((prevOrderBy) => (mergeOptions.orderBy !== undefined
    ? mergeOptions.orderBy
    : prevOrderBy
  ));

  setStartAfter((prevStartAfter) => (mergeOptions.startAfter !== undefined
    ? mergeOptions.startAfter
    : prevStartAfter
  ));
}

/**
 * Converts raw document data to a DBDoc object.
 * Adds the `documentId` property to the document data.
 *
 * @template T The type of the document data.
 * @param docSnapshot The Firebase {@link FirebaseFirestoreTypes.DocumentSnapshot DocumentSnapshot}.
 * @returns The DBDoc object.
 */
function toDBDoc<T extends DBDocData = DBDocData>(docSnapshot: FirebaseFirestoreTypes.DocumentSnapshot<T>): T {
  const data = docSnapshot.data();
  data.id = docSnapshot.id;
  return data;
}

/**
 * An order-by argument list.
 *
 * @template T The type of the document data.
 */
type OrderByArgList<T = any> = [string | FirebaseFirestoreTypes.FieldPath | keyof T, 'asc' | 'desc'];
