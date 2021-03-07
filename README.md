# @NewCircuit/logging
A standard logging package for [@NewCircuit](https://github.com/NewCircuit)
projects.


## Install
Make sure you have an .npmrc in your project that adds the GitHub package
registry.
```sh
# .npmrc
@NewCircuit:registry=https://npm.pkg.github.com
```

Then install.
```sh
npm i @NewCircuit/logging
```

## Log Configuration
See [log4js configuration documentation](https://log4js-node.github.io/log4js-node/api.html)


## Class Example
```js
const LogFactory = require('@NewCircuit/logging');
// Put this instance where it's globally accessible.
const log = new LogFactory('info');

class Test {
	methodA() {
		// The last parameter is optional.
		const logger = log.getLogger('testing', this, 'methodA');
		logger.info('This is a test!');
	}
}
const test = new Test();
test.methodA();
```

Output:
```log
[2021-03-07T14:57:27.258] [INFO] [main] [Test.methodA()]: This is a test!
```


## Function Example
```js
const LogFactory = require('@NewCircuit/logging');
// Put this instance where it's globally accessible.
const log = new LogFactory('info');

function test() {
	// The last parameter is optional.
	const logger = log.getLogger('testing', test, 'test.js');
	logger.info('This is a test!');
}

test();
```

Output:
```log
[2021-03-07T14:58:22.631] [INFO] [testing] [test()]: This is a test!
```
