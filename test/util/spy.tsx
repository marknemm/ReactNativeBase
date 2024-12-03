/**
 * Stubs all methods of a class instance instance.
 *
 * @template T The class instance type.
 * @param instance The class instance.
 * @returns The class instance with all methods stubbed.
 */
export function stubAllMethods<T = any>(instance: T): T {
  const proto = Object.getPrototypeOf(instance);
  const methodNames = Object.getOwnPropertyNames(proto).filter(
    (prop) => typeof proto[prop] === 'function' && prop !== 'constructor'
  );

  methodNames.forEach((methodName) => {
    jest.spyOn(instance, methodName as any).mockImplementation(() => undefined);
  });

  return instance;
}
