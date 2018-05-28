import { Component, Inject, BadRequestException } from '@nestjs/common';

@Component()
export class IngressPatientService{
    constructor(
        @Inject('DbConnection') private connection
    ){}

   
public CreateIngressPatient(
    idCondicionIngreso : number,
    idPaciente :number,
    fecha_ingreso : Date,
    hora_ingreso : String
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
                'INSERT INTO ingreso_paciente('
               +'fkCondicion_ingreso, '
               +'fkPaciente, '
               +'fecha_ingreso, '
               +'hora_ingreso) '
               +'VALUES (?,?,?,?)', 
            [idCondicionIngreso,
             idPaciente,
             fecha_ingreso,
             hora_ingreso], 
            (err, results) => {
            return !err
                ? resolve({ 'message': 'Ingreso de paciente registrado' })
                :  reject(new BadRequestException(err.message))
        })
    })
}

public UpdateIngressPatient(
    idIngreso_paciente : number,
    idCondicionIngreso : number,
    idPaciente :number,
    fecha_ingreso : Date,
    hora_ingreso : String
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'UPDATE ingreso_paciente ' 
            +'SET fkCondicion_ingreso = ?, '
            +'fkPaciente = ?, '
            +'fecha_ingreso = ?, '
            +'hora_ingreso = ? ' 
            +'WHERE idIngreso_paciente = ?', 
            [idCondicionIngreso,
             idPaciente,
             fecha_ingreso,
             hora_ingreso,
            idIngreso_paciente], (err, results) => {
            return !err
                ? resolve({ 'message': 'Ingreso de paciente actualizado' })
                :  reject(new BadRequestException(err.message))
        })
    })
}

public getAllIngressPatient(idPaciente : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM ingreso_paciente WHERE fkPaciente = ? AND estado = 1', idPaciente, (err, results) => {
                return !err
                    ? resolve(results)
                    : reject(new BadRequestException(err.message))
            }
        )
    })
}

public getAllIncomePatients(){ //#Todos los ingresos
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM ingreso_paciente WHERE  estado = 1',  (err, results) => {
                return !err
                    ? resolve(results)
                    : reject(new BadRequestException(err.message))
            }
        )
    })
}

    public getIngressPatient(id  : number){
        return new Promise( (resolve, reject) => {
            this.connection.query(
                'SELECT * FROM ingreso_paciente WHERE idIngreso_paciente = ? AND estado = 1',id, (err, results) => {
                    return !err
                        ? resolve(results)
                        : reject(new BadRequestException(err.message))
                }
            )
        })
    }

    public DeleteIngressPatient(id  : number){
        return new Promise( (resolve, reject) => {
            this.connection.query(
                'UPDATE ingreso_paciente SET estado = 0 WHERE idIngreso_paciente = ?',id, (err, results) => {
                    return !err
                        ? resolve({ 'message': 'Ingreso de paciente eliminado' })
                        : reject(new BadRequestException(err.message))
                }
            )
        })
    }

}