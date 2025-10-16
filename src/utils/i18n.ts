import fs from 'fs';
import path from 'path';

type Locale = 'es' | 'en';

export function loadLocaleSync(locale: Locale = 'es') {
  try {
    const file = path.resolve(process.cwd(), 'src', 'locales', `${locale}.json`);
    const raw = fs.readFileSync(file, 'utf-8');
    return JSON.parse(raw) as Record<string, string>;
  } catch (err) {
    return {};
  }
}

export function t(localeData: Record<string, string>, key: string) {
  return localeData[key] ?? key;
}
