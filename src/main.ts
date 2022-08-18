import {
  makeTemplateDivider,
  makeRepetition,
  noBehindEager,
  makeSearch,
  Divider,
  regexMatcher,
} from "./regex";

type ContentParserConfig = {
  number?: number;
  divider?: Divider;
  eager?: boolean;
  // onlyLast?: boolean;
};

export function contentParser(
  input: string,
  varMap: Record<string, string> = {},
  {
    number,
    divider,
    eager,
  }: // onlyLast
  ContentParserConfig = {
    divider: "curlies",
    number: 2,
    eager: true,
    // onlyLast: false,
  }
): string {
  const keys = Object.keys(varMap);
  if (!keys.length) {
    return input;
  }

  const templateDivider = makeTemplateDivider(divider);
  const repetition = makeRepetition(templateDivider, number);
  const regBase = regexMatcher({
    keys,
    eager,
    leftAndRight: repetition,
    behindAndAhead: noBehindEager(templateDivider, divider),
  });

  const regex = new RegExp(regBase, "g");

  return input.replace(regex, (matched) => {
    const regex = makeSearch(repetition);

    const inside = regex.exec(matched);

    if (!inside) {
      return matched;
    }

    return varMap[inside[1].trim()];
  });
}
