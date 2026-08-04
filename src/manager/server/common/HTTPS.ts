import { Server } from "https";
import { TlsOptions } from "tls";
import HTTPServerManager from "./HTTP";

/**
 * HTTPS 服务器
 */
export default class HTTPSServerManager extends HTTPServerManager {
    /**
     * SSL 配置
     */
    declare public static ssl: TlsOptions;
    declare public static app?: Server;

    public static obtain(
        ...args: Partial<Parameters<typeof HTTPSServerManager.create>>
    ): Server {
        return (this.app ??= this.create(...args));
    }

    public static create(
        ...args: Partial<ConstructorParameters<typeof Server>>
    ): Server {
        const [options, callback] = args;
        return new Server(options ?? { ...this.ssl }, callback);
    }

    public static set(app: Server): Server {
        this.app?.close();
        this.app = app;
        return this.app;
    }

    public static rebirth(
        ...args: Partial<Parameters<typeof HTTPSServerManager.create>>
    ): Server {
        return this.set(this.create(...args));
    }

    public static listenCallback(
        ...args: Parameters<Server["listen"]>
    ): Server {
        const app: Server = this.obtain();
        this.callback(app.listen(...args));
        return app;
    }
}
