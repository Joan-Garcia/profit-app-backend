export default interface IJwtPayload {
    idPersonal: number;
    idUsuario: string;
    oficina?: string;
    nombre: string;
    email?: string;
}