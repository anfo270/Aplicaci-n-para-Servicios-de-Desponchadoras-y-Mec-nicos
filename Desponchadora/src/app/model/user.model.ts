export interface User {
    id: string,
    Nombre: string,
    Apellido: string,
    correoElectronico: string,
    contraseña: string,
    FechaNacimiento: Date,
    TipoUsuario: 'Empresa' | 'Cliente'
}
