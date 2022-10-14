# tao-core-libs

TAO Frontent Core Libraries

## Available scripts in the project:

- `npm run build`: put libraries in AMD format into `dist` directory
- `npm run build:watch`: put libraries in AMD format into `dist` directory and watch for changes
- `npm run lint:src`: check syntax of code
- `npm run lint:report`: build a syntax check report

## Shared libraries from npm

Defined libraries shared between the `@oat-sa` world using this repository `peerDependencies`

## Shared libraries from sources

* Library should be in `src` in ES6 format.
* Libraries are built with `rollup` to AMD format into `dist` directory.
