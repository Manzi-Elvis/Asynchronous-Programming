/**
 * Exercise 01 — Identify what's language vs environment
 *
 * Part 1
 * -------
 * For each item below, write a comment marking it as either:
 *   (LANG) — part of the ECMAScript language spec itself
 *   (ENV)  — provided by the host environment (browser or Node)
 *
 * - Array.prototype.map
 * - setTimeout
 * - Promise
 * - fetch
 * - console.log
 * - JSON.parse
 * - document.querySelector
 * - async/await syntax
 * - process.nextTick (Node-specific)
 * - Math.random
 *
 * Hint: a good test is "would this exist in a bare JS engine with no
 * browser and no Node wrapper around it?" Promise, JSON, Math, and
 * Array methods would. setTimeout, fetch, console, and document would
 * NOT — they're bolted on by the environment.
 */

// Your answers as comments:
// Array.prototype.map ->
// setTimeout ->
// Promise ->
// fetch ->
// console.log ->
// JSON.parse ->
// document.querySelector ->
// async/await syntax ->
// process.nextTick ->
// Math.random ->

/**
 * Part 2 — Prove it with code
 * -----------------------------
 * Write a short snippet that logs three things in order:
 *   1. A synchronous log
 *   2. Something scheduled via a Web API/environment function
 *   3. Another synchronous log
 * ...and then explain in a comment why your environment-scheduled
 * log ends up LAST regardless of what function you chose.
 */

// your code here