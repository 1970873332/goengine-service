import cors from "cors";
import { Express, json, text, urlencoded } from "express";
import BaseExpressManager from "../Index";

/**
 * API Express 管理
 */
export default abstract class APIExpressManager extends BaseExpressManager {
    public static create(): Express {
        const app: Express = super.create();

        // json处理
        app.use(
            json({
                limit: "1mb",
                type: "application/json",
            }),
        );
        // 文本处理
        app.use(
            text({
                type: "text/plain",
            }),
        );
        // 表单处理
        app.use(
            urlencoded({
                extended: true,
                type: "application/x-www-form-urlencoded",
            }),
        );
        // 跨域处理
        app.use(
            cors({
                origin: "*",
                maxAge: 86400,
                methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
                allowedHeaders: [
                    "Content-Type",
                    "Authorization",
                    "X-Requested-With",
                ],
            }),
        );

        return app;
    }
}
