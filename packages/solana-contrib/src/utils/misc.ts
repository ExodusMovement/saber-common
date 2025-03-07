const noop = () => {
  // noop
};

/**
 * Hide the console.error because @solana/web3.js often emits noisy errors as a
 * side effect.
 */
export const suppressConsoleErrorAsync = async <T>(
  fn: () => Promise<T>
): Promise<T> => {
  const oldConsoleError = console.error;
  console.error = noop;
  try {
    const result = await fn();
    console.error = oldConsoleError;
    return result;
  } catch (e) {
    console.error = oldConsoleError;
    throw e;
  }
};

/**
 * Hide the console.error because @solana/web3.js often emits noisy errors as a
 * side effect.
 */
export const suppressConsoleError = <T>(fn: () => T): T => {
  const oldConsoleError = console.error;
  console.error = noop;
  try {
    const result = fn();
    console.error = oldConsoleError;
    return result;
  } catch (e) {
    console.error = oldConsoleError;
    throw e;
  }
};

/**
 * Checks to see if the provided value is not null.
 *
 * Useful for preserving types in filtering out non-null values.
 *
 * @param value
 * @returns
 */
export const isNotNull = <TValue>(value: TValue | null): value is TValue => {
  return value !== null;
};

/**
 * Checks to see if the provided value is not undefined.
 *
 * @param value
 * @returns
 */
export const isNotUndefined = <TValue>(
  value: TValue | undefined
): value is TValue => {
  return value !== undefined;
};

/**
 * Checks to see if the provided value is not null or undefined.
 *
 * @param value
 * @returns
 */
export const exists = <TValue>(
  value: TValue | null | undefined
): value is TValue => {
  return value !== null && value !== undefined;
};

/**
 * Applies a function to a null/undefined inner value if it is null or undefined,
 * otherwise returns null/undefined.
 *
 * @param obj
 * @param fn
 * @returns
 */
export const mapSome = <T, U>(
  obj: NonNullable<T> | null | undefined,
  fn: (obj: NonNullable<T>) => U
): U | null | undefined => (exists(obj) ? fn(obj) : obj);

/**
 * Applies a function to a list of null/undefined values, unwrapping the null/undefined value or passing it through.
 */
export const mapN = <T extends unknown[], U>(
  fn: (
    ...a: {
      [K in keyof T]: NonNullable<T[K]>;
    }
  ) => U,
  ...args: T
): U | null | undefined => {
  if (!args.every((arg) => arg !== undefined)) {
    return undefined;
  }
  if (!args.every((arg) => arg !== null)) {
    return null;
  }
  return fn(
    ...(args as {
      [K in keyof T]: NonNullable<T[K]>;
    })
  );
};
