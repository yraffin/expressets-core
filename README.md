# ADECCO - TAG : Persons Service
This is the persons microservice of Adecco - Tag. 

## Getting Started

### Prerequisites

- NodeJS version 6.10.3 or higher [Get NodeJS LTS](https://www.docker.com/)
- MongoDB 3.4.4

### How To
 - Learning [Typescript](https://www.typescriptlang.org/)
 - Learning how to use **pleerock**'s library [routing-controllers](https://github.com/pleerock/routing-controllers) which help us creating our express server using typescript annotations.

### Quick start
```bash
# install the repository dependencies with npm
npm install

# start the server
npm start

```

## Developing

### Commands
We use [npm scripts](https://docs.npmjs.com/misc/scripts) as our build tool. Refer to the package.json script's entry for list of scripts.

### Environment
Database configuration, port setups, etc for NodeJS are maintained yaml config files in `~/config`
via [node-config](https://github.com/lorenwest/node-config).

### Debugging / Profiling

#### Node Inspector
[NodeInspector](https://github.com/node-inspector/node-inspector) is a visual debugging interface
for NodeJS applications based on Chrome DevTools. It offers rich debugging and profiling.

- [Debugging NodeJS in Chrome DevTools](https://mattdesl.svbtle.com/debugging-nodejs-in-chrome-devtools)

#### VSCode
[VSCode](https://code.visualstudio.com/) is a free code editor by Microsoft. It offers 
rich debugging capability and integration with NodeJS and TypeScript. I've pre-configured
VSCode to automatically run build tasks/etc when you click debug.

- [Debugging with VSCode by Jon Pappa](https://johnpapa.net/debugging-with-visual-studio-code/)