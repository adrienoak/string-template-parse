export const optionalWhiteSpace = `\[ \t]\*`;

export function makeRepetition(
  [left, right]: string[],
  times = 2
): [string, string] {
  return [
    (left + optionalWhiteSpace).repeat(times),
    (optionalWhiteSpace + right).repeat(times),
  ];
}
