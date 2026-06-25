# Translation Guidelines

These notes are intended to keep Realindustry's localized text consistent.

## General Style

- Prefer clear, natural language over literal word-for-word translation.
- Keep the meaning of the English text.
- Keep UI text concise.
- Preserve the game's industrial, technical, and slightly corporate tone.
- Do not add new jokes, lore, or explanations.

## Technical Text

Realindustry contains many resource, recipe, and research descriptions. Please keep technical wording consistent.

For resource and recipe text:

- Preserve chemical formulas and reaction notation unless the English source has an error.
- Do not simplify technical terms into unrelated casual wording.
- Keep units, numbers, and material names accurate.
- Use the same translated term for the same resource across the file.

## Names And IDs

Do not translate internal IDs or JSON keys.

Correct:

```json
"iron-plate": {
  "name": "Translated display name"
}
```

Incorrect:

```json
"translated-iron-plate-id": {
  "name": "Translated display name"
}
```

## Lore And Voice

Some entries have a stronger narrative tone, especially NEXUS dialogue and Registry-style text.

For these sections:

- Preserve the mood and intent, not just the literal words.
- Keep NEXUS colder, precise, and controlled.
- Keep corporate/archive text formal and restrained.
- Do not make the text more comedic or casual than the source.

## UI Length

Some names appear in compact game panels. If a direct translation is much longer than English, prefer a shorter natural phrase when possible.

If a correct translation is necessarily long, mention possible UI overflow in the pull request.

## Verification Answers

Registry verification answers may include additional local-language variants when they help players enter a natural answer. Keep the numeric or English-compatible answer when present, and add only genuinely useful variants.

## When The English Text Seems Wrong

If the English source appears incorrect, do not silently fix it only in one language. Open an issue explaining the suspected source problem so the baseline can be corrected first.
