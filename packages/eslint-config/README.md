# `@bhadurian/eslint-config`

My shared [ESLint config](https://eslint.org/docs/developer-guide/shareable-configs).

## Install

```bash
$ npm install --save-dev @bhadurian/eslint-config
```

## Usage

### Node

When working with Node:

```bash
$ npm install --save-dev @eslint-config-airbnb-base
```

Edit `.eslintrc.json`:

```jsonc
{
    "root": true,
    "extends": ["@bhadurian/eslint-config"]
}
```

### Next.js

When working with Next.js:

```bash
$ npm install --save-dev @eslint-config-airbnb @next/eslint-plugin-next eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
```

Edit `.eslintrc.json`:

```jsonc
{
    "root": true,
    "extends": ["@bhadurian/eslint-config/next"]
}
```
