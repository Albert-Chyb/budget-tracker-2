import {
  ControllerRenderProps,
  FieldPathValue,
  FieldValues,
  Path,
} from 'react-hook-form';

/**
 * A type that extends `ControllerRenderProps` from `react-hook-form`
 * to enforce a specific value type for a field.
 *
 * This type ensures that the `ControllerRenderProps` is only valid
 * if the value of the specified field matches the expected value type `TValue`.
 *
 * @template TFields - The type of all fields in the form. Extends `FieldValues` provided by `react-hook-form`.
 * @template TFieldPath - The type of the path to the specific field in `TFields`. This is a string that represents
 *                        the nested field name (e.g., "user.name").
 * @template TValue - The expected type of the value for the field specified by `TFieldPath`.
 *
 * @example
 * // Example usage:
 * type Props = ControllerRenderPropsWithValue<{ age: number }, "age", number>;
 * // This ensures that the 'age' field in the form has a numeric value.
 */
export type ControllerRenderPropsWithValue<
  TFields extends FieldValues,
  TFieldPath extends Path<TFields>,
  TValue
> = FieldPathValue<TFields, TFieldPath> extends TValue
  ? ControllerRenderProps<TFields, TFieldPath>
  : never;
