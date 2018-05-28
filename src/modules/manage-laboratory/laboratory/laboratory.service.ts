import { Component, Inject, BadRequestException } from '@nestjs/common';


@Component()
export class LaboratoryService{
    constructor(
        @Inject('DbConnection') private connection
    ){}


public CreateLaboratory(
    nombre : String,
    fecha : Date,
    nivel : number
    ){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'CALL ProInsertarLaboratorio(?,?,?)',[nombre, fecha, nivel],(err, results) => {
                return !err
                    ? resolve({ 'message': 'Laboratorio registrado' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public UpdateLaboratory(
    idLaboratorio : number,
    nombre : String,
    fecha : Date,
    nivel : number
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'UPDATE laboratorio SET nombre = ?, ' 
           +'fecha = ?, '
           +'fkNivel_laboratorio = ? '
           +' WHERE idLaboratorio = ? AND estado = 1',[nombre, fecha, nivel, idLaboratorio],(err, results) => {
                return !err
                    ? resolve({ 'message': 'Laboratorio actualizado.' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public getLaboratory(idLaboratorio : number){
    return new Promise( (resolve, reject) => {
        this.connection.query('SELECT * FROM laboratorio WHERE idLaboratorio = ? AND estado = 1', idLaboratorio,(err, result) => {
                return !err
                    ? resolve(result)
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public getAllLaboratories(){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM laboratorio WHERE estado = 1',  (err, result) => {
                return !err
                    ? resolve({ result })
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public DeleteLaboratory(id : number){
    console.log(id)
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'UPDATE laboratorio SET estado = 0 WHERE idLaboratorio = ?',id,(err, results) => {
                return !err
                    ? resolve({'message' : 'Laboratorio eliminado.'})
                    : reject(new BadRequestException(err.message))
            }
        )
    })
}

}