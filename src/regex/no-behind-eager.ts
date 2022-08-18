import { Divider, validateEquals } from "./template-divider";

export function noBehindEager(
  [left, right]: string[],
  divider: Divider = "curlies"
): [string, string] {
  const isValidDivider = validateEquals(divider);

  if (!isValidDivider) {
    return [`\(?<!{)`, `\(?!})`];
  }

  return [`\(?<!${left})`, `\(?!${right})`];
}
