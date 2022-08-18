export type Divider = "curlies" | "parens" | "square";

export function makeTemplateDivider(divider: Divider = "curlies") {
  if (!validateEquals(divider)) {
    return ["{", "}"];
  }
  switch (divider) {
    case "curlies": {
      return ["{", "}"];
    }
    case "parens": {
      return ["\\(", "\\)"];
    }
    case "square": {
      return ["\\[", "\\]"];
    }

    default: {
      return ["{", "}"];
    }
  }
}

export function validateEquals(input: string) {
  const paramsArr: Divider[] = ["curlies", "parens", "square"];
  return paramsArr.some((e) => e === input);
}
