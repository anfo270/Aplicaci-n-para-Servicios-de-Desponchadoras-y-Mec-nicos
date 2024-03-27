export interface User {
    id: string,
    nombreUsuario: string,
    nombreEmpresa: String,
    ApellidMaterno: string,
    correoElectronico: string,
    contraseña: string,
    FechaNacimiento: Date,
    tipo: 'Empresa' | 'Cliente'
}
