import { Component, Inject, BadRequestException } from '@nestjs/common';



@Component()
export class QuestionService{
    constructor(
        @Inject('DbConnection') private connection
    ){}

public CreateQuestion(
    nombre : String, 
    idTipo_pregunta : number, 
    idCuestionario : number
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'CALL ProRegistrarPreguntaCuestionario(?,?,?)',
            [nombre,
             idTipo_pregunta, 
             idCuestionario],
              (err, result) => {
                return !err
                    ? resolve({ 'message': 'Pregunta registrada' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public AssignAnswerQuestion(
    idPregunta : number, 
    idCuestionario : number, 
    respuesta : String
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'UPDATE pregunta_cuestionario SET respuesta = ? WHERE fkPregunta = ? AND fkCuestionario = ?',[respuesta, idPregunta, idCuestionario], (err, result) => {
                return !err
                    ? resolve({ 'message': 'Respuesta registrada a pregunta' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public UpdateQuestion(
    idPregunta : number,
    nombre : String, 
    idTipo_pregunta : number, 
    idCuestionario : number
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'CALL ProActualizarPreguntaCuestionario(?,?,?,?)',
            [idPregunta,
             nombre,
             idTipo_pregunta, 
             idCuestionario],
             (err, result) => {
          return !err
              ? resolve({ 'message': 'Pregunta actualizada' })
              :  reject(new BadRequestException(err.message))
        })
    })
}



public getQuestion(idPregunta : number ){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT pre.idPregunta, pre.nombre AS pregunta, '
            +'tipre.nombre AS tipo '
            +'FROM pregunta AS pre '
            +'JOIN tipo_pregunta AS tipre ' 
            +'ON pre.fkTipo_pregunta = tipre.idTipo_pregunta '
            +'WHERE pre.idPregunta = ? AND pre.estado = 1', idPregunta, (err, result) => {
                return !err
                    ? resolve( result )
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public getAllQuestions(){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT pre.idPregunta, pre.nombre AS pregunta, '
            +'tipre.nombre AS tipo '
            +'FROM pregunta AS pre '
            +'JOIN tipo_pregunta AS tipre ' 
            +'ON pre.fkTipo_pregunta = tipre.idTipo_pregunta '
            +'WHERE pre.estado = 1', (err, result) => {
                return !err
                    ? resolve(result)
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public DeleteQuestion(idQuestion : number, idCuestionario : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            "UPDATE pregunta AS pre "
           +"JOIN pregunta_cuestionario AS prec "
           +"ON prec.fkPregunta = pre.idPregunta "
           +"SET pre.estado = 0, prec.estado = 0 "
           +"WHERE prec.fkPregunta = ? AND prec.fkCuestionario = ?",[idQuestion, idCuestionario],(err, results) => {
                return !err
                    ? resolve({'message' : 'Pregunta eliminada.'})
                    : reject(new BadRequestException(err.message))
            }
        )
    })
}

public DeleteAnswerQuestion(idQuestion : number, idCuestionario : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            "UPDATE pregunta_cuestionario SET respuesta = null WHERE fkPregunta = ? AND fkCuestionario = ? " ,[idQuestion, idCuestionario],(err, results) => {
                return !err
                    ? resolve({'message' : 'Respuesta eliminada.'})
                    : reject(new BadRequestException(err.message))
            }
        )
    })
}

}