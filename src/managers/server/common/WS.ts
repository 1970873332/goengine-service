import { WebSocketServer } from "ws";
import BaseServerManager from "../Index";
import HTTPServerManager from "./HTTP";

/**
 * WebSocket 服务器
 */
export default class WSServerManager
    extends BaseServerManager
    implements HTTPServerManager
{
    declare protected static app?: WebSocketServer;

    public static obtain(
        ...args: Parameters<typeof WSServerManager.create>
    ): WebSocketServer {
        return (this.app ??= this.create(...args));
    }

    public static create(
        ...args: ConstructorParameters<typeof WebSocketServer>
    ): WebSocketServer {
        return new WebSocketServer(...args);
    }

    public static set(app: WebSocketServer): WebSocketServer {
        this.app?.close();
        this.app = app;
        return this.app;
    }

    public static rebirth(
        ...args: Parameters<typeof WSServerManager.create>
    ): WebSocketServer {
        return this.set(this.create(...args));
    }
}
