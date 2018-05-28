import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post, Put } from '@nestjs/common';
import { QuestionaryService } from './questionary.service';
import { log } from 'util';



@Controller('questionnaires')
export class QuestionaryController{
    constructor(private questionaryService : QuestionaryService){}

@Post('/create')
public async createQuestionary(
    @Response() res,
    @Request() req ,
    @Body('nombre') nombre
){  
    const response = await this.questionaryService.CreateQuestionary(nombre)
    res.status(HttpStatus.OK).json(response)
}


@Post('/assign-question')
public async AssignQuestionToQuestionary(
    @Response() res,
    @Request() req ,
    @Body('idPregunta') idPregunta,
    @Body('idCuestionario') idCuestionario
){  
    const response = await this.questionaryService.AssignQuestionToQuestionary(idPregunta, idCuestionario)
    res.status(HttpStatus.OK).json(response)
}

@Post('/assign-person')
public async AssignPersonQuestionary(
    @Response() res,
    @Request() req ,
    @Body('idPersona') idPersona,
    @Body('idCuestionario') idCuestionario
){  console.log('====================================');
console.log(idPersona, idCuestionario);
console.log('====================================');
    const response = await this.questionaryService.AssignPersonQuestionary(idPersona, idCuestionario)
    res.status(HttpStatus.OK).json(response)
}

@Put('/update')
public async UpdateQuestionary(
    @Response() res,
    @Request() req ,
    @Body('idCuestionario') idCuestionario,
    @Body('nombre') nombre
){  
    
    const response = await this.questionaryService.UpdateQuestionary(idCuestionario, nombre)
    res.status(HttpStatus.OK).json(response)
}


@Get('/All')
public async getAllCuestionnaires(
    @Request() req,
    @Response() res, 
){
    const questionaires = await this.questionaryService.getAllQuestionnaires()
    res.status(HttpStatus.OK).json(questionaires)
}

@Get('/questions-questionnaire/:idQuestionary')
public async getAllQuestionCuestionnaire(
    @Request() req,
    @Response() res, 
    @Param('idQuestionary') idQuestionary
){
    const questions = await this.questionaryService.getAllQuestionsQuestionary(idQuestionary)
    res.status(HttpStatus.OK).json(questions)
}


@Get('/getOne/:id')
public async getQuestionary(
    @Request() req,
    @Response() res, 
    @Param('id') id
){
    const questionary = await this.questionaryService.getQuestionary(id)
    res.status(HttpStatus.OK).json(questionary)
}


@Delete('/delete/:idQuestionario')
public async DeleteQuestionary(
    @Request() req,
    @Response() res,
    @Param('idQuestionario') idQuestionario
){
    const response = await this.questionaryService.DeleteQuestionary(idQuestionario)
    res.status(HttpStatus.OK).json(response)
}



}