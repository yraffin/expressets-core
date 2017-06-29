import { Service, Inject } from 'typedi';
import * as azure from 'azure';

const request = "request";
const response = "response";
/**
 * Represents the base mongo service.
 * @class
 */
@Service()
export abstract class BusService {

    /** Service bus */
    private serviceBus;

    /** name of the queue */
    protected abstract name: string;

    /** name request queue */
    private get nameRequest(){
        return this.name + request;
    };

    /** name request queue */
    private get nameResponse(){
        return this.name + response;
    }

    /** Is sender */
    protected abstract isSender: boolean;
    
    constructor(name: string){
        this.name = name;
        this.serviceBus = azure.createServiceBusService('Endpoint=sb://adeccotag.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=3s1kAmkUJnD3a9RwajozJv8B0mJ+07rHZG0n2Tgkuo4=');
        this.serviceBus.createQueueIfNotExists(this.nameRequest, function(){});
        this.serviceBus.createQueueIfNotExists(this.nameResponse, function(){});
        this.receiveMessage(this.onReceiveMessage);
        console.log('Bus Instancied');
    }

    /** Utils to send message */
    sendMessage(message: any){
        this.serviceBus.sendQueueMessage(this.isSender ? this.nameRequest : this.nameResponse, message, function(){});
    }

    /** Utils to recive message */
    private receiveMessage(callback){
        this.serviceBus.receiveQueueMessage(this.isSender ? this.nameResponse : this.nameRequest, (error, message) => {
            if(message){
                callback(message);
            }
            this.receiveMessage(this.onReceiveMessage);
        });
    }

    /** Receive message */
    abstract onReceiveMessage(message: any);
}
