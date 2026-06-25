# Realindustry Localization

Public localization files for the Realindustry demo.

This repository exists so players can report translation issues, suggest fixes, and help improve the game's localized text before the full release.

## What Is Included

The current public files are demo-only localization files:

```text
locales/
  en/gamedata.json  # English source text / baseline
  de/gamedata.json  # German
  es/gamedata.json  # Spanish
  fr/gamedata.json  # French
  it/gamedata.json  # Italian
  ja/gamedata.json  # Japanese
  ru/gamedata.json  # Russian
  uk/gamedata.json  # Ukrainian
  zh/gamedata.json  # Simplified Chinese
```

The English file is the source of truth for keys and structure. Other languages should keep the same JSON structure and translate only the text values.

## How To Help

You can help in two ways:

1. Open an issue if you found a typo, awkward phrasing, wrong terminology, broken line, or untranslated text.
2. Open a pull request if you want to directly fix one or more strings.

Small, focused pull requests are easiest to review. For example, one PR for "German resource name fixes" is better than one huge PR touching every language.

## Editing Rules

Please follow these rules when editing files:

- Do not rename JSON keys.
- Do not delete or move entries.
- Do not change object structure.
- Do not translate internal IDs such as `iron-plate`, `research-lab`, or `first-steps`.
- Keep chemical formulas, numbers, and units accurate.
- Keep JSON valid.
- Use UTF-8 encoding.
- Avoid submitting raw machine translation without human review.

When in doubt, compare your language file with `locales/en/gamedata.json`.

## Validate Changes

If you have Node.js installed, run:

```bash
npm run validate
```

or:

```bash
node tools/validate-locales.js
```

The validator checks that every locale has the same translatable string keys as English and that all JSON files can be parsed.

## Translation Tone

Realindustry uses a technical industrial tone with narrative/corporate elements. In general:

- Resource and recipe text should be clear and technically consistent.
- UI-facing names should be concise enough to fit in game panels.
- NEXUS and Registry-style text should preserve the colder corporate/science-fiction tone.
- Jokes, lore changes, or extra explanation should not be added unless the English text already implies them.

See [TRANSLATION_GUIDELINES.md](TRANSLATION_GUIDELINES.md) for more detail.

## Contribution Permission

By opening an issue or pull request, you agree that your submitted translation text may be used, edited, and distributed as part of Realindustry and related store/community materials.

See [LICENSE.md](LICENSE.md) for the full contribution notice.

## Steam

Realindustry is available on Steam. Please report game bugs in the appropriate Steam or GitHub issue tracker; this repository is only for localization text.
