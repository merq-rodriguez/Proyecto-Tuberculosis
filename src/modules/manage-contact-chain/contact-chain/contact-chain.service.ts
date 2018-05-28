import { Component, Inject, BadRequestException } from '@nestjs/common';


@Component()
export class ContactChainService{
    constructor(
        @Inject('DbConnection') private connection
    ){}

  
public CreateContactChain(
    idPaciente : number,
    estado_salud : String,
    duracion_contacto : String, 
    fecha_contacto : Date,
    contexto : String,
    idPersona : number,
    idLugarContacto : number,
    idDirecion_contacto : number,
    idTipo_relacion : number,
    idNivel_exposicion : number
    ){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'CALL ProInsertarcadenacontacto(?,?,?,?,?,?,?,?,?,?)',
            [idPaciente,
            estado_salud,
            duracion_contacto,
            fecha_contacto,
            contexto,
            idPersona,
            idLugarContacto,
            idDirecion_contacto,
            idTipo_relacion,
            idNivel_exposicion]
            ,(err, results) => {
                return !err
                    ? resolve({ 'message': 'Cadena de contacto registrada' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public UpdateContactChain(
    idContacto : number,
    estado_salud : String,
    duracion_contacto : String, 
    fecha_contacto : Date,
    contexto : String,
    idPersona : number,
    idLugarContacto : number,
    idDirecion_contacto : number,
    idTipo_relacion : number,
    idNivel_exposicion : number
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'CALL ProActualizarCadenaContacto(?,?,?,?,?,?,?,?,?,?)',
            [idContacto,
            estado_salud,
            duracion_contacto,
            fecha_contacto,
            contexto,
            idPersona,
            idLugarContacto,
            idDirecion_contacto,
            idTipo_relacion,
            idNivel_exposicion]
            ,(err, results) => {
                return !err
                    ? resolve({ 'message': 'Cadena de contacto actualizada.' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public getContactChain(idContacto : number){
    return new Promise( (resolve, reject) => {
        this.connection.query('SELECT * FROM cadenacontacto WHERE idContacto = ? AND estado = 1', idContacto,(err, result) => {
                return !err
                    ? resolve(result)
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public getAllContactChain(){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM cadenacontacto WHERE estado = 1',  (err, result) => {
                return !err
                    ? resolve({ result })
                    :  reject(new BadRequestException(err.message))
        })
    })
}




public getAllContactChainPatient(idPaciente : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM paciente_cadenacontacto AS paca '
           +'INNER JOIN cadenacontacto AS caco '
           +'ON caco.idContacto = paca.fkCadenacontacto '
           +'WHERE paca.estado = 1 AND paca.fkPaciente = ?', idPaciente, (err, result) => {
                return !err
                    ? resolve({ result })
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public DeleteContactChain(id : number){
    console.log(id)
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'UPDATE cadenacontacto SET estado = 0 WHERE idContacto = ?',id,(err, results) => {
                return !err
                    ? resolve({'message' : 'Cadena de contacto eliminada.'})
                    : reject(new BadRequestException(err.message))
            }
        )
    })
}


public DeleteContactChainPacient(
    idPaciente : number,
    idContacto : number
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'UPDATE cadenacontacto AS caco '
           +'INNER JOIN paciente_cadenacontacto AS paca '
           +'ON caco.idContacto = paca.fkCadenacontacto '
           +'SET caco.estado = 0, paca.estado = 0 '
           +'WHERE paca.fkCadenacontacto = ? AND paca.fkPaciente = ?',
           [idContacto, idPaciente],(err, results) => {
                return !err
                    ? resolve({'message' : 'Cadena de contacto eliminada.'})
                    : reject(new BadRequestException(err.message))
            }
        )
    })
}

}