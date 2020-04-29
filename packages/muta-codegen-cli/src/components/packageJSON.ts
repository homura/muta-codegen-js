interface PackageJSONOptions {
  name: string;
  mutaSDKVersion: string;
}

export function generatePackageJSONCode(
  options: Partial<PackageJSONOptions>,
): string {
  return `{
  "name": "${options.name}",
  "main": "lib/index.js",
  "scripts": {
    "build": "tsc --outDir lib src/**/*.ts"
  },
  "dependencies": {
    "@mutajs/types": "${options.mutaSDKVersion}",
    "@mutajs/service": "${options.mutaSDKVersion}"
  },
  "devDependencies": {
    "typescript": "^3.8.0"
  }
} `;
}
