# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Docker images

Link to docker images is [here](https://hub.docker.com/r/saitakoo/app/tags)

## Downloading

```
git clone https://github.com/LordOfTheVillage/nodejs2023Q2-service
```

## Installing NPM modules

```
npm install --legacy-peer-deps
```
or if not working
```
npm install --legacy-peer-deps
```

## Running application

Add .env file like in .env.example

```
docker-compose up
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
