import { Express } from "express";
import { Server as HTTPServer } from "http";
import { Server as HTTPSServer } from "https";
import { AddressInfo, Server } from "net";

/**
 * 服务器管理
 */
export default abstract class BaseServerManager {
    /**
     * Express
     */
    declare protected static express: Express;

    /**
     * 回调
     * @param app
     * @returns
     */
    public static callback(app: Server): Server {
        const ColorMap = {
            重置: "\x1b[0m",
            红色: "\x1b[31m",
            绿色: "\x1b[32m",
            黄色: "\x1b[33m",
            蓝色: "\x1b[34m",
            品红: "\x1b[35m",
            青色: "\x1b[36m",
            白色: "\x1b[37m",
            粗体: "\x1b[1m",
        } as const;

        const address: string | AddressInfo | null = app.address();

        if (address === null) {
            console.log(
                `${ColorMap.红色}❌ 服务器地址信息不可用${ColorMap.重置}`,
            );
        } else if (typeof address === "string") {
            console.log(
                `${ColorMap.绿色}✅ 服务器已启动,监听地址 ${ColorMap.黄色}${address}${ColorMap.重置}`,
            );
        } else if (typeof address === "object") {
            let type: ModConfig["agreement"] | undefined,
                info: string | undefined,
                infoColor: string | undefined;
            const host: string =
                address.family === "IPv6"
                    ? `[${address.address}]`
                    : address.address;

            if (app instanceof HTTPServer) type = "http";
            else if (app instanceof HTTPSServer) type = "https";

            if (address.address === "::" && address.family === "IPv6") {
                info = " (IPv6双栈模式,支持IPv4和IPv6客户端)";
                infoColor = ColorMap.绿色;
            } else if (
                address.address === "0.0.0.0" &&
                address.family === "IPv4"
            ) {
                info = " (IPv4模式,仅支持IPv4客户端)";
                infoColor = ColorMap.蓝色;
            } else if (address.address === "::1") {
                info = " (IPv6本地模式,仅IPv6本地访问)";
                infoColor = ColorMap.品红;
            } else if (address.address === "127.0.0.1") {
                info = " (IPv4本地模式,仅IPv4本地访问)";
                infoColor = ColorMap.品红;
            } else {
                info = ` (${address.family}模式)`;
            }

            console.log(
                `${ColorMap.粗体}${ColorMap.绿色}✅ 服务器已启动${ColorMap.重置}`,
            );
            console.log(
                `${ColorMap.白色}监听地址: ${ColorMap.黄色}${type}://${host}:${address.port}${ColorMap.重置}`,
            );
            console.log(
                `${ColorMap.白色}监听模式: ${infoColor}${info}${ColorMap.重置}`,
            );

            if (address.address === "::") {
                console.log(
                    `${ColorMap.青色}📢 提示：服务正在双栈模式下运行${ColorMap.重置}`,
                );
                console.log(
                    `${ColorMap.白色}  IPv4: ${ColorMap.黄色}${type}://localhost:${address.port}${ColorMap.重置}`,
                );
                console.log(
                    `${ColorMap.白色}  IPv6: ${ColorMap.黄色}${type}://[::1]:${address.port}${ColorMap.重置}`,
                );
            }
        }
        return app;
    }
}
