/**
 * A class representing an {@link Error} with a code.
 *
 * @extends Error The built-in JavaScript {@link Error} class.
 */
export class CodedError extends Error {

  /**
   * The error code.
   */
  #code = '';

  /**
   * Constructs a new {@link CodedError} instance.
   *
   * @param message The error message.
   * @param options The error options.
   */
  constructor(message: string, options: CodedErrorOptions = {}) {
    super(message);
    this.#code = options?.code || '';
  }

  /**
   * The error code.
   *
   * @readonly
   */
  get code(): string {
    return this.#code;
  }

}

/**
 * The {@link CodedError} options.
 *
 * @extends ErrorOptions The built-in JavaScript {@link ErrorOptions}.
 */
export interface CodedErrorOptions extends ErrorOptions {

  /**
   * The error code.
   */
  code?: string;

}
