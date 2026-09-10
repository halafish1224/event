# ハルノヒ lesson

Source: the user's 58-line text supplied on 2026-09-10. Preserve repetitions,
punctuation and プラットホーム / プラットフォーム spelling. Translations and
interpretations are teaching commentary, not an official lyric transcription.

`content.mjs` is the lesson source; `build.mjs` generates `index.html`.
The page reuses the established `../ring-ding/style.css` and `app.js` controls.
`map-extension.mjs` extends the existing learning map while preserving all
previous concept IDs and learner records. The new IDs are `no-need`,
`necessity`, and `excess-formation`.

From the repository root:

```sh
node jp50/aimyon/harunohi/build.mjs
node jp50/aimyon/learning-map/build.mjs
node jp50/aimyon/harunohi/verify.mjs
```

The catalog lives in `../songs/data.json` and the static cards in
`../songs/index.html`; keep both in sync. This update contains 19 songs and
39 map concepts. The user's existing noindex policy is retained.

Teaching QA: explicitly distinguish 甘い / 甘える, 見える / 見る,
ないでいい / ないといけない / てはいけない, ておくれ / ておく,
君じゃなきゃ / 君が歩かなきゃ, and the modifier scope of 小さく.
Do not turn poetic ambiguity into definitive author intent.
