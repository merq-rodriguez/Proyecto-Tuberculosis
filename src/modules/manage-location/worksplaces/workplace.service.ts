import { Component, Inject, BadRequestException } from '@nestjs/common';



@Component()
export class WorkplaceService{
    constructor(
        @Inject('DbConnection') private connection
    ){}


public CreateWorkPlace(
    nombre : String,
    fecha : Date,
    idPersona : number,
    telefono : String,
    idUbicacion : number,
    prefijo : String,
    numero : String,
    sufijo : String,
    barrio : String
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'CALL ProRegistrarLugartrabajo(?,?,?,?,?,?,?,?,?)', 
            [nombre, 
            fecha,
            idPersona,
            telefono,
            idUbicacion,
            prefijo,
            numero,
            sufijo,
            barrio]
            ,(err, results) => {
                return !err
                    ? resolve({ 'message': 'Lugar de trabajo registrado.' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public UpdateWorkPlace(
    idDireccion : number,
    idLugarTrabajo : number,
    nombre : String,
    fecha : Date,
    idPersona : number,
    telefono : String,
    idUbicacion : number,
    prefijo : String,
    numero : String,
    sufijo : String,
    barrio : String
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'CALL ProActualizarLugartrabajo (?,?,?,?,?,?,?,?,?,?,?)', 
            [idDireccion,      
             idLugarTrabajo,
             nombre, 
             fecha,
             idPersona,
             telefono,
             idUbicacion,
             prefijo,
             numero,
             sufijo,
             barrio],(err, results) => {
                return !err
                    ? resolve({ 'message': 'Lugar de trabajo actualizado.' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public getWorkPlace( id : number ){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM lugartrabajo AS lutra '
            +'INNER JOIN direccion AS dir '
            +'ON dir.idDireccion = lutra.fkDireccion '
            +'WHERE lutra.idTrabajo = ? AND lutra.estado = 1 AND dir.estado = 1', id, (err, result) => {
                return !err
                    ? resolve({ result })
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public getWorksPlaces(idPersona : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM lugartrabajo AS lutra '
            +'INNER JOIN direccion AS dir '
            +'ON dir.idDireccion = lutra.fkDireccion '
            +'WHERE lutra.fkPersona = ? AND lutra.estado = 1 AND dir.estado = 1', idPersona,(err, result) => {
                return !err
                    ? resolve(result)
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public DeleteWorkPlace(id : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
              "UPDATE lugartrabajo AS lu "
            + "JOIN direccion AS dir "
            + "ON lu.fkDireccion = dir.idDireccion "
            + "SET dir.estado = 0, lu.estado = 0 "
            + "WHERE idTrabajo = ?",id,(err, results) => {
                return !err
                    ? resolve({'message' : 'Se elimino el lugar de trabajo correctamente.'})
                    : reject(new BadRequestException(err.message))
            }
        )
    })
}



}