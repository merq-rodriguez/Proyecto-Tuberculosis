import { Component, Inject, BadRequestException } from '@nestjs/common';

@Component()
export class SymptomService{
    constructor(
        @Inject('DbConnection') private connection
    ){}

   
public CreateSymptom(
    nombre : String, 
    fechainicio : Date,
    tiposintomas : String,
    idPaciente : number
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'INSERT INTO sintoma (nombre, fechainicio, tiposintomas, fkPaciente)  VALUES(?,?,?,?)', 
            [nombre,
            fechainicio,
            tiposintomas, 
            idPaciente], 
            (err, results) => {
            return !err
                ? resolve({ 'message': 'Sintoma registrado' })
                :  reject(new BadRequestException(err.message))
        })
    })
}

public UpdateSymptom(
    idSintoma : number,
    nombre : String, 
    fechainicio : Date,
    tiposintomas : String,
    idPaciente : number
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'UPDATE sintoma '+ 
            'SET nombre = ?, '+
            'fechainicio = ?, '+
            'tiposintomas = ?, '+
            'fkPaciente = ? '+
            'WHERE idSintoma = ?', [nombre, fechainicio, tiposintomas, idPaciente, idSintoma], (err, results) => {
            return !err
                ? resolve({ 'message': 'Sintoma actualizado' })
                :  reject(new BadRequestException(err.message))
        })
    })
}

public getAllSymptom(idPaciente : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM sintoma WHERE fkPaciente = ? AND estado = 1', idPaciente, (err, results) => {
                return !err
                    ? resolve(results)
                    : reject(new BadRequestException(err.message))
            }
        )
    })
}

    public getSymptom(id  : number){
        return new Promise( (resolve, reject) => {
            this.connection.query(
                'SELECT * FROM sintoma WHERE idSintoma = ? AND estado = 1',id, (err, results) => {
                    return !err
                        ? resolve(results)
                        : reject(new BadRequestException(err.message))
                }
            )
        })
    }

    public DeleteSymptom(id  : number){
        return new Promise( (resolve, reject) => {
            this.connection.query(
                'UPDATE sintoma SET estado = 0 WHERE idSintoma = ?',id, (err, results) => {
                    return !err
                        ? resolve({ 'message': 'Sintoma eliminado' })
                        : reject(new BadRequestException(err.message))
                }
            )
        })
    }

}