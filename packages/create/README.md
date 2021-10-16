# `@bhadurian/create`

Anshuman's package initializer.

## Usage

```bash
$ npm init @bhadurian <package-name> [[--root] [--public]]
```

This will also set up a script to run MRM to set up the package/project further.

### Options

`--root`
Use when setting up a project initially. This will

-   Add a basic `.nvmrc`
-   Add a basic `.editorconfig` for MRM
-   Install MRM as a dev dependency

`--public`
Sets `publishConfig.access` to `true`, otherwise sets `private` to `true`.

### Examples

When at the root of your project:

```bash
$ npm init @bhadurian <project-name> --root
$ npm run mrm <task-name>
```

When creating a new package in a monorepo:

```bash
$ npm init -w <package-path> @bhadurian <package-name>
$ npm run -w <package-path> mrm <task-name>
```
