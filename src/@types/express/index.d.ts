import IJwtPayload from "@common/interfaces/jwt-payload.interface";

declare module 'express' {
    export interface Request {
        payload?: IJwtPayload;
    };
};