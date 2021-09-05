# `@bhadurian/prettier-config`

My personal [Prettier](https://prettier.io) config.

## Install

For use with Prettier >= 2.0.0.

```bash
$ npm install --save-dev @bhadurian/prettier-config
```

## Usage

Add a key in your `package.json` file:

```jsonc
"prettier": "@rapidevelop/prettier-config"
```

OR

Edit `.prettierrc.json`:

```jsonc
"@bhadurian/prettier-config"
```

### Override options

Use `.prettierrc.js` file and export an object:

```js
module.exports = {
    ...require('@bhadurian/prettier-config'),
    semi: false,
};
```
