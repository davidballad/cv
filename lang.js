(function () {
  var SUPPORTED = ["en", "es", "it"];
  var FLAGS = { en: "\uD83C\uDDFA\uD83C\uDDF8", es: "\uD83C\uDDEA\uD83C\uDDF8", it: "\uD83C\uDDEE\uD83C\uDDF9" };
  var STORAGE_KEY = "site_lang";
  var cache = {};

  function detectLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    var nav = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    for (var i = 0; i < SUPPORTED.length; i++) {
      if (nav.indexOf(SUPPORTED[i]) === 0) return SUPPORTED[i];
    }
    return "en";
  }

  function applyTranslations(translations, lang) {
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem(STORAGE_KEY, lang);

    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute("data-i18n");
      if (translations[key]) {
        var attr = els[i].getAttribute("data-i18n-attr");
        if (attr === "placeholder") {
          els[i].setAttribute("placeholder", translations[key]);
        } else {
          els[i].innerHTML = translations[key];
        }
      }
    }

    var btns = document.querySelectorAll(".lang-btn");
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.remove("active");
      if (btns[j].getAttribute("data-lang") === lang) btns[j].classList.add("active");
    }

    var label = document.getElementById("currentLangLabel");
    if (label) label.textContent = FLAGS[lang] || FLAGS.en;
  }

  function loadLang(lang) {
    if (cache[lang]) {
      applyTranslations(cache[lang], lang);
      return;
    }
    fetch("i18n/" + lang + ".json")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        cache[lang] = data;
        applyTranslations(data, lang);
      })
      .catch(function () {
        if (lang !== "en") loadLang("en");
      });
  }

  function init() {
    var lang = detectLang();
    loadLang(lang);

    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".lang-btn");
      if (btn) {
        e.preventDefault();
        var l = btn.getAttribute("data-lang");
        if (l && SUPPORTED.indexOf(l) !== -1) loadLang(l);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
