type Arg = {
  keys: string[];
  leftAndRight: [string, string];
  eager?: boolean | false;
  behindAndAhead?: [string, string];
};

export function regexMatcher({
  keys,
  leftAndRight: [left, right],
  eager = true,
  behindAndAhead: [behind, ahead] = ["", ""],
}: Arg) {
  return keys
    .map((e) => {
      let base = left + e + right;
      if (eager) {
        base = behind + base + ahead;
      }
      // noCurliesBehind + left + e + right + noCurliesAhead;

      return base;
    })
    .join("|");
}
