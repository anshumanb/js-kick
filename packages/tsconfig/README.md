# `@bhadurian/tsconfig`

My shared [TypeScript config](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

## Install

```bash
$ npm install --save-dev @bhadurian/tsconfig
```

## Usage

### Node

When working with Node:

```bash
$ npm install --save-dev @types/node
```

Edit `tsconfig.json`:

```jsonc
{
    "extends": "@bhadurian/tsconfig/node-lts.json"
}
```

### Next.js

When working with Next.js, edit `tsconfig.json`:

```jsonc
{
    "extends": "@bhadurian/tsconfig/next.json"
}
```
