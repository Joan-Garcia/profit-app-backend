import express, { Application } from 'express';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';
import BaseRouter from './entities';
import * as swagger from 'swagger-express-ts';
import morganMiddleware from './middlewares/http-logger.middleware';
import cors from 'cors';
import helmet from 'helmet';
import fileUpload from 'express-fileupload';
import { SwaggerDefinitionConstant } from 'swagger-express-ts';

class App {
    public app: Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.inicializarMiddlewares();
        if ( process.env.NODE_ENV === 'production' ) {
            this.inicializarHelmet();
            this.app.use(cors({ origin: process.env.CORS_ORIGIN }));
        } else {
            this.inicializarSwagger();
            this.inicializarCors();
        }

        this.incializarControllers();
        this.inicializarErrorHandlers();
    }

    private inicializarMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(morganMiddleware);
        this.app.use(fileUpload());
    }

    private incializarControllers(): void {
        const baseRouter = new BaseRouter();
        this.app.use('/profit-app/api', baseRouter.router);
    }

    private inicializarCors(): void {
        this.app.use(cors());
    }

    private inicializarHelmet(): void {
        this.app.use(helmet());
    }

    private inicializarErrorHandlers(): void {
        this.app.use(errorHandler);
        this.app.use(notFoundHandler);
    }

    private inicializarSwagger(): void {
        this.app.use('/api-docs/swagger', express.static('swagger'));
        this.app.use(
            '/api-docs/swagger/assets',
            express.static('node_modules/swagger-ui-dist')
        );

        this.app.use(
            swagger.express({
                definition: {
                    externalDocs: {
                        url: ''
                    },
                    info: {
                        title: 'PROFIT-APP',
                        version: '1.0.0'
                    },
                    responses: {
                        200: {
                            description: 'Petición procesada correctamente.'
                        },
                        401: {
                            description: 'Error de autenticación.',
                            type: SwaggerDefinitionConstant.Response.Type.STRING
                        },
                        500: {
                            description: 'Error interno del servidor.',
                            type: SwaggerDefinitionConstant.Response.Type.STRING
                        }
                    },
                    basePath: "/profit-app/api"
                }
            })
        );
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}

export default App;