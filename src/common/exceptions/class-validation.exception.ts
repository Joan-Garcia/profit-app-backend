import { ValidationError } from 'class-validator'
import { StatusCodes } from 'http-status-codes';
import HttpException from './http.exception';

export default class ClassValidationException extends HttpException {
    constructor(errors: ValidationError[]) {
        let mensaje: string = "";
        let errorStr: string = "";

        for ( const error of errors ) {
            mensaje += `El valor '${error.value}' es inválido para el campo '${error.property}'.`;
            errorStr += `${error.toString()}.`;
        }
        super(StatusCodes.BAD_REQUEST, `Error al validar los parámetros de la petición`, errorStr);
    }
};