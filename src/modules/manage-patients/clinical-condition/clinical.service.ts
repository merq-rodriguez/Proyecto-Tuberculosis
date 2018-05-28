import { Component, Inject, BadRequestException } from '@nestjs/common';

@Component()
export class ClinicalConditionService{
    constructor(
        @Inject('DbConnection') private connection
    ){}

    
	
    public CreateClinicalCondition(
        idCondicionClinica : number,
        idIngresoPaciente : number
    ){
        return new Promise( (resolve, reject) => {
            this.connection.query(
                'INSERT INTO condicionclinica_paciente(fkCondicion_clinica, fkIngreso_paciente ) VALUES(?,?)', 
                [idCondicionClinica, idIngresoPaciente], (err, results) => {
                return !err
                    ? resolve({ 'message': 'Condicion clinica de ingreso registrada' })
                    :  reject(new BadRequestException(err.message))
            })
        })
    }



   

    public getAllClinicalCondition(){
        return new Promise( (resolve, reject) => {
            this.connection.query(
                'SELECT * FROM condicionclinica_paciente WHERE estado = 1',(err, results) => {
                    return !err
                        ? resolve(results)
                        : reject(new BadRequestException(err.message))
                }
            )
        })
    }

    public getAllIncomeClinicalCondition(idIngreso : number){
        console.log(idIngreso)
        return new Promise( (resolve, reject) => {
            this.connection.query(
                'SELECT * FROM condicionclinica_paciente WHERE estado = 1 AND fkIngreso_paciente = ?',idIngreso,(err, results) => {
                    return !err
                        ? resolve(results)
                        : reject(new BadRequestException(err.message))
                }
            )
        })
    }

    public getClinicalCondition(
        idCondicionClinica : number,
        idIngresoPaciente : number
    ){
        return new Promise( (resolve, reject) => {
            this.connection.query(
                'SELECT * FROM condicionclinica_paciente' 
                +'WHERE estado = 1 AND '
                +'fkCondicion_clinica = ? AND '
                +'fkIngreso_paciente = ?',
                [idCondicionClinica,
                 idIngresoPaciente],
                 (err, results) => {
                    return !err
                        ? resolve(results)
                        : reject(new BadRequestException(err.message))
                }
            )
        })
    }

    

    public DeleteClinicalCondition(
        idCondicionClinica : number,
        idIngresoPaciente : number
    ){
        return new Promise( (resolve, reject) => {
            this.connection.query(
                'UPDATE condicionclinica_paciente '
                +'SET estado = 0 '
                +'WHERE fkCondicion_clinica = ? AND '
                +'fkIngreso_paciente = ? AND '
                +'estado = 1'
                  , [idCondicionClinica, idIngresoPaciente],(err, results) => {
                    return !err
                        ? resolve({'message' : 'Se elimino la condicion clinica de ingreso.'})
                        : reject(new BadRequestException(err.message))
                }
            )
        })
    }
}