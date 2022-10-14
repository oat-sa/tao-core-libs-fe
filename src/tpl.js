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
 * Copyright (c) 2013-2019 (original work) Open Assessment Technologies SA (under the project TAO-PRODUCT);
 */

/**
 * ORGINAL VERSION:
 * https://github.com/epeli/requirejs-hbs
 * Copyright 2013 Esa-Matti Suuronen
 * MIT License : https://github.com/epeli/requirejs-hbs/blob/master/LICENSE
 *
 * MODIFIED VERSION:
 * @author Bertrand Chevrier <bertrand@taotesting.com> for OAT SA
 * - Minor code refactoring
 * - i18n helper has been added
 * - dompurify helper has been added
 */
import hb from 'handlebars';
import __ from 'i18n';
import _ from 'lodash';
import DOMPurify from 'lib/dompurify/purify';
import fs from 'fs-extra';

const buildMap = {};
const extension = '.tpl';

//register a i18n helper
hb.registerHelper('__', key => __(key));

/**
 * Register dompurify helper
 *
 * https://github.com/cure53/DOMPurify
 * with config SAFE_FOR_TEMPLATES: true
 * to make output safe for template systems
 */
hb.registerHelper('dompurify', context => DOMPurify.sanitize(context));

/**
 * Register join helper
 *
 * Example :
 * var values = {a:v1, b:v2, c:v3};
 * Using {{{join attributes '=' ' ' '"'}}} will return : a="v1" b="v2" c="v3"
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

//register a classic "for loop" helper
//it also adds a local variable "i" as the index in each iteration loop
hb.registerHelper('for', function forHelper(startIndex, stopIndex, increment, options) {
    let ret = '';
    startIndex = parseInt(startIndex);
    stopIndex = parseInt(stopIndex);
    increment = parseInt(increment);

    for (let i = startIndex; i < stopIndex; i += increment) {
        ret += options.fn(_.extend({}, this, { i: i }));
    }

    return ret;
});

hb.registerHelper('equal', function equalHelper(var1, var2, options) {
    if (var1 === var2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

// register a "get property" helper
// it gets the named property from the provided context
hb.registerHelper('property', (name, context) => context[name] || '');

// register an 'includes' helper
// it checks if value is in array
hb.registerHelper('includes', function includesHelper(haystack, needle, options) {
    if (_.contains(haystack, needle)) {
        return options.fn(this);
    }
});

export default {
    load(name, req, onload, config) {
        const ext = extension || config.extension;

        if (config.isBuild) {
            //optimization, r.js node.js version
            buildMap[name] = fs
                .readFileSync(req.toUrl(name + ext))
                .toString()
                .trim();
            onload();
        } else {
            req([`text!${name}${ext}`], function (raw) {
                // Just return the compiled template
                onload(function () {
                    const compiled = hb.compile(raw);
                    return compiled.apply(hb, arguments).trim();
                });
            });
        }
    },
    write(pluginName, moduleName, write) {
        if (moduleName in buildMap) {
            const compiled = hb.precompile(buildMap[moduleName]);
            // Write out precompiled version of the template function as AMD definition.
            write(
                `define('tpl!${moduleName}', ['handlebars'], function(hb){ \n` +
                    `return hb.template(${compiled.toString()});\n` +
                    `});\n`
            );
        }
    }
};
