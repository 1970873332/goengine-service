import express, { Express } from "express";

/**
 * Express 管理
 */
export default abstract class BaseExpressManager {
    /**
     * 应用
     */
    declare protected static app: Express;

    /**
     * 获取
     * @returns
     */
    public static obtain(): Express {
        return (this.app ??= this.create());
    }
    /**
     * 创建
     * @returns
     */
    public static create(): Express {
        return express();
    }
}
