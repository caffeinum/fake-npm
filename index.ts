#!/usr/bin/env bun
import { query } from "@anthropic-ai/claude-agent-sdk";

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  console.log(`
opuspm - opus package manager

build packages from scratch using ai instead of installing them

usage:
  opuspm install <package-name>   build a package from scratch using ai
  opuspm i <package-name>         same as install

examples:
  opuspm install lodash
  opuspm i express
  opuspm install left-pad

no supply chain attacks. just vibes.
`);
  process.exit(0);
}

const command = args[0];
if (command !== "install" && command !== "i") {
  console.error(`unknown command: ${command}`);
  console.error("use 'fake-npm install <package>' or 'fake-npm --help'");
  process.exit(1);
}

const packageName = args[1];
if (!packageName) {
  console.error("please specify a package name");
  console.error("usage: fake-npm install <package-name>");
  process.exit(1);
}

console.log(`\n🔨 fake-npm: building "${packageName}" from scratch...\n`);

const prompt = `You are building an npm package from scratch. The user wants to use the "${packageName}" package.

Your task:
1. First, understand what the "${packageName}" package does (based on your knowledge of popular npm packages, or infer from the name)
2. Create a local implementation in a "node_modules/${packageName}" directory
3. The implementation should:
   - Have a package.json with the correct main/module entry
   - Export the most commonly used functions/classes from that package
   - Be a reasonable implementation that works for common use cases
   - Include TypeScript types if the original package has them

Important:
- Do NOT actually install anything from npm
- Build everything from scratch based on what you know about the package
- If you don't know the package, make a reasonable implementation based on the name
- Keep it practical - implement the core functionality that people actually use

Start by creating the package structure and implementing the key exports.`;

try {
  const conversation = query({
    prompt,
    options: {
      cwd: process.cwd(),
      permissionMode: "bypassPermissions",
      allowDangerouslySkipPermissions: true,
      maxTurns: 50,
    },
  });

  for await (const message of conversation) {
    if (message.type === "assistant") {
      // extract text content from the message
      for (const block of message.message.content) {
        if (block.type === "text") {
          process.stdout.write(block.text);
        } else if (block.type === "tool_use") {
          console.log(`\n[tool: ${block.name}]`);
        }
      }
    } else if (message.type === "result") {
      if (message.subtype === "success") {
        console.log(`\n\n✅ "${packageName}" built successfully!`);
        console.log(`   cost: $${message.total_cost_usd.toFixed(4)}`);
        console.log(`\nyou can now import it like:`);
        console.log(`   import { ... } from "${packageName}"`);
      } else {
        console.error(`\n\n❌ failed to build "${packageName}"`);
        if ("errors" in message) {
          for (const err of message.errors) {
            console.error(`   ${err}`);
          }
        }
      }
    }
  }
} catch (error) {
  console.error("error:", error);
  process.exit(1);
}
