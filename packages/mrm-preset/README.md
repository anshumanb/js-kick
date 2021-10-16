# @bhadurian/mrm-preset

My MRM preset.

## Usage

To run the preset's tasks directly:

```bash
$ npx mrm <task> --preset=@bhadurian/mrm-preset
```

## New projects

From the root of your project:

```bash
$ npm init @bhadurian <project-name> --root
```

This will set up the project to run MRM tasks.

```bash
$ npm run mrm <task-name>
```

When creating a new package in a monorepo:

```bash
$ npm init -w <package-path> @bhadurian <package-name>
$ npm run -w <package-path> mrm <task-name>
```

## Existing projects

To convert an existing project over to the configuration management system, run through the same steps as for a new project, merging any differences.
