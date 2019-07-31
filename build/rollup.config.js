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
        external: ['jquery', 'lodash', 'i18n', 'lib/gamp/gamp', 'handlebars', 'lib/dompurify/purify'],
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
