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
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';

const { srcDir, outputDir, nodeModulesDir } = require('./path');

const moduleNames = [
    'lodash'
];

export default moduleNames.map(name => {
    const input = `${path.join(srcDir, name)}.js`;
    return {
        input,
        output: {
            dir: outputDir,
            format: 'amd',
            name
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            copy({
                targets: {
                  [path.join(nodeModulesDir, 'jquery', 'dist', 'jquery.js')]: 'dist/jquery.js',
                  [path.join(nodeModulesDir, 'moment', 'min', 'moment-with-locales.js')]: 'dist/moment.js',
                  [path.join(nodeModulesDir, 'handlebars', 'dist', 'handlebars.amd.js')]: 'dist/handlebars.js',
                  [path.join(nodeModulesDir, 'handlebars', 'dist', 'handlebars.runtime.amd.js')]: 'dist/handlebars.runtime.js',
                }
              })
        ]
    };
});
