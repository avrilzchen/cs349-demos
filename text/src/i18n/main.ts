console.log("i18n");

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
  // good practice to update the page language type as well
  document.querySelector("html")?.setAttribute("lang", locale);
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (key) {
      element.textContent = translations[locale][key];
    }
  });
}

// get default browser locale
// (not the same as lang="en" in html)
const browserLocale = navigator.language;
console.log(browserLocale);

// initialize locale to browser locale
setLocale(browserLocale);

// setup the locale switcher
const localSwitcher = document.querySelector(
  "[data-i18n-switcher]"
) as HTMLSelectElement;

localSwitcher.addEventListener("change", (e) => {
  console.log(localSwitcher.value);
  setLocale(localSwitcher.value);
});
