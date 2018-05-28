import { Component, Inject, BadRequestException } from '@nestjs/common';



@Component()
export class GestationService{
    constructor(
        @Inject('DbConnection') private connection
    ){}

public CreateGestation(
    fecha : Date,
	idPersona : number
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'INSERT INTO gestacion(fecha_inicio, fkPersona) VALUES (?,?)', [fecha, idPersona],(err, results) => {
                return !err
                    ? resolve({ 'message': 'Semanas de gestacion registradas' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public UpdateGestation(
    fecha : Date,
	idPersona : number
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'UPDATE gestacion SET fecha_inicio = ?, fkPersona = ? WHERE fkPersona = ? AND estado = 1', [fecha, idPersona, idPersona],(err, results) => {
                return !err
                    ? resolve({ 'message': 'Semanas de gestacion actualizadas' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public getGestation( id : number ){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM gestacion WHERE idGestacion = ? AND estado = 1', id, (err, result) => {
                return !err
                    ? resolve({ result })
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public getAllGestations(idPersona : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM gestacion WHERE fkPersona = ? AND estado = 1',idPersona,(err, result) => {
                return !err
                    ? resolve(result)
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public DeleteGestation(idGestacion : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'UPDATE  gestacion SET estado = 0 WHERE idGestacion = ? AND estado = 1', idGestacion,(err, result) => {
                return !err
                    ? resolve({ 'message': 'Semanas de gestacion eliminadas' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}



}