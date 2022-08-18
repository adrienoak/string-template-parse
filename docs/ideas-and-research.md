## If i ever want to add other options:

#### Match only last occurence
[idea][https://stackoverflow.com/questions/38490160/find-last-occurrence-of-regex-word)

```ts
/(\btotal\b)(?!.*\b\1\b)/
```


Non Greedy multiple lookbehind
https://stackoverflow.com/questions/1232220/how-to-non-greedy-multiple-lookbehind-matches

#### Whitespaces not newlines
https://stackoverflow.com/questions/3583111/regular-expression-find-spaces-tabs-space-but-not-newlines
```ts
[\t]
```