# `@bhadurian/prettier-config`

My personal [Prettier](https://prettier.io) config.

## Usage

Install:

```bash
$ npm add --dev @bhadurian/prettier-config
```

Edit `.prettierrc.json`:

```jsonc
"@bhadurian/prettier-config"
```

To override options:

```js
module.exports = {
    ...require('@bhadurian/prettier-config'),
    semi: false,
};
```
