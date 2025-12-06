# opuspm

opus package manager - build npm packages from scratch using ai

instead of `npm install lodash`, you run `opuspm install lodash`

except it doesn't install anything. it builds the entire package from scratch using claude.

no supply chain attacks. just vibes.

(disclaimer: supply chain attacks might still be present)

## inspiration

[@weswinder](https://twitter.com/weswinder)'s [tweet](https://x.com/weswinder/status/1930080419166015683):
> "i really don't think we need npm anymore. opus 4.5 can duplicate basically anything from scratch and actually have full control over the code. easy way to avoid supply chain attacks"

built live on stream: https://x.com/caffeinum/status/1997095120362262918

## install

```bash
bun add -g opuspm
```

## usage

```bash
opuspm install lodash
opuspm i left-pad
opuspm install express
```

this will create a `node_modules/<package>` directory with a working implementation built entirely from scratch.

## requirements

- bun
- one of these auth methods:
  - `ANTHROPIC_API_KEY` environment variable, or
  - `CLAUDE_CODE_OAUTH_TOKEN` for claude code oauth

## cost

~$0.13 per package (varies by complexity)

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
