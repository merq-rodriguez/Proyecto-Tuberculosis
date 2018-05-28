import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post, Put } from '@nestjs/common';
import { QuestionService } from './question.service';
import { log } from 'util';



@Controller('/questions')
export class QuestionController{
    constructor(private questionservice : QuestionService){}

@Post('/create')
public async createQuestion(
    @Response() res,
    @Request() req ,
    @Body('nombre') nombre,
    @Body('idTipo_pregunta') idTipo_pregunta,
    @Body('idCuestionario') idCuestionario    
){  
    const response = await this.questionservice.CreateQuestion(nombre, idTipo_pregunta,  idCuestionario)
    res.status(HttpStatus.OK).json(response)
}



@Put('/update')
public async UpdateQuestion(
    @Response() res,
    @Request() req ,
    @Body('idPregunta') idPregunta,
    @Body('nombre') nombre,
    @Body('idTipo_pregunta') idTipo_pregunta,
    @Body('idCuestionario') idCuestionario
){  
    console.log('====================================');
    console.log(idPregunta, nombre, idTipo_pregunta, idCuestionario);
    console.log('====================================');
    const response = await this.questionservice.UpdateQuestion(idPregunta, nombre, idTipo_pregunta, idCuestionario)
    res.status(HttpStatus.OK).json(response)
}

@Get('/All')
public async getAllQuestions(
    @Request() req,
    @Response() res, 
){
    const questions = await this.questionservice.getAllQuestions()
    res.status(HttpStatus.OK).json(questions)
}

@Get('/getOne/:idPregunta')
public async getQuestion(
    @Request() req,
    @Response() res,
    @Param('idPregunta') idPregunta
){
    const question = await this.questionservice.getQuestion(idPregunta)
    res.status(HttpStatus.OK).json(question)
}


@Put('/delete')
public async DeleteQuestion(
    @Request() req,
    @Response() res,
    @Body('idPregunta') idPregunta,
    @Body('idCuestionario') idCuestionario
    
){
    console.log(idPregunta)
    console.log(idCuestionario)
    const response = await this.questionservice.DeleteQuestion(idPregunta, idCuestionario)
    res.status(HttpStatus.OK).json(response)
}





}