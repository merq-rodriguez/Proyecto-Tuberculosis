import { Component, Inject, BadRequestException } from '@nestjs/common';



@Component()
export class PersonService{
    constructor(
        @Inject('DbConnection') private connection
    ){}

public CreatePerson(
    id : number,
    nombres : String,
    apellidos : String,
    ocupacion : String,
    telefono : String,
    fecha_nacimiento :Date,
    idIPS : number,
    idPertenencia_etnica : number,
    idRegimen : number,
    idPueblo_indigeno : number,
    idGrupo_poblacional : number,
    idLugar_nacimiento : number,
    idTipo_documento : number,
    idGenero : number 
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'CALL ProSavePersona(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
            ['REGISTRAR',
            id,
            nombres,
            apellidos,
            ocupacion,
            telefono,
            fecha_nacimiento,
            idIPS,
            idPertenencia_etnica,
            idRegimen,
            idPueblo_indigeno,
            idGrupo_poblacional,
            idLugar_nacimiento,
            idTipo_documento,
            idGenero]
            ,(err, results) => {
                return !err
                    ? resolve({ 'message': 'Persona registrada' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}



public getPerson( id : number ){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT per.doc_identificacion, per.nombres, per.apellidos, per.ocupacion, '
            +'per.telefono, per.fechanacimiento, reg.nombre AS regimen, '
            +'ips.nombre AS IPS, gpo.nombre AS grupo_poblacional, ' 
            +'puin.nombre AS pueblo_indigeno, ' 
            +'gre.nombre AS grupo_etnico, CONCAT(mu.nombre," - ",de.nombre)  AS lugar_nacimiento, '
            +'tidoc.nombre AS tipo_documento, ge.nombre AS genero '
            +'FROM persona AS per '
            +'INNER JOIN regimen_salud  AS reg '
            +'ON reg.idRegimen = per.fkregimen '
            +'INNER JOIN pueblo_indigeno AS puin ' 
            +'ON puin.idPueblo_indigeno = per.fkPueblo_indigeno '
            +'INNER JOIN ips ' 
            +'ON ips.idIps = per.fkIPS '
            +'INNER JOIN grupo_poblacional AS gpo '
            +'ON gpo.idPoblacional = per.fkGrupo_poblacional '
            +'INNER JOIN grupo_etnico AS gre '
            +'ON gre.idEtnico = per.fkPertenencia_etnica '
            +'INNER JOIN municipio AS mu '
            +'ON mu.idMunicipio = per.fkLugarnacimiento '
            +'INNER JOIN departamento AS de '
            +'ON de.idDepartamento = mu.fkDepartamento '
            +'INNER JOIN tipodocumento AS tidoc ' 
            +'ON tidoc.idTipodoc = per.fkTipodocumento '
            +'INNER JOIN genero AS ge '
            +'ON ge.idGenero = per.fkGenero '
            +'WHERE per.doc_identificacion = ? AND per.estado = 1', id, (err, result) => {
                return !err
                    ? resolve({ result })
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public getAllPeople(){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM persona WHERE estado = 1', (err, result) => {
                return !err
                    ? resolve({ result })
                    :  reject(new BadRequestException(err.message))
        })
    })
}




public UpdatePerson(
    id : number,
    nombres : String,
    apellidos : String,
    ocupacion : String,
    telefono : String,
    fecha_nacimiento :Date,
    idIPS : number,
    idPertenencia_etnica : number,
    idRegimen : number,
    idPueblo_indigeno : number,
    idGrupo_poblacional : number,
    idLugar_nacimiento : number,
    idTipo_documento : number,
    idGenero : number 
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'CALL ProSavePersona(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
            ['ACTUALIZAR',
            id,
            nombres,
            apellidos,
            ocupacion,
            telefono,
            fecha_nacimiento,
            idIPS,
            idPertenencia_etnica,
            idRegimen,
            idPueblo_indigeno,
            idGrupo_poblacional,
            idLugar_nacimiento,
            idTipo_documento,
            idGenero],
            (err, results) => {
                return !err
                    ? resolve({'message' : 'Se actualizo la persona correctamente.'})
                    : reject(new BadRequestException(err.message))
            }
        )
    })
}

public DeletePerson(id : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'UPDATE persona SET estado = 0 WHERE doc_identificacion = ?',id,(err, results) => {
                return !err
                    ? resolve({'message' : 'Se elimino la persona correctamente.'})
                    : reject(new BadRequestException(err.message))
            }
        )
    })
}

}