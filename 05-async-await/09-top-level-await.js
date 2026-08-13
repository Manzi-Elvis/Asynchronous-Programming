/**
 * 09-top-level-await.js
 *
 * Goal: understand top-level await — using `await` OUTSIDE of any
 * function, directly in module-level code.
 *
 * IMPORTANT: top-level await only works in ES MODULES (.mjs files,
 * or .js files in a package with "type": "module" in package.json),
 * NOT in CommonJS (.js files in a "type": "commonjs" package, which
 * is what this curriculum's package.json uses by default). That's
 * why this specific lesson lives in a sibling .mjs file instead of
 * being run directly as 09-top-level-await.js.
 *
 * Run the actual demo with:
 *   node 09-top-level-await.mjs
 *
 * --- Why it didn't exist for years, and why it was added ---
 *
 * Before top-level await, EVERY use of await had to be inside an
 * async function, even for simple module-initialization code like
 * "load this config file before the rest of the module runs." This
 * forced awkward patterns like immediately-invoked async functions:
 *
 *   (async () => {
 *     const config = await loadConfig();
 *     // rest of module setup here, all trapped inside this IIFE
 *   })();
 *
 * Top-level await (finalized in ES2022) removes the need for that
 * wrapper for module-level async initialization:
 *
 *   const config = await loadConfig(); // just works, no wrapper needed
 *
 * --- The real consequence: importing a module with top-level await
 * PAUSES the importer until it resolves ---
 *
 * If module A has a top-level await, and module B does
 * `import ... from './A.mjs'`, B's own execution effectively waits
 * for A's top-level await to resolve before B continues. This is a
 * genuine behavior change to the module loading system, not just
 * syntax sugar — it's worth knowing this has real implications for
 * app startup time if used carelessly (e.g. a top-level await on a
 * slow network call in a commonly-imported module will slow down
 * EVERY module that (transitively) imports it).
 *
 * See 09-top-level-await.mjs for the runnable demonstration.
 */

console.log('This file is documentation only — see 09-top-level-await.mjs to run the real demo.');