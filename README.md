# fake-npm

build npm packages from scratch using ai. no supply chain attacks, just vibes.

inspired by [@weswinder](https://twitter.com/weswinder)'s [tweet](https://x.com/weswinder/status/1930080419166015683):
> "i really don't think we need npm anymore. opus 4.5 can duplicate basically anything from scratch and actually have full control over the code. easy way to avoid supply chain attacks"

built live on stream: https://x.com/caffeinum/status/1997095120362262918

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
- one of these auth methods:
  - `ANTHROPIC_API_KEY` environment variable, or
  - `CLAUDE_CODE_OAUTH_TOKEN` for claude code oauth

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
