# Contributing To Realindustry Localization

Thank you for helping improve Realindustry's translations.

## Good Contributions

Good localization contributions include:

- Typo and grammar fixes.
- More natural phrasing.
- Terminology consistency fixes.
- Corrections to technical or scientific wording.
- Fixes for text that is too long in the game UI.
- Reports of missing or untranslated strings.

Please do not use this repository for gameplay suggestions, balance changes, asset requests, or unrelated bug reports.

## Pull Request Checklist

Before opening a pull request:

- Edit only the language files relevant to your change.
- Keep JSON keys and structure unchanged.
- Check that the file is valid JSON.
- Run `npm run validate` if possible.
- Explain what language and area you changed, such as `gamedata.json` or `ui.json`.

Example PR title:

```text
Fix German research terminology
```

## Machine Translation

Machine translation can be useful for finding a starting point, but please do not submit unreviewed machine-generated text. Realindustry has technical terms, recipe descriptions, and lore-heavy entries that need human judgment.

## Terminology

If a term appears many times, keep it consistent. Resource names, building names, recipe names, research names, and achievement names often appear in multiple places.

If you are unsure about a term, open an issue and include:

- Language.
- Current text.
- Suggested text.
- Why the change is better.

## Permission Notice

By submitting text, suggestions, issue comments, or pull requests to this repository, you confirm that you have the right to submit that content and you grant AssemblyPrime permission to use it in Realindustry and related materials under the terms described in [LICENSE.md](LICENSE.md).
