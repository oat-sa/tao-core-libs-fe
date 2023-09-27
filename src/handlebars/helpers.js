/**
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2013-2022 (original work) Open Assessment Technologies SA (under the project TAO-PRODUCT);
 */

import __ from 'i18n';
import _ from 'lodash';
import DOMPurify from 'lib/dompurify/purify';

/**
 * Registers Handlebars helpers
 * @param {Handlebars} hb - The Handlebars entry point.
 */
export default function handlebarsHelpers(hb) {
    /**
     * Registers an i18n helper.
     *
     * @example
     * ```html
     * <p>{{__ 'Text to translate'}}</p>
     * ```
     */
    hb.registerHelper('__', key => __(key));

    /**
     * Registers a DOMPurify helper for filtering variable to render as HTML.
     *
     * https://github.com/cure53/DOMPurify
     * with config SAFE_FOR_TEMPLATES: true
     * to make output safe for template systems
     *
     * @example
     * ```javascript
     * const variable = '<p>Some content</p>';
     * ```
     * Can be used this way:
     * ```html
     * <div>{{{dompurify variable}}}</div>
     * ```
     */
    hb.registerHelper('dompurify', context => DOMPurify.sanitize(context));

    /**
     * Registers a join helper for building strings from an object.
     *
     * @example
     * ```javascript
     * var values = {a:v1, b:v2, c:v3};
     * ```
     * Can be used this way:
     * ```html
     * Using {{{join values '=' ' ' '"'}}} will return : a="v1" b="v2" c="v3"
     * Using {{{join values null ' or ' '*'}}} will return : *v1* or *v2* or *v3*
     */
    hb.registerHelper('join', function joinHelper(arr, keyValueGlue, fragmentGlue, wrapper) {
        const fragments = [];

        keyValueGlue = typeof keyValueGlue === 'string' ? keyValueGlue : void 0;
        fragmentGlue = typeof fragmentGlue === 'string' ? fragmentGlue : ' ';
        wrapper = typeof wrapper === 'string' ? wrapper : '"';

        _.forIn(arr, function (value, key) {
            let fragment = '';
            if (value !== null || typeof value !== 'undefined') {
                if (typeof value === 'boolean') {
                    value = value ? 'true' : 'false';
                } else if (typeof value === 'object') {
                    value = _.values(value).join(' ');
                }
            } else {
                value = '';
            }
            if (typeof keyValueGlue !== 'undefined') {
                fragment += key + keyValueGlue;
            }
            fragment += wrapper + value + wrapper;
            fragments.push(fragment);
        });

        return fragments.join(fragmentGlue);
    });

    /**
     * Registers a classic "for loop" helper.
     * It also adds a local variable "i" as the index in each iteration loop.
     *
     * @example
     * ```html
     * <ul>
     *     {{#for 0 10 1}}
     *     <li>{{i}}</li>
     *     {{/for}}
     * </ul>
     */
    hb.registerHelper('for', function forHelper(startIndex, stopIndex, increment, options) {
        let ret = '';
        startIndex = parseInt(startIndex, 10);
        stopIndex = parseInt(stopIndex, 10);
        increment = parseInt(increment, 10);

        for (let i = startIndex; i < stopIndex; i += increment) {
            ret += options.fn(_.extend({}, this, { i: i }));
        }

        return ret;
    });

    /**
     * Registers an equality helper.
     */
    hb.registerHelper('equal', function equalHelper(var1, var2, options) {
        if (var1 === var2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    /**
     * Registers a "get property" helper.
     * It gets the named property from the provided context
     */
    hb.registerHelper('property', (name, context) => {
        if (typeof context[name] !== 'undefined') {
            return new hb.SafeString(context[name]);
        }
        return '';
    });

    /**
     * Registers an 'includes' helper.
     * It checks if value is in array.
     */
    hb.registerHelper('includes', function includesHelper(haystack, needle, options) {
        if (_.includes(haystack, needle)) {
            return options.fn(this);
        }
    });
}
