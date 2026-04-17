import cors from "cors";
import { Express, raw } from "express";
import BaseExpressManager from "../Index";

/**
 * 文件 Express 管理
 */
export default abstract class FileExpressManager extends BaseExpressManager {
    public static create(): Express {
        const app: Express = super.create();

        // 文件处理
        app.use(
            raw({
                limit: "10mb",
                type: [
                    "application/octet-stream",
                    "image/*",
                    "video/*",
                    "audio/*",
                ],
            }),
        );
        // 跨域处理
        app.use(
            cors({
                origin: "localhost",
                maxAge: 86400,
                credentials: true,
                methods: ["POST", "OPTIONS"],
                allowedHeaders: ["Content-Type", "Authorization"],
            }),
        );

        return app;
    }
}
