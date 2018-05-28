import { Component, Inject, BadRequestException } from '@nestjs/common';



@Component()
export class AnswerService{
    constructor(
        @Inject('DbConnection') private connection
    ){}


public AssignAnswerQuestion(
    idPregunta : number, 
    idCuestionario : number, 
    respuesta : String
){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'UPDATE pregunta_cuestionario SET respuesta = ? WHERE fkPregunta = ? AND fkCuestionario = ? AND estado = 1',[respuesta, idPregunta, idCuestionario], (err, result) => {
                return !err
                    ? resolve({ 'message': 'Respuesta registrada a pregunta' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}




public getAnswer(idPregunta : number, idCuestionario : number ){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM pregunta_cuestionario WHERE fkPregunta = ? AND fkCuestionario = ? AND estado = 1', 
            [idPregunta, 
            idCuestionario], 
            (err, result) => {
                return !err
                    ? resolve( result )
                    :  reject(new BadRequestException(err.message))
        })
    })
}



public DeleteAnswerQuestion(idQuestion : number, idCuestionario : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            "UPDATE pregunta_cuestionario SET respuesta = null WHERE fkPregunta = ? AND fkCuestionario = ? AND estado = 1" ,[idQuestion, idCuestionario],(err, results) => {
                return !err
                    ? resolve({'message' : 'Respuesta eliminada.'})
                    : reject(new BadRequestException(err.message))
            }
        )
    })
}

}