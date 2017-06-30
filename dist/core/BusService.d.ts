/**
 * Represents the base mongo service.
 * @class
 */
export declare abstract class BusService {
    /** Service bus */
    private serviceBus;
    /** name of the queue */
    protected abstract name: string;
    /** name request queue */
    private readonly nameRequest;
    /** name request queue */
    private readonly nameResponse;
    /** Is sender */
    protected abstract isSender: boolean;
    constructor(name: string);
    /** Utils to send message */
    sendMessage(message: any): void;
    /** Utils to recive message */
    private receiveMessage(callback);
    /** Receive message */
    abstract onReceiveMessage(message: any): any;
}
