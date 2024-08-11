import { useEffect, useState } from 'react';
import { z } from 'zod';

/**
 * A custom React hook that manages a value in local storage with validation using a Zod schema.
 *
 * @template TOutput The type of the value after parsing with the Zod schema.
 * @param config The configuration object for the hook.
 * @returns A tuple containing the current value and a function to update it.
 */
export function useLocalStorage<TOutput>({
  key,
  zodSchema,
  initialValue,
}: LocalStorageConfig<TOutput>) {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);

    return localValue ? zodSchema.parse(localValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, String(value));
  }, [key, value]);

  return [value, setValue] as const;
}

/**
 * Creates a Zod schema that transforms a string into a boolean value based on a given flag.
 * @param trueFlag The string that should be interpreted as `true`
 * @returns  A Zod schema that transforms the input string into a boolean.
 */
export function zodBooleanSchema(
  trueFlag: string
): ZodLocalStorageSchema<boolean> {
  return z.string().transform((v) => v === trueFlag);
}

/** A Zod schema type that always receives a string as input and transforms it to a specified output type. */
export type ZodLocalStorageSchema<TOutput> = z.ZodType<
  TOutput,
  z.ZodTypeDef,
  string
>;

export type LocalStorageConfig<TOutput> = {
  /** The key used to store and retrieve the value from local storage.  */
  key: string;

  /**
   * The initial value to use when the specified key is not present in local storage.
   * This value must be convertible to a string using the `String()` function.
   */
  initialValue: TOutput;

  /** A Zod schema used to validate and parse the raw value from local storage. */
  zodSchema: ZodLocalStorageSchema<TOutput>;
};
