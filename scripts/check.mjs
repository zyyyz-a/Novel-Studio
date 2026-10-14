import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
assert.match(html, /^<!doctype html>/i);
assert.match(html, /lang="zh-CN"/);
const match = html.match(/<script>([\s\S]*?)<\/script>/i);
assert.ok(match, 'Missing application script');
new Script(match[1], {filename: 'index.html:script'});
for (const symbol of ['function parseFiles(', 'function persist(', 'function graph(', 'function promptText(', 'function backup(', 'storyline-studio-lite-v1']) {
  assert.ok(html.includes(symbol), 'Missing prototype feature: ' + symbol);
}
assert.equal(/<script[^>]+src=/i.test(html), false);
console.log('Static prototype checks passed.');
