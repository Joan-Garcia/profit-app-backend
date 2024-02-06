import { Router } from "express";
import BanxicoController from "./banxico/banxico.controller";


class BaseRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.router.use(new BanxicoController().router);
    }
}

export default BaseRouter;