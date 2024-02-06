import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import HttpException from "@common/exceptions/http.exception";
import IJwtPayload from "@common/interfaces/jwt-payload.interface";

export const jwtHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if ( req.method === 'OPTIONS' ) {
        next();
        return;
    }
    const autHeader: string = req.headers.authorization;
    if ( autHeader ) {
        const [ prefix, token ]: string[] = autHeader.split(' ');
        if ( prefix !== 'Bearer' ) {
            next(new HttpException(StatusCodes.UNAUTHORIZED, 'Credenciales invalidas.'));
            return;
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if ( err ) {
                next(new HttpException(StatusCodes.UNAUTHORIZED, 'Credenciales invalidas', err.message));
                return;
            }
            /**
             * * Guardamos el payload decodificado en req.payload
             */
            req.payload = decoded as IJwtPayload;
            next();
            return;
        });
    } else {
        next(new HttpException(StatusCodes.UNAUTHORIZED, 'Es necesario estar autenticado.'));
        return;
    }
};