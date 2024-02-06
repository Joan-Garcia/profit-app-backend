import HttpException from "@common/exceptions/http.exception";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";

export interface BanxicoDataResponse {
    bmx: {
        series: Series[];
    };
}

export interface Series {
    idSerie: string;
    titulo: string;
    datos: Dato[];
}

export interface Dato {
    fecha: string;
    dato: string;
}

export class BanxicoService {
    public static async getSeries(): Promise<BanxicoDataResponse> {
        const series = ['SF43936', 'SP30578', 'SF61745']; // Cetes, inflacion y tasa objetivo
        const initialDate = dayjs().subtract(10, 'year').format('YYYY-MM-DD');
        const finalDate = dayjs().format('YYYY-MM-DD');

        let response: AxiosResponse;
        const apiUrl = `https://www.banxico.org.mx/SieAPIRest/service/v1/series/${series.join(',')}/datos/${initialDate}/${finalDate}`;
        
        try {
            response = await axios.get(apiUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Bmx-Token': process.env.BMX_TOKEN
                },
                params: {
                    decimales: 'sinCeros'
                }
            })

            return response.data;
        } catch (error) {
            throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al obtener los datos de Banxico');
        }
    }
}