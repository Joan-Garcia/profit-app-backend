import { Request, Response, NextFunction } from "express";
import logger from "@common/logger";
import HttpException from "@common/exceptions/http.exception";

export const errorHandler = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const status = error.statusCode || error.status || 500;
    if ( error.error ) {
        logger.error(error.stack);
    }
    response.status(status).send(error.message);
};