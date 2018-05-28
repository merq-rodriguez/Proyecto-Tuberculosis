import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post, Put } from '@nestjs/common';
import { SymptomService } from './symptom.service';

@Controller('symptom')
export class SymptomController{
    constructor(private symptomService : SymptomService){}

    @Post('/create')
    public async createSymptom(
        @Response() res,
        @Request() req,
        @Body('nombre') nombre, 
        @Body('fechainicio') fechainicio,
        @Body('tiposintomas') tiposintomas,
        @Body('idPaciente') idPaciente 
    ){
        let Strfecha = Date.parse(fechainicio);
        let Dfecha = new Date(Strfecha); 
        const response = await this.symptomService.CreateSymptom(nombre, Dfecha, tiposintomas, idPaciente)
        res.status(HttpStatus.OK).json(response)
    }

    @Put('/update')
    public async updateSymptom(
        @Response() res,
        @Request() req,
        @Body('idSintoma') idSintoma,
        @Body('nombre') nombre, 
        @Body('fechainicio') fechainicio,
        @Body('tiposintomas') tiposintomas,
        @Body('idPaciente') idPaciente 
    ){
        console.log(nombre)
        let Strfecha = Date.parse(fechainicio);
        let Dfecha = new Date(Strfecha);
        const response = await this.symptomService.UpdateSymptom(idSintoma, nombre, Dfecha, tiposintomas, idPaciente)
        res.status(HttpStatus.OK).json(response)
    }

    @Get('/All/:idPaciente')
    public async getAllSymptom(
        @Request() req,
        @Response() res,
        @Param('idPaciente') idPaciente
    ){
        const pacientes = await this.symptomService.getAllSymptom(idPaciente)
        res.status(HttpStatus.OK).json(pacientes)
    }

    @Get('/getone/:idSintoma')
    public async getSymptom(
        @Request() req,
        @Response() res,
        @Param('idSintoma') idSintoma
    ){
        const symptom = await this.symptomService.getSymptom(idSintoma)
        res.status(HttpStatus.OK).json(symptom)
    }

    @Delete('/delete/:idSintoma')
    public async DeleteSymptom(
        @Request() req,
        @Response() res,
        @Param('idSintoma') idSintoma
    ){
        const symptom = await this.symptomService.DeleteSymptom(idSintoma)
        res.status(HttpStatus.OK).json(symptom)
    }


}