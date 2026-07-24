// lib/errors.js — Consistent error handling for councilorg engine modules

/**
 * Standard error codes for structured error handling.
 */
export const ErrorCode = {
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION: 'VALIDATION_ERROR',
  PARSE: 'PARSE_ERROR',
  IO: 'IO_ERROR',
  STATE: 'STATE_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR',
};

/**
 * A Result type for safe error propagation.
 * @template T
 * @template E
 */
export class Result {
  /** @private
   * @param {boolean} ok
   * @param {T|null} value
   * @param {E|null} error
   * @param {string} [code]
   */
  constructor(ok, value, error, code) {
    /** @type {boolean} */
    this.ok = ok;
    /** @type {T|null} */
    this.value = value;
    /** @type {E|null} */
    this.error = error;
    /** @type {string|undefined} */
    this.code = code;
  }

  /** Create a successful Result.
   * @template T
   * @param {T} value
   * @returns {Result<T, never>}
   */
  static ok(value) {
    return /** @type {Result<T, never>} */ (new Result(true, value, null));
  }

  /** Create a failed Result.
   * @template E
   * @param {E} error
   * @returns {Result<never, E>}
   */
  static fail(error) {
    return /** @type {Result<never, E>} */ (new Result(false, null, error));
  }

  /**
   * Create a failed Result with a structured error code.
   * @param {string} code - One of ErrorCode values
   * @param {*} error - Error message or Error object
   * @returns {Result<never, *>}
   */
  static failWithCode(code, error) {
    const result = new Result(false, null, error, code);
    return /** @type {Result<never, *>} */ (result);
  }

  /** True if the operation succeeded. */
  get isOk() { return this.ok; }

  /** True if the operation failed. */
  get isFail() { return !this.ok; }

  /**
   * Check if this failed result has a matching error code.
   * @param {string} code
   * @returns {boolean}
   */
  hasCode(code) { return !this.ok && this.code === code; }

  /**
   * Unwrap the value or throw the error.
   * Use only when the caller wants to propagate the exception.
   */
  unwrap() {
    if (!this.ok) throw this.error;
    return this.value;
  }

  /**
   * Return the value or a default.
   * @param {T} fallback
   */
  unwrapOr(fallback) {
    return this.ok ? this.value : fallback;
  }
}

/**
 * Wrap a synchronous operation that may throw into a Result.
 * @template T
 * @param {() => T} fn
 * @returns {Result<T, Error>}
 */
export function tryCatch(fn) {
  try {
    return Result.ok(fn());
  } catch (err) {
    return Result.fail(err instanceof Error ? err : new Error(String(err)));
  }
}

/**
 * Read and parse a JSON file safely, returning a Result.
 * @param {(path: string, encoding: string) => string} readFileFn - Bound readFileSync
 * @param {string} path - File path
 * @returns {Result<any, Error>}
 */
export function tryReadJson(readFileFn, path) {
  return tryCatch(() => JSON.parse(readFileFn(path, 'utf-8')));
}
