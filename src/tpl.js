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
 * - some helpers have been added
 */
import hb from 'handlebars';
import handlebarsHelpers from 'lib/handlebars/helpers';

handlebarsHelpers(hb);

const buildMap = {};
const extension = '.tpl';

export default {
    load(name, req, onload, config) {
        const ext = extension || config.extension;

        if (config.isBuild) {
            //optimization, r.js node.js version
            // eslint-disable-next-line
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
