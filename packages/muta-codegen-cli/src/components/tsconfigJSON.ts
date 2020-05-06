export function generateTsconfigJSONCode(): string {
  return `{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "declaration": true,
    "outDir": "lib"
  },
  "exclude": [
    "node_modules"
  ],
  "include": ["./src"]
}`;
}
