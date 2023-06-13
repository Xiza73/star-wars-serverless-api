type Language = "es" | "en";

interface Translations {
  [key: string]: string;
}

export const translate = async (key: string, language: Language) => {
  const translations = (await import(
    `../translation/${language}.js`
  )).default as Translations;

  return translations[key] || key;
};
