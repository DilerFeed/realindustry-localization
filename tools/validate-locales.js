#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const LOCALES_DIR = path.join(ROOT, 'locales');
const BASELINE_LANG = 'en';
const MAX_EXAMPLES = 20;
const PLURAL_SUFFIXES = new Set(['zero', 'one', 'two', 'few', 'many', 'other']);

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    fail(`Invalid JSON: ${path.relative(ROOT, filePath)}\n  ${error.message}`);
    return null;
  }
}

function listJsonFiles(dir) {
  const out = [];

  function walk(currentDir) {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        out.push(path.relative(dir, fullPath).replace(/\\/g, '/'));
      }
    }
  }

  walk(dir);
  return out.sort();
}

function flattenStrings(value, prefix = '') {
  const result = new Map();

  function walk(node, currentPath) {
    if (typeof node === 'string') {
      result.set(currentPath, node);
      return;
    }

    if (Array.isArray(node)) {
      const isFlexibleStringList = node.every((item) => typeof item === 'string')
        && (currentPath.endsWith('.verification.answers') || currentPath.endsWith('.paragraphs'));

      if (isFlexibleStringList) {
        result.set(currentPath, node.join('\n'));
        return;
      }

      node.forEach((item, index) => {
        walk(item, `${currentPath}[${index}]`);
      });
      return;
    }

    if (node && typeof node === 'object') {
      Object.keys(node).sort().forEach((key) => {
        const nextPath = currentPath ? `${currentPath}.${key}` : key;
        walk(node[key], nextPath);
      });
    }
  }

  walk(value, prefix);
  return result;
}

function printExamples(title, entries) {
  if (entries.length === 0) return;
  console.error(`  ${title}:`);
  entries.slice(0, MAX_EXAMPLES).forEach((entry) => {
    console.error(`    - ${entry}`);
  });
  if (entries.length > MAX_EXAMPLES) {
    console.error(`    ...and ${entries.length - MAX_EXAMPLES} more`);
  }
}

function isAllowedLocalePluralExtra(key, baselinePathSet) {
  const match = key.match(/^(.*)_([^.]+)$/);
  if (!match || !PLURAL_SUFFIXES.has(match[2])) return false;

  const basePath = match[1];
  return baselinePathSet.has(basePath)
    || baselinePathSet.has(`${basePath}_one`)
    || baselinePathSet.has(`${basePath}_other`);
}

function isAllowedLocaleResourceMetadataExtra(key, baselinePathSet) {
  const match = key.match(/^(resources\.[^.]+)\.(formula|diagram)$/);
  return Boolean(match && baselinePathSet.has(`${match[1]}.name`));
}

function compareStringPaths(lang, file, baselineMap, localeMap) {
  const baselinePaths = [...baselineMap.keys()];
  const localePaths = [...localeMap.keys()];
  const localePathSet = new Set(localePaths);
  const baselinePathSet = new Set(baselinePaths);

  const missing = baselinePaths.filter((key) => !localePathSet.has(key));
  const extra = localePaths.filter((key) => {
    return !baselinePathSet.has(key)
      && !isAllowedLocalePluralExtra(key, baselinePathSet)
      && !isAllowedLocaleResourceMetadataExtra(key, baselinePathSet);
  });

  if (missing.length || extra.length) {
    fail(`String key mismatch in ${lang}/${file}`);
    printExamples('Missing keys', missing);
    printExamples('Extra keys', extra);
  }

  let unchanged = 0;
  for (const [key, value] of localeMap.entries()) {
    if (lang !== BASELINE_LANG && baselineMap.get(key) === value) {
      unchanged += 1;
    }
  }

  return {
    keys: localeMap.size,
    unchanged,
  };
}

function main() {
  if (!fs.existsSync(LOCALES_DIR)) {
    fail('Missing locales directory.');
    return;
  }

  const baselineDir = path.join(LOCALES_DIR, BASELINE_LANG);
  if (!fs.existsSync(baselineDir)) {
    fail(`Missing baseline locale: ${BASELINE_LANG}`);
    return;
  }

  const baselineFiles = listJsonFiles(baselineDir);
  if (baselineFiles.length === 0) {
    fail(`No JSON files found in ${path.relative(ROOT, baselineDir)}`);
    return;
  }

  const baseline = new Map();
  for (const file of baselineFiles) {
    const data = readJson(path.join(baselineDir, file));
    if (data) baseline.set(file, flattenStrings(data));
  }

  const languages = fs.readdirSync(LOCALES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  console.log('Validating Realindustry localization files...');
  console.log(`Baseline: ${BASELINE_LANG}`);
  console.log('');

  for (const lang of languages) {
    const langDir = path.join(LOCALES_DIR, lang);
    const localeFiles = listJsonFiles(langDir);
    const missingFiles = baselineFiles.filter((file) => !localeFiles.includes(file));
    const extraFiles = localeFiles.filter((file) => !baselineFiles.includes(file));

    if (missingFiles.length || extraFiles.length) {
      fail(`File mismatch in locale ${lang}`);
      printExamples('Missing files', missingFiles);
      printExamples('Extra files', extraFiles);
    }

    let totalKeys = 0;
    let totalUnchanged = 0;

    for (const file of baselineFiles) {
      const localePath = path.join(langDir, file);
      const data = readJson(localePath);
      if (!data) continue;

      const stats = compareStringPaths(lang, file, baseline.get(file), flattenStrings(data));
      totalKeys += stats.keys;
      totalUnchanged += stats.unchanged;
    }

    const unchangedNote = lang === BASELINE_LANG ? '' : `, ${totalUnchanged} same as English`;
    console.log(`${lang}: ${totalKeys} strings${unchangedNote}`);
  }

  console.log('');
  if (process.exitCode) {
    console.error('Validation failed.');
  } else {
    console.log('Validation passed.');
  }
}

main();
