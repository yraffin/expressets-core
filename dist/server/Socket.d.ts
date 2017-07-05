/// <reference types="socket.io" />
export declare class Socket {
    /**
     * Setup the socket server on express application.
     * @method
     * @param {Application} app The express application.
     */
    setupSockets(app: any): SocketIOStatic;
    setupSocketAuthentication(socket: any, next: any): void;
}
