import 'select2-origin/select2';

/* ------------------------------ */
/* Import locales                 */
/* ------------------------------ */

function getUserLanguage() {
    const documentLang = window.document.documentElement.getAttribute('lang');
    return documentLang && documentLang.split('-')[0];
}

const lang = getUserLanguage();

switch (lang) {
    case 'ar':
        import('select2-origin/select2_locale_ar');
        break;
    case 'bg':
        import('select2-origin/select2_locale_bg');
        break;
    case 'ca':
        import('select2-origin/select2_locale_ca');
        break;
    case 'cs':
        import('select2-origin/select2_locale_cs');
        break;
    case 'da':
        import('select2-origin/select2_locale_da');
        break;
    case 'de':
        import('select2-origin/select2_locale_de');
        break;
    case 'el':
        import('select2-origin/select2_locale_el');
        break;
    case 'es':
        import('select2-origin/select2_locale_es');
        break;
    case 'et':
        import('select2-origin/select2_locale_et');
        break;
    case 'eu':
        import('select2-origin/select2_locale_eu');
        break;
    case 'fa':
        import('select2-origin/select2_locale_fa');
        break;
    case 'fi':
        import('select2-origin/select2_locale_fi');
        break;
    case 'fr':
        import('select2-origin/select2_locale_fr');
        break;
    case 'gl':
        import('select2-origin/select2_locale_gl');
        break;
    case 'he':
        import('select2-origin/select2_locale_he');
        break;
    case 'hr':
        import('select2-origin/select2_locale_hr');
        break;
    case 'hu':
        import('select2-origin/select2_locale_hu');
        break;
    case 'id':
        import('select2-origin/select2_locale_id');
        break;
    case 'is':
        import('select2-origin/select2_locale_is');
        break;
    case 'it':
        import('select2-origin/select2_locale_it');
        break;
    case 'ja':
        import('select2-origin/select2_locale_ja');
        break;
    case 'ko':
        import('select2-origin/select2_locale_ko');
        break;
    case 'lt':
        import('select2-origin/select2_locale_lt');
        break;
    case 'lv':
        import('select2-origin/select2_locale_lv');
        break;
    case 'mk':
        import('select2-origin/select2_locale_mk');
        break;
    case 'ms':
        import('select2-origin/select2_locale_ms');
        break;
    case 'nl':
        import('select2-origin/select2_locale_nl');
        break;
    case 'no':
        import('select2-origin/select2_locale_no');
        break;
    case 'pl':
        import('select2-origin/select2_locale_pl');
        break;
    case 'br':
        import('select2-origin/select2_locale_pt-BR');
        break;
    case 'pt':
        import('select2-origin/select2_locale_pt-PT');
        break;
    case 'ro':
        import('select2-origin/select2_locale_ro');
        break;
    case 'ru':
        import('select2-origin/select2_locale_ru');
        break;
    case 'sk':
        import('select2-origin/select2_locale_sk');
        break;
    case 'sv':
        import('select2-origin/select2_locale_sv');
        break;
    case 'th':
        import('select2-origin/select2_locale_th');
        break;
    case 'tr':
        import('select2-origin/select2_locale_tr');
        break;
    case 'vi':
        import('select2-origin/select2_locale_vi');
        break;
    case 'zh':
        import('select2-origin/select2_locale_zh-CN');
        break;
}

/* -------------------------------------------------- */
/* Extend with support for `writing-mode: vertical-rl`*/
/* usage: `$element.select2({ writingMode: 'vertical-rl',...  })` */
/* -------------------------------------------------- */

/* eslint-disable */

