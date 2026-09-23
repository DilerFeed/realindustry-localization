# Locales

Each language has its own folder:

```text
locales/<language-code>/gamedata.json
locales/<language-code>/ui.json
```

`gamedata.json` contains the full game's gameplay, resource, research, tutorial, guide, registry, dialogue, and ending text.

`ui.json` contains the current full-game UI text.

`locales/en/gamedata.json` and `locales/en/ui.json` are the English baselines. Other locale files must keep the same translatable string paths, except for locale-specific plural keys such as `_few` or `_many`, localized resource metadata, and paragraph breaks in prose arrays where needed.

Only edit the text values. Do not rename keys or change the JSON structure outside these documented locale-specific exceptions.
