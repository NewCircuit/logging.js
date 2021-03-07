import * as log4js from 'log4js';

interface LoggingEvent extends log4js.LoggingEvent {
	context: {
		className?: string,
		funcName: string,
	},
}

const FUNC = 'funcName';
const CLSS = 'className';

export default class LoggerFactory {
	constructor(level: string)
	constructor(config: log4js.Configuration)

	constructor(levelOrConfig: string | log4js.Configuration) {
		if (typeof levelOrConfig === 'string') {
			this.defaults(levelOrConfig);
		} else {
			this.configure(levelOrConfig);
		}
	}

	// See getLogger below
	public getLogger<T extends Object>(
		category: string,
		classInstance: T,
		method?: string,
	): log4js.Logger;

	// See getLogger below
	public getLogger<T extends Function>(
		category: string,
		func: T,
		method?: string,
	): log4js.Logger;


	/**
	 * @param {string} category Log4js category (see log4js documentation)
	 * @param {Object | Function} A class instance or function reference
	 * @param {string | undefined} Method name for the class or module where
	 * a function sits. 
	 */
	public getLogger<T extends Object>(
		category: string,
		classOrFunc: T,
		method: string,
	): log4js.Logger {
		if (classOrFunc instanceof Function) {
			return this.getLoggerFunc(category, classOrFunc);
		}
		return this.getLoggerClass(category, classOrFunc, method);
	}

	private getLoggerFunc<T extends Function>(
		category: string,
		func: T,
	): log4js.Logger {
		const logger = log4js.getLogger(category);
		const funcName = func.name;

		logger.addContext(FUNC, funcName);

		return logger;
	}

	private getLoggerClass<T extends Object>(
		category: string,
		classInstance: T,
		method?: string,
	): log4js.Logger {
		const logger = log4js.getLogger(category);
		const className = classInstance.constructor.name;
	
		logger.addContext(CLSS, className);
		if (method) {
			logger.addContext(FUNC, method);
		}

		return logger;
	}

	private defaults(level: string): void {
		const config: log4js.Configuration = {
		  appenders: {
		    out: {
		    	type: 'stdout',
		    	layout: {
		      		type: 'pattern',
		      		pattern: '[%d] [%p] [%c] %x{call}: %m%n',
		      		tokens: {
			      		call: (event: LoggingEvent) => {
			      			const { className, funcName } = event.context;
			      			if (className) {
			      				return `[${className}.${funcName}()]`;
			      			}
			      			return `[${funcName}()]`;
			      		},
		      		},
		      	},
		    },
		  },
		  categories: {
			  	default: {
			  		appenders: ['out'],
			  		level,
			  	},
		  	}
		};
		log4js.configure(config);
	}

	private configure(config: log4js.Configuration): void {
		log4js.configure(config);
	}
}
