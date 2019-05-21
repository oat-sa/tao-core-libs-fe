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

const glob = require('glob');
const fs = require('fs');
const path = require('path');
const {rootPath, srcDir} = require('./path');

const files = glob.sync(path.join(srcDir, '*.js'));

const indexFileContent = files.map(file => {
    const moduleName = path.basename(file, '.js');
    const moduleExportName = moduleName.replace(/\.(.)/g, (fullMatch, nextLetter) => nextLetter.toUpperCase());
    return `export const ${moduleExportName} = require('./${path.relative(rootPath, path.join(srcDir, moduleName))}');`;
}).join('\n');

fs.writeFile(path.join(rootPath, 'index.js'), indexFileContent, {flag: 'w'}, err => {
    if (err) {
        throw err;
    }
});