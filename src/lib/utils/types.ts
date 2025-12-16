/**
 * Overwrite property type with the second argument.
 * @example
 * ```ts
 * type OverwrittenType = Overwrite<
 *   { a: string; b: number; },
 *   { b: boolean; },
 * >; // { a: string; b: boolean; }
 * ```
 */
export type Overwrite<
  BASETYPE,
  NEWTYPE extends Record<string | number | symbol, unknown>,
> = Omit<BASETYPE, keyof NEWTYPE> & NEWTYPE;
