import { Component, Inject, BadRequestException } from '@nestjs/common';

@Component()
export class PatientService{
    constructor(
        @Inject('DbConnection') private connection
    ){}

    
	
    public CreatePatient(
        estatura : number,
        peso : number,
        talla : number,
        idPersona : number,
        idCondicionIngreso : number
    ){
        return new Promise( (resolve, reject) => {
            this.connection.query(
                'CALL ProSavePaciente(?,?,?,?,?,?)', 
                ['REGISTRAR',
                 estatura,
                 peso,
                 talla, 
                 idPersona,
                 idCondicionIngreso], (err, results) => {
                return !err
                    ? resolve({ 'message': 'Paciente registrado' })
                    :  reject(new BadRequestException(err.message))
            })
        })
    }

    public UpdatePatient(
        estatura : number,
        peso : number,
        talla : number,
        idPersona : number,
        idCondicionIngreso : number
    ){
        return new Promise( (resolve, reject) => {
            this.connection.query(
                'CALL ProSavePaciente(?,?,?,?,?,?)', 
                ['ACTUALIZAR',
                 estatura,
                 peso,
                 talla, 
                 idPersona,
                 idCondicionIngreso], (err, results) => {
                return !err
                    ? resolve({ 'message': 'Paciente Actualizado.' })
                    :  reject(new BadRequestException(err.message))
            })
        })
    }


   

    public getAllPatients(){
        return new Promise( (resolve, reject) => {
            this.connection.query(
                'SELECT pa.idPaciente, pa.imc, pa.estatura, '
                +'pa.peso, pa.talla, pa.fkPersona AS idPersona, '
                +'con.nombre AS condicion_ingreso, '
                +'con.descripcion AS decripcion '
                +' FROM paciente AS pa '
                +'INNER JOIN condicion_ingreso AS con '
                +'ON con.idIngreso = pa.fkCondicion_ingreso '
                +'WHERE pa.estado = 1',(err, results) => {
                    return !err
                        ? resolve(results)
                        : reject(new BadRequestException(err.message))
                }
            )
        })
    }

    public getPatient(idPaciente  : number){
        return new Promise( (resolve, reject) => {
            this.connection.query(
                'SELECT pa.idPaciente, pa.imc, pa.estatura, '
                +'pa.peso, pa.talla, pa.fkPersona AS idPersona, '
                +'con.nombre AS condicion_ingreso, '
                +'con.descripcion AS decripcion '
                +' FROM paciente AS pa '
                +'INNER JOIN condicion_ingreso AS con '
                +'ON con.idIngreso = pa.fkCondicion_ingreso '
                +'WHERE pa.idPaciente = ? AND pa.estado = 1',idPaciente,(err, results) => {
                    return !err
                        ? resolve(results)
                        : reject(new BadRequestException(err.message))
                }
            )
        })
    }

    

    public DeletePaciente(id : number){
        return new Promise( (resolve, reject) => {
            this.connection.query(
                'UPDATE paciente SET estado = 0 WHERE idPaciente = ? AND estado = 1', id,(err, results) => {
                    return !err
                        ? resolve({'message' : 'Se elimino el paciente correctamente.'})
                        : reject(new BadRequestException(err.message))
                }
            )
        })
    }
}