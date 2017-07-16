/**
 * Represents the Azure interface.
 * @interface
 */
export interface IAzure {
    /** Gets or sets the connection string. @property {string} */
    busConnectionString?: string;
    /** Gets or sets the application insights key. @property {string} */
    appInsights?: string;
    /** The b2c client identifier string */
    b2cClientId?: string;
    /** The b2c tenant name string */
    b2cTenantName?: string;
    /** The config b2c return url string */
    b2cReturnUrl?: string;
    /** The config b2c secret string */
    b2cSecret?: string;
    /** The config b2c signin strategy string */
    b2cSigninStrategy?: string;
    /** The config b2c scope string */
    b2cScope?: string[];
}
/**
 * Represents the application Azure configuration
 * @class
 */
export declare class Azure {
    /** The config connection string */
    private _busConnectionString;
    /** The config connection string */
    private _appInsights;
    /** The b2c client identifier string */
    private _b2cClientId;
    /** The b2c tenant name string */
    private _b2cTenantName;
    /** The config b2c return url string */
    private _b2cReturnUrl;
    /** The config b2c secret string */
    private _b2cSecret;
    /** The config b2c signin strategy string */
    private _b2cSigninStrategy;
    /** The config b2c scope string */
    private _b2cScope;
    /** Gets the connection string. @property {string} */
    /** Sets the connection string. @property {string} */
    busConnectionString: string;
    /** Gets the application insights key. @property {string} */
    /** Sets the application insights key. @property {string} */
    appInsights: string;
    /** Gets the b2c client identifier. @property {string} */
    /** Sets the b2c client identifier. @property {string} */
    b2cClientId: string;
    /** Gets the B2C tenant name. @property {string} */
    /** Sets the B2C tenant name. @property {string} */
    b2cTenantName: string;
    /** Gets the B2C return url. @property {string} */
    /** Sets the B2C return url. @property {string} */
    b2cReturnUrl: string;
    /** Gets the B2C secret key. @property {string} */
    /** Sets the B2C secret key. @property {string} */
    b2cSecret: string;
    /** Gets the B2C signin strategy. @property {string} */
    /** Sets the B2C signin strategy. @property {string} */
    b2cSigninStrategy: string;
    /** Gets the B2C scope. @property {string[]} */
    /** Sets the B2C scope. @property {string[]} */
    b2cScope: string[];
    /**
     * Initializes the bus service configuration
     * @method
     * @param {IBus} options The bus service configuration options.
     */
    initialize(options: IAzure): void;
}
