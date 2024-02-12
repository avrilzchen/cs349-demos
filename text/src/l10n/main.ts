console.log("l10n");

// translation table types
interface I18nTranslations {
  [key: string]: string;
}

interface I18nTranslationTable {
  [key: string]: I18nTranslations;
}

// translation table
const translations = {
  "en-CA": {
    "welcome-msg": "Welcome, please tell us about yourself.",
    "label-name": "Name",
    "button-submit": "Submit",
  },
  "fr-CA": {
    "welcome-msg": "Bienvenue, parlez-nous de vous.",
    "label-name": "Nom",
    "button-submit": "Envoyer",
  },
} as I18nTranslationTable;

// set locale of all elements with data-i18n attribute
function setLocale(locale: string) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (key) {
      element.textContent = translations[locale][key];
    }
  });
}

// get default browser locale
const browserLocale = navigator.language;

// set locale to browser locale
setLocale(browserLocale);

// locale switcher
const localSwitcher = document.querySelector(
  "[data-i18n-switcher]"
) as HTMLSelectElement;

localSwitcher.addEventListener("change", (e) => {
  console.log(localSwitcher.value);
  setLocale(localSwitcher.value);
});
