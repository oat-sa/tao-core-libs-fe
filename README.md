# tao-core-libs
TAO Frontent Core Libraries

## Available scripts in the project:

- `npm run build`: put libraries in AMD format into `dist` directory

## How to add a new library

* Library should be in `src` in ES6 format.
  * If it will come from `node_modules`, create a placeholder file that will resolve it from there.
  * If it is a local library file, just place it there.
* Libraries are built with `rollup` to AMD format into `dist` directory.
  * If it should be built, add the name of the module into `rollup.config.js`
  * If library is already built into AMD format then use rollup to copy it into `dist` directory and use the same name like in `src`.