// https://github.com/select2/select2/blob/3.5.1/select2.js  -> positionDropdown
function positionDropdownVerticalRl() {
    var $dropdown = this.dropdown,
        offset = this.container.offset(),
        height = this.container.outerHeight(false),
        width = this.container.outerWidth(false),
        dropHeight = $dropdown.outerHeight(false),
        dropWidth = $dropdown.outerWidth(false),
        $window = $(window),
        windowWidth = $window.width(),
        windowHeight = $window.height(),
        viewportRight = $window.scrollLeft() + windowWidth,
        viewportBottom = $window.scrollTop() + windowHeight,
        dropTop = offset.top,
        dropLeft = offset.left,
        enoughRoomToTheLeft = dropLeft - dropWidth >= $window.scrollLeft(),
        enoughRoomToTheRight = (offset.left + width + dropWidth) <= viewportRight,
        enoughRoomOnBottom = dropTop + dropHeight <= viewportBottom,
        toTheRightNow = $dropdown.hasClass("select2-drop-above"),
        bodyOffset,
        toTheRight,
        changeDirection,
        css,
        resultsListNode;

    // above = to the right; below = to the left
    // always prefer the current above/below alignment, unless there is not enough room
    if (toTheRightNow) {
        toTheRight = true;
        if (!enoughRoomToTheRight && enoughRoomToTheLeft) {
            changeDirection = true;
            toTheRight = false;
        }
    } else {
        toTheRight = false;
        if (!enoughRoomToTheLeft && enoughRoomToTheRight) {
            changeDirection = true;
            toTheRight = true;
        }
    }

    //if we are changing direction we need to get positions when dropdown is hidden;
    if (changeDirection) {
        $dropdown.hide();
        offset = this.container.offset();
        height = this.container.outerHeight(false);
        width = this.container.outerWidth(false);
        dropHeight = $dropdown.outerHeight(false);
        viewportRight = $window.scrollLeft() + windowWidth;
        viewportBottom = $window.scrollTop() + windowHeight;
        dropTop = offset.top;
        dropLeft = offset.left;
        dropWidth = $dropdown.outerWidth(false);
        enoughRoomOnBottom = dropTop + dropHeight <= viewportBottom;
        $dropdown.show();

        // fix so the cursor does not move to the left within the search-textbox in IE
        this.focusSearch();
    }

    if (this.opts.dropdownAutoWidth) {
        //not implemented
    }
    else {
        this.container.removeClass('select2-drop-auto-width');
    }

    // fix positioning when body has an offset and is not position: static
    if (this.body.css('position') !== 'static') {
        bodyOffset = this.body.offset();
        dropTop -= bodyOffset.top;
        dropLeft -= bodyOffset.left;
    }

    if (!enoughRoomOnBottom) {
        dropTop = offset.top + this.container.outerHeight(false) - dropHeight;
    }

    css =  {
        top: dropTop,
        height: height
    };

    if (toTheRight) {
        css.left = offset.left + width;
        css.right = 'auto';
        this.container.addClass("select2-drop-above");
        $dropdown.addClass("select2-drop-above");
    }
    else {
        css.left = offset.left - dropWidth;
        css.right = 'auto';
        this.container.removeClass("select2-drop-above");
        $dropdown.removeClass("select2-drop-above");
    }
    // css = $.extend(css, evaluate(this.opts.dropdownCss, this.opts.element));

    $dropdown.css(css);
}

// https://github.com/select2/select2/blob/3.5.1/select2.js  -> ensureHighlightVisible
function ensureHighlightVisibleVerticalRl() {
    var results = this.results, children, index, child, hl, rl, x, more, rightOffset;

    index = this.highlight();

    if (index < 0) return;

    if (index == 0) {

        // if the first element is highlighted scroll all the way to the top,
        // that way any unselectable headers above it will also be scrolled
        // into view

        results.scrollLeft(0);
        return;
    }

    children = this.findHighlightableChoices().find('.select2-result-label');

    child = $(children[index]);

    hl = ((child.offset() || {}).left || 0);

    rightOffset = hl + child.outerWidth(true);

    // if this is the last child lets also make sure select2-more-results is visible
    if (index === children.length - 1) {
        more = results.find("li.select2-more-results");
        if (more.length > 0) {
            hl = more.offset().left;
        }
    }

    rl = results.offset().left - 1;  //minus small margin, otherwise will autoscroll to next option if mouse is on the left border
    if (hl < rl) {
        results.scrollLeft(results.scrollLeft() + (hl - rl));
    }
    x = rightOffset - (results.offset().left + results.outerWidth(false));

    // make sure the right of the element is visible
    if (x > 0 && child.css('display') != 'none' ) {
        results.scrollLeft(results.scrollLeft() + x); // x is positive, scrollLeft is negative
    }
}

// https://github.com/select2/select2/blob/3.5.1/select2.js  -> this.search.on("keydown",...)
function onSearchKeydownVerticalRl(e) {
    if (!this.isInterfaceEnabled()) return;

    const keyLeft = 37;
    const keyRight = 39;
    switch (e.which) {
        case keyLeft:
        case keyRight:
            this.moveHighlight(e.which === keyRight ? -1 : 1);
            e.preventDefault();
            e.stopPropagation();
            return;
    }
}

function extendSelect2Instance() {
    this.container.css('height', this.opts.width); //supports only defined size: `{width: 'fit-content'}`
    this.container.css('width', '');

    this.positionDropdown = positionDropdownVerticalRl;
    this.ensureHighlightVisible = ensureHighlightVisibleVerticalRl;

    this.search.on('keydown', this.bind(onSearchKeydownVerticalRl));
}

(function ($, undefined) {
    const originalSelect2 = $.fn.select2;

    const extendedSelect2 = function (...args) {
        const isConstructor = (args.length === 0 || typeof(args[0]) === "object");
        const isVerticalConstructor = isConstructor && args[0] && args[0].writingMode === 'vertical-rl';
        if (isVerticalConstructor) {
            args[0] = Object.assign({}, args[0], {
                containerCssClass: `${args[0].containerCssClass || ''} writing-mode-vertical-rl`,
                dropdownCssClass: `${args[0].dropdownCssClass || ''} writing-mode-vertical-rl`});
        }

        const result = originalSelect2.bind(this)(...args);

        if (isVerticalConstructor) {
            const api = $(this).data('select2');
            extendSelect2Instance.bind(api)();
        }
        return result;
    };


    for (const key in originalSelect2) {
        extendedSelect2[key] = originalSelect2[key]; //defaults, locales, ajaxDefaults
    }

    $.fn.select2 = extendedSelect2;
}(jQuery));

/* eslint-enable */
