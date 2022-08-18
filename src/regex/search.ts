const constructCenter = "(.*?)";

export function makeSearch([left, right]: string[]) {
  return new RegExp(left + constructCenter + right, "g");
}
