/**
 * Represents the base mongo service.
 * @class
 */
export declare abstract class BusService {
    /** name of the queue @protected @property {string} */
    protected abstract name: string;
    /** Is sender @protected @property {boolean} */
    protected abstract isSender: boolean;
    /** Service bus */
    private serviceBus;
    /** name request queue */
    private readonly nameRequest;
    /** name request queue */
    private readonly nameResponse;
    constructor(name: string);
    /** Utils to send message */
    sendMessage(message: any): void;
    /** Receive message */
    abstract onReceiveMessage(message: any): any;
    /** Utils to recive message */
    private receiveMessage(callback);
    /**
     * Log an error if occurred.
     * @method
     * @param {string} message The message to log on error.
     * @param {any} error The current error.
     */
    private logError(message, error);
}
