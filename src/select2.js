import 'select2-origin/select2';

function getUserLanguage() {
    var documentLang = window.document.documentElement.getAttribute('lang');
    var documentLocale = documentLang && documentLang.split('-')[0];

    return documentLocale;
}

var lang = getUserLanguage();

switch (lang) {
    case 'ar':
        import('select2-origin/select2-origin/i18n/ar');
        break;
    case 'bg':
        import('select2-origin/select2-origin/i18n/bg');
        break;
    case 'ca':
        import('select2-origin/select2-origin/i18n/ca');
        break;
    case 'cs':
        import('select2-origin/select2-origin/i18n/cs');
        break;
    case 'da':
        import('select2-origin/select2-origin/i18n/da');
        break;
    case 'de':
        import('select2-origin/select2-origin/i18n/de');
        break;
    case 'el':
        import('select2-origin/select2-origin/i18n/el');
        break;
    case 'es':
        import('select2-origin/select2-origin/i18n/es');
        break;
    case 'et':
        import('select2-origin/select2-origin/i18n/et');
        break;
    case 'eu':
        import('select2-origin/select2-origin/i18n/eu');
        break;
    case 'fa':
        import('select2-origin/select2-origin/i18n/fa');
        break;
    case 'fi':
        import('select2-origin/select2-origin/i18n/fi');
        break;
    case 'fr':
        import('select2-origin/select2-origin/i18n/fr');
        break;
    case 'gl':
        import('select2-origin/select2-origin/i18n/gl');
        break;
    case 'he':
        import('select2-origin/select2-origin/i18n/he');
        break;
    case 'hr':
        import('select2-origin/select2-origin/i18n/hr');
        break;
    case 'hu':
        import('select2-origin/select2-origin/i18n/hu');
        break;
    case 'id':
        import('select2-origin/select2-origin/i18n/id');
        break;
    case 'is':
        import('select2-origin/select2-origin/i18n/is');
        break;
    case 'it':
        import('select2-origin/select2-origin/i18n/it');
        break;
    case 'ja':
        import('select2-origin/select2-origin/i18n/ja');
        break;
    case 'ko':
        import('select2-origin/select2-origin/i18n/ko');
        break;
    case 'lt':
        import('select2-origin/select2-origin/i18n/lt');
        break;
    case 'lv':
        import('select2-origin/select2-origin/i18n/lv');
        break;
    case 'mk':
        import('select2-origin/select2-origin/i18n/mk');
        break;
    case 'ms':
        import('select2-origin/select2-origin/i18n/ms');
        break;
    case 'nl':
        import('select2-origin/select2-origin/i18n/nl');
        break;
    case 'no':
        import('select2-origin/select2-origin/i18n/nb');
        break;
    case 'pl':
        import('select2-origin/select2-origin/i18n/pl');
        break;
    case 'br':
        import('select2-origin/select2-origin/i18n/pt-BR');
        break;
    case 'pt':
        import('select2-origin/select2-origin/i18n/pt');
        break;
    case 'ro':
        import('select2-origin/select2-origin/i18n/ro');
        break;
    case 'ru':
        import('select2-origin/select2-origin/i18n/ru');
        break;
    case 'sk':
        import('select2-origin/select2-origin/i18n/sk');
        break;
    case 'sv':
        import('select2-origin/select2-origin/i18n/sv');
        break;
    case 'th':
        import('select2-origin/select2-origin/i18n/th');
        break;
    case 'tr':
        import('select2-origin/select2-origin/i18n/tr');
        break;
    case 'vi':
        import('select2-origin/select2-origin/i18n/vi');
        break;
    case 'zh':
        import('select2-origin/select2-origin/i18n/zh-CN');
        break;
}
