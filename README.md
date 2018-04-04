# ColorBlindSim

Color blindness affects approximately 1 in 20 people of the world population. ColorBlindSim lets you experience the world as they do, right from your browser. [Check it out!](https://www.colorblindsim.com)

ColorBlindSim requires a fairly recent browser to work. It has been tested to work in the most recent versions of:

* Chrome (desktop and mobile)
* Firefox (desktop and mobile)
* Safari (desktop and mobile)
* Edge (desktop)
* Samsung Internet (mobile)

If you find any bugs please [file an issue](https://github.com/koenkivits/colorblindsim/issues/new).

## Build it yourself

If you want to build ColorBlindSim yourself you need to have [Node.js and npm](https://nodejs.org/en/) installed. The build steps have only been tested on Linux, though macOS should work just fine. Windows probably won't work (due to syntax being used in npm scripts), but I'm open for pull requests.

If you meet the requirements you can run the following commands from the top-level directory of this repository:

```
npm install
npm run build
```

Alternatively you can spin up a development server which features live reloads:

```
npm run watch
# use watch:https if you want to run an HTTPS server
```

## Tools used

ColorBlindSim is built using the following JavaScript tools:

* [Preact](https://preactjs.com/) for rendering
* [Unistore](https://github.com/developit/unistore) for state management
* [Parcel](https://parceljs.org/) for bundling
* [Babel](http://babeljs.io/) for new JavaScript features and JSX
* [Sass](https://sass-lang.com/) to ease writing CSS

## Configuration

Some configuration can be found in the [config](./config) directory, but some configuration files need to be at the top directory of the project for automatic discovery. These files are:

* `.babelrc`: configuration for [Babel](http://babeljs.io/)
* `.editorconfig`: configuration for text editors and IDEs, [EditorConfig](http://editorconfig.org/) standard
* `.nvmrc`: used by [nvm](https://github.com/creationix/nvm) to determine which Node.js version to use
* `.prettierrc`: configuration for [prettier](https://prettier.io/), the automatic code formatter being used for this project

## License

[MIT licensed](./LICENSE) © [Koen Kivits](https://koen.kivits.com)
