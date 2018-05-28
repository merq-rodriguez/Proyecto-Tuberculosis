import { Component, Inject, BadRequestException } from '@nestjs/common';



@Component()
export class QuestionaryService{
    constructor(
        @Inject('DbConnection') private connection
    ){}

public CreateQuestionary(nombre : String){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'INSERT INTO cuestionario(nombre) VALUES(?)', nombre,(err, result) => {
                return !err
                    ? resolve({ 'message': 'Questionario registrado' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public AssignQuestionToQuestionary(idPregunta : number, idCuestionario : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES(?,?)',[idPregunta, idCuestionario] ,(err, result) => {
                return !err
                    ? resolve({ 'message': 'Pregunta asignada a cuestionario.' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public AssignPersonQuestionary(idPersona : number, idCuestionario : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'INSERT INTO cuestionario_persona(fkPersona, fkCuestionario) VALUES(?,?)',[idPersona, idCuestionario] ,(err, result) => {
                return !err
                    ? resolve({ 'message': 'Cuestionario asignado a persona.' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public UpdateQuestionary(idCuestionario : number, nombre : String){
    return new Promise( (resolve, reject) => {
        this.connection.query(
        'UPDATE cuestionario SET nombre = ? WHERE idCuestionario = ? AND estado = 1',[nombre, idCuestionario], (err, result) => {
          return !err
              ? resolve({ 'message': 'Questionario actualizado' })
              :  reject(new BadRequestException(err.message))
        })
    })
}


public getQuestionary(idQuestionary : number ){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM cuestionario WHERE idCuestionario = ? AND estado = 1', idQuestionary, (err, result) => {
                return !err
                    ? resolve( result )
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public getAnswerQuestionaryPerson(idQuestionary : number ){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            '', idQuestionary, (err, result) => {
                return !err
                    ? resolve( result )
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public getAllQuestionnaires(){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM cuestionario WHERE estado = 1', (err, result) => {
                return !err
                    ? resolve(result)
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public getAllQuestionsQuestionary(idQuestionary : number){
    return new Promise( (resolve, reject) => {
        
        this.connection.query(
            'SELECT * FROM pregunta AS pre '+
            'JOIN pregunta_cuestionario AS precu '+ 
            'ON pre.idPregunta = precu.fkPregunta '+
            'WHERE precu.fkCuestionario = ? ', idQuestionary,(err, result) => {
                return !err
                    ? resolve(result)
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public DeleteQuestionary(idQuestionary : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'UPDATE cuestionario SET estado = 0 WHERE idCuestionario = ?',idQuestionary,(err, results) => {
                return !err
                    ? resolve({'message' : 'Cuestionario eliminado.'})
                    : reject(new BadRequestException(err.message))
            }
        )
    })
}

}