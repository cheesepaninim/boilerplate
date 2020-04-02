// tsconfig.json
// https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

/* top-level property */
// compilerOptions | compileOnSave | files | include | exclude | extends

tsconfig = {
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,

    /* compilerOptions.strict: true; */
    // must tell types to typescript & 'any' types not allowed
    "strict": false,

    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",

    /* compilerOptions.typeRoots */
    // If typeRoots is specified, only packages under typeRoots will be included.
    "typeRoots": ["./typings"],

    /* compilerOptions.types */
    // If types is specified, only packages listed will be included.
    "types" : ["node", "lodash", "express"]
  },

  /* compileOnSave */
  // signals to the IDE to generate all files for a given tsconfig.json upon saving
  "compileOnSave": false,

  /* exclude */
  // files to be excluded
  /* include */
  // files to be included

  // * matches zero or more characters (excluding directory separators)
  // ? matches any one character (excluding directory separators)
  // **/ recursively matches any subdirectory

  "exclude": [
    "node_modules"
  ],
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
  ],

  /* files */

  /* extends */
  // A tsconfig.json file can inherit configurations from another file using the extends property.
  "extends": "./configs/base"

  /**
   * i.e.
   * [configs/base.json]
   * {
   *   "compilerOptions": {
   *     "noImplicitAny": true,
   *     "strictNullChecks": true
   *   }
   * }
   *
   */
}
