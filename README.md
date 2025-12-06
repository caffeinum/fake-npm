# fake-npm

build npm packages from scratch using ai. no supply chain attacks, just vibes.

inspired by [@weswinder](https://twitter.com/weswinder):
> "i really don't think we need npm anymore. opus 4.5 can duplicate basically anything from scratch and actually have full control over the code. easy way to avoid supply chain attacks"

## how it works

instead of downloading packages from npm, fake-npm uses claude to build the package from scratch based on its knowledge of what that package does.

```bash
fake-npm install lodash
```

this will create a `node_modules/lodash` directory with a working implementation of lodash's core functions - built entirely from scratch.

## install

```bash
bun install
```

## usage

```bash
# build a package from scratch
bun run index.ts install <package-name>

# examples
bun run index.ts install lodash
bun run index.ts install left-pad
bun run index.ts install express
```

## requirements

- bun
- `ANTHROPIC_API_KEY` environment variable

## why

- no supply chain attacks
- full control over the code
- you know exactly what's in your dependencies
- it's kinda funny

## limitations

- costs api credits
- won't be 100% api compatible with original packages
- complex packages may be simplified
- no guarantees on correctness

## license

mit
