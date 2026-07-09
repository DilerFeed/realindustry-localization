# Locales

Each language has its own folder:

```text
locales/<language-code>/gamedata.json
locales/<language-code>/ui.json
```

`gamedata.json` contains demo-scoped gameplay, resource, research, tutorial, guide, registry, and dialogue text.

`ui.json` contains UI text shared with the current game UI.

`locales/en/gamedata.json` and `locales/en/ui.json` are the English baselines. Other locale files must keep the same translatable string paths, except for locale-specific plural keys such as `_few` or `_many` where needed.

Only edit the text values. Do not rename keys or change the JSON structure.
