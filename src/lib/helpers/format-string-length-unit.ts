/**
 * Formats a length unit (e.g., the number of characters) based on the numerical value,
 * according to the grammatical rules of the Polish language. Returns the appropriate
 * singular or plural form depending on the value.
 *
 * @param length - The length to format (e.g., number of characters).
 * @returns  - A formatted string representing the appropriate unit of length in Polish (e.g., "znak", "znaki", "znaków").
 */
export function formatStringLengthUnit(length: number | bigint): string {
  switch (new Intl.PluralRules('pl-PL').select(Number(length))) {
    case 'one':
      return 'znak';

    case 'few':
      return 'znaki';

    default:
      return 'znaków';
  }
}
