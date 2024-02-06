import logger from "@common/logger";
import HttpException from "./http.exception";

export default class MysqlException extends HttpException {
    constructor (query: string, error: string) {
        super(500, 'Error del servidor', `${query}: ${error}`);
        logger.error(this.error);
    }
}