import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { concepts } from '../learning-map/content.mjs';

const coverage = JSON.parse(readFileSync(new URL('coverage.json', import.meta.url), 'utf8'));
const audited = concepts.filter((concept) =>
  concept.refs.some((ref) => ref[0] === 'harunohi'),
);

assert.equal(
  coverage.coverage.cross_song_links.status,
  'partial',
  'Cross-song coverage must stay partial until the reciprocal-link audit is complete.',
);
assert.equal(
  coverage.coverage.cross_song_links.audited_concepts,
  audited.length,
  'Harunohi cross-song audited_concepts drifted from the current Learning Map.',
);

for (const concept of audited) {
  const refs = concept.refs.filter((ref) => ref[0] === 'harunohi');
  assert(refs.length > 0, `Missing Harunohi reference for ${concept.id}`);
  for (const [, anchor] of refs) {
    assert(anchor, `Empty Harunohi anchor for ${concept.id}`);
  }
}

console.log(
  `PASS: Harunohi cross-song coverage matches ${audited.length} audited Learning Map concepts; status remains partial.`,
);
