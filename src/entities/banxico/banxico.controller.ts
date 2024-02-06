import IController from "@common/interfaces/controller.interface";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiOperationGet, ApiPath, SwaggerDefinitionConstant } from "swagger-express-ts";
import { BanxicoService } from "./banxico.interface";

@ApiPath({
    name: 'Banxico',
    path: '/banxico'
})
class BanxicoController implements IController {
    public path = '/banxico';
    public router: Router = Router();

    constructor(){
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(`${this.path}`, this.getBanxicoSeries);
    }

    @ApiOperationGet({
        responses: {
            '200': {
                model: 'Banxico',
                type: SwaggerDefinitionConstant.Response.Type.OBJECT,
                description: 'Obtiene las series SF43936, SP30578, SF61745 de Banxico.'
            }
        }
    })
    public async getBanxicoSeries(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const data = await BanxicoService.getSeries();

            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }
}

export default BanxicoController;