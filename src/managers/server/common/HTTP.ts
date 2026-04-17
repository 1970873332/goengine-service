import { Server } from "http";
import BaseServerManager from "../Index";

/**
 * HTTP 服务器
 */
export default abstract class HTTPServerManager extends BaseServerManager {
    /**
     * 应用
     */
    protected declare  static app?: Server;

    /**
     * 获取
     * @returns
     */
    public static obtain(
        ...args: Partial<Parameters<typeof HTTPServerManager.create>>
    ): Server {
        return (this.app ??= this.create(...args));
    }
    /**
     * 创建
     * @returns
     */
    public static create(
        ...args: Partial<ConstructorParameters<typeof Server>>
    ): Server {
        const [options, callback] = args;
        return new Server(options ?? {}, callback);
    }
    /**
     * 设置
     * @param app
     */
    public static set(app: Server): Server {
        this.app?.close();
        this.app = app;
        return this.app;
    }
    /**
     * 重生
     * @param args
     * @returns
     */
    public static rebirth(
        ...args: Partial<Parameters<typeof HTTPServerManager.create>>
    ): Server {
        return this.set(this.create(...args));
    }
    /**
     * 监听
     */
    public static listenCallback(
        ...args: Parameters<Server["listen"]>
    ): Server {
        const app: Server = this.obtain();
        this.callback(app.listen(...args));
        return app;
    }
}
