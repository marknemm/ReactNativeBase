import { Props as ModalProps } from '@components/modal/props';

export { ModalProps };

/**
 * Infers the `TResult` type from a `ModalProps` template type.
 *
 * @template TProps The `ModalProps` type.
 */
export type InferTResult<TProps> = TProps extends ModalProps<infer TResult>
                                 ? TResult
                                 : any;

/**
 * The `Modal` render function type.
 * Takes either a render function or a functional component.
 *
 * - The render function receives a `onClose` callback to close the modal and returns JSX that is to be rendered.
 *
 * - The functional component receives the `ModalProps` and returns JSX that is to be rendered.
 *
 * @template TProps The `ModalProps` type.
 * @template TResult The type of the result of the modal prompt.
 */
export type ModalRenderFn<TProps, TResult> = ((onClose: (result?: TResult) => void) => React.ReactNode)
                                           | React.FunctionComponent<TProps>
