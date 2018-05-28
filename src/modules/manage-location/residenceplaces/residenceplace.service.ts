import { Component, Inject, BadRequestException } from '@nestjs/common';


@Component()
export class ResidenceplaceService{
    constructor(
        @Inject('DbConnection') private connection
    ){}


public CreateResidencePlace(
    fecha : Date,
    idUbicacion : number,
    idPersona : number,
    prefijo : String,
    numero : String,
    sufijo : String,
    barrio : String
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'CALL ProRegistrarResidencia(?,?,?,?,?,?,?)', 
            [fecha,
            idUbicacion,
            idPersona,
            prefijo,
            numero,
            sufijo,
            barrio]
            ,(err, results) => {
                return !err
                    ? resolve({ 'message': 'Lugar de residencia registrado' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public UpdateResidencePlace(
    idDireccion : number,
    idResidencia : number,
    duracion : number,
    fecha : Date,
    idUbicacion : number,
    idPersona : number,
    prefijo : String,
    numero : String,
    sufijo : String,
    barrio : String
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'CALL ProActualizarResidencia (?,?,?,?,?,?,?,?,?)', 
            [idDireccion,
             idResidencia,
             fecha,
             idUbicacion,
             idPersona,
             prefijo,
             numero,
             sufijo,
             barrio
            ],(err, results) => {
                return !err
                    ? resolve({ 'message': 'Lugar de residencia actualizado.' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public getResidencePlaces(idPersona : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM lugar_residencia AS lure '
            +'INNER JOIN direccion AS dir ' 
            +'ON dir.idDireccion = lure.fkDireccion '
            +'WHERE lure.fkPersona = ? AND lure.estado = 1 ' 
            +'AND dir.estado = 1', idPersona,(err, result) => {
                return !err
                    ? resolve(result)
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public getResidencePlace( id : number ){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM lugar_residencia AS lure '
            +'INNER JOIN direccion AS dir ' 
            +'ON dir.idDireccion = lure.fkDireccion '
            +'WHERE lure.idResidencia = ? AND lure.estado = 1 ' 
            +'AND dir.estado = 1'
            ,id, (err, result) => {
                return !err
                    ? resolve({ result })
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public DeleteResidencePlace(id : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
             "UPDATE lugar_residencia AS lu " 
            +"JOIN direccion AS dir " 
            +"ON lu.fkDireccion = dir.idDireccion "
            +"SET dir.estado = 0, lu.estado = 0 "
            +"WHERE idResidencia = ?",id,(err, results) => {
                return !err
                    ? resolve({'message' : 'Residencia eliminada'})
                    : reject(new BadRequestException(err.message))
            }
        )
    }) 
}

}