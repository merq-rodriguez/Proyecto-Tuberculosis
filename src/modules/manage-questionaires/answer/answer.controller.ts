import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post, Put } from '@nestjs/common';
import { AnswerService } from './answer.service';



@Controller('/answers')
export class AnswerController{
    constructor(private answerservice : AnswerService){}



@Post('/assing-answer')
public async AssignAnswerQuestion(
    @Response() res,
    @Request() req ,
    @Body('idPregunta') idPregunta,
    @Body('idCuestionario') idCuestionario,
    @Body('respuesta') respuesta
){  
    const response = await this.answerservice.AssignAnswerQuestion(idPregunta, idCuestionario, respuesta)
    res.status(HttpStatus.OK).json(response)
}


@Get('/getOne/:idPregunta/:idCuestionario')
public async getAnswer(
    @Request() req,
    @Response() res,
    @Param('idPregunta') idPregunta,
    @Param('idCuestionario') idCuestionario
){
    console.log(idPregunta, idCuestionario)
    const answer = await this.answerservice.getAnswer(idPregunta, idCuestionario)
    res.status(HttpStatus.OK).json(answer)
}


@Put('/delete')
public async DeleteAnswerQuestion(
    @Request() req,
    @Response() res,
    @Body('idPregunta') idPregunta,
    @Body('idCuestionario') idCuestionario
    
){
    console.log(idPregunta)
    console.log(idCuestionario)
    const response = await this.answerservice.DeleteAnswerQuestion(idPregunta, idCuestionario)
    res.status(HttpStatus.OK).json(response)
}





}