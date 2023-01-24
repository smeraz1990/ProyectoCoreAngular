export interface JwtResponseI
{
dataUser:
{
    id: number,
    user: string,
    password: string,
    accesToken:string,
    expiresIn:string
}
}