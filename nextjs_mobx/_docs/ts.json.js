// https://nextjs.org/learn/excel/typescript/setup
// -> 이건 아직 안해봄
// https://github.com/zeit/next.js/tree/canary/examples/with-typescript

// compiler-options
// https://www.typescriptlang.org/docs/handbook/compiler-options.html
// https://vomvoru.github.io/blog/tsconfig-compiler-options-kr/

// https://github.com/mehmetsefabalik/next-typescript-materialui-jest-starter

{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,

    /* strict: true; */
    // must tell types to typescript & 'any' types not allowed
    "strict": false,

    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "exclude": [
    "node_modules"
  ],
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
  ]
}
