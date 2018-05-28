import { Component, Inject, BadRequestException } from '@nestjs/common';


@Component()
export class GeopositionService{
    constructor(
        @Inject('DbConnection') private connection
    ){}


public CreateGeoposition(
    latitud : String,
    longitud : String,
    idDireccion : number
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'INSERT INTO localizacion (latitud, longitud, fkDireccion) VALUES(?,?,?)', [latitud, longitud, idDireccion]
            ,(err, results) => {
                return !err
                    ? resolve({ 'message': 'La geoposicion ha sido registrada.' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public UpdateGeoposicion(
    idLocalizacion : number,
    latitud : String,
    longitud : String,
    idDireccion : number
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            "UPDATE localizacion " 
            +"SET latitud = ?, longitud = ?, fkDireccion = ? "
            +"WHERE idLocalizacion = ?",
             [latitud,
              longitud, 
              idDireccion, 
              idLocalizacion]
            ,(err, results) => {
                return !err
                    ? resolve({ 'message': 'La geoposicion ha sido actualizada.' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public getGeoposition(idLocalizacion : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM localizacion WHERE idLocalizacion = ? AND estado = 1', idLocalizacion,(err, result) => {
                return !err
                    ? resolve(result)
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public getAllGeopositions(){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM localizacion WHERE estado = 1',(err, result) => {
                return !err
                    ? resolve(result)
                    :  reject(new BadRequestException(err.message))
        })
    })
}



public DeleteGeoPosition(id : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'UPDATE localizacion SET estado = 0 WHERE idLocalizacion = ?',id,(err, results) => {
                return !err
                    ? resolve({'message' : 'Se elimino la geoposicion correctamente.'})
                    : reject(new BadRequestException(err.message))
            }
        )
    })
}

}