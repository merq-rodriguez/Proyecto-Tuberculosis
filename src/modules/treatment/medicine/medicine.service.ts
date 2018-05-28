import { Component, Inject, BadRequestException } from '@nestjs/common';


@Component()
export class MedicineService{
    constructor(
        @Inject('DbConnection') private connection
    ){}


public CreateMedicine(
    nombre : String,
    descripcion : String
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'INSERT INTO medicamento(nombre, descripcion) VALUES(?,?)',[nombre, descripcion],(err, results) => {
                return !err
                    ? resolve({ 'message': 'Medicamento registrado' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public UpdateMedicine(
    idMedicamento : number,
    nombre : String,
    descripcion : String
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'UPDATE medicamento SET nombre = ?, descripcion = ? WHERE idMedicamento = ?',[nombre, descripcion, idMedicamento],(err, results) => {
                return !err
                    ? resolve({ 'message': 'Medicamento actualizado.' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public getMedicine(idMedicamento : number){
    return new Promise( (resolve, reject) => {
        this.connection.query('SELECT * FROM medicamento WHERE idMedicamento = ? AND estado = 1', idMedicamento,(err, result) => {
                return !err
                    ? resolve(result)
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public getAllMedicines(){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM medicamento WHERE  estado = 1',  (err, result) => {
                return !err
                    ? resolve({ result })
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public DeleteMedicine(id : number){
    console.log(id)
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'UPDATE medicamento SET estado = 0 WHERE idMedicamento = ?',id,(err, results) => {
                return !err
                    ? resolve({'message' : 'Medicamento eliminado.'})
                    : reject(new BadRequestException(err.message))
            }
        )
    })
}

}