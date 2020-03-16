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
 * Copyright (c) 2019 (original work) Open Assessment Technologies SA ;
 */

import path from 'path';
import glob from 'glob-promise';
import alias from 'rollup-plugin-alias';
import handlebarsPlugin from 'rollup-plugin-handlebars-plus';
import copy from 'rollup-plugin-copy';
import { copyFile, mkdirp } from 'fs-extra';
const Handlebars = require('handlebars');

const { srcDir, outputDir, aliases } = require('./path.js');
let inputs = glob.sync(path.join(srcDir, '**', '*.js'));

/**
 * class.js cannot be built, because it is not 'use strict' valid
 * This file will be just copied
 */
inputs = inputs.filter(file => !file.endsWith('class.js'));

/**
 * Support of handlebars 1.3.0
 * TODO remove once migrated to hbs >= 3.0.0
 */
const originalVisitor = Handlebars.Visitor;
Handlebars.Visitor = function() {
    return originalVisitor.call(this);
};
Handlebars.Visitor.prototype = Object.create(originalVisitor.prototype);
Handlebars.Visitor.prototype.accept = function() {
    try {
        originalVisitor.prototype.accept.apply(this, arguments);
    } catch (e) {}
};
/* --------------------------------------------------------- */

export default inputs.map(input => {
    const dir = path.dirname(path.relative(srcDir, input));

    return {
        input,
        output: {
            dir: path.join(outputDir, dir),
            format: 'amd'
        },
        external: [
            'jquery',
            'lodash',
            'i18n',
            'lib/gamp/gamp',
            'handlebars',
            'lib/dompurify/purify',
            'raphael',
            'select2-origin/select2',
            'select2-origin/select2_locale_ar',
            'select2-origin/select2_locale_bg',
            'select2-origin/select2_locale_ca',
            'select2-origin/select2_locale_cs',
            'select2-origin/select2_locale_da',
            'select2-origin/select2_locale_de',
            'select2-origin/select2_locale_el',
            'select2-origin/select2_locale_es',
            'select2-origin/select2_locale_et',
            'select2-origin/select2_locale_eu',
            'select2-origin/select2_locale_fa',
            'select2-origin/select2_locale_fi',
            'select2-origin/select2_locale_fr',
            'select2-origin/select2_locale_gl',
            'select2-origin/select2_locale_he',
            'select2-origin/select2_locale_hr',
            'select2-origin/select2_locale_hu',
            'select2-origin/select2_locale_id',
            'select2-origin/select2_locale_is',
            'select2-origin/select2_locale_it',
            'select2-origin/select2_locale_ja',
            'select2-origin/select2_locale_ko',
            'select2-origin/select2_locale_lt',
            'select2-origin/select2_locale_lv',
            'select2-origin/select2_locale_mk',
            'select2-origin/select2_locale_ms',
            'select2-origin/select2_locale_nl',
            'select2-origin/select2_locale_no',
            'select2-origin/select2_locale_pl',
            'select2-origin/select2_locale_pt-BR',
            'select2-origin/select2_locale_pt-PT',
            'select2-origin/select2_locale_ro',
            'select2-origin/select2_locale_ru',
            'select2-origin/select2_locale_sk',
            'select2-origin/select2_locale_sv',
            'select2-origin/select2_locale_th',
            'select2-origin/select2_locale_tr',
            'select2-origin/select2_locale_vi',
            'select2-origin/select2_locale_zh-CN'
        ],
        plugins: [
            alias({
                resolve: ['.js', '.json', '.tpl'],
                ...aliases
            }),
            handlebarsPlugin({
                handlebars: {
                    id: 'handlebars',
                    options: {
                        sourceMap: false
                    },
                    module: Handlebars
                },
                templateExtension: '.tpl'
            }),
            copy({
                targets: [{ src: path.join(srcDir, 'class.js'), dest: outputDir }]
            })
        ]
    };
});

/**
 * copy template files into dist, because other modules require them
 * It is asyncronous and it was made with purpose to run parallely with build,
 * because they do not effect each other
 */
glob(path.join(srcDir, '**', '*.tpl')).then(files => {
    files.forEach(async file => {
        const targetFile = path.resolve(outputDir, path.relative(srcDir, file));
        await mkdirp(path.dirname(targetFile));
        copyFile(file, targetFile);
    });
});
