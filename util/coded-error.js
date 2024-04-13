/**
 * A class representing an {@link Error} with a code.
 */
export class CodedError extends Error {

  #code = '';

  /**
   * Constructs a new {@link CodeError} instance.
   *
   * @param {string} message The error message.
   * @param {ErrorOptions & { code: string }} [options] The error options.
   */
  constructor(message, options) {
    super(message);
    this.#code = options?.code || '';
  }

  /**
   * The error code.
   *
   * @readonly
   */
  get code() {
    return this.#code;
  }

}
