import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post, Put } from '@nestjs/common';
import { ClinicalConditionService } from './clinical.service';

@Controller('clinical-condition')
export class ClinicalConditionController{
    constructor(private clinicalconditionService : ClinicalConditionService){}

    @Post('/create')
    public async CreateClinicalCondition(
        @Response() res,
        @Request() req,
        @Body('idCondicionClinica') idCondicionClinica,
        @Body('idIngresoPaciente') idIngresoPaciente
    ){
        const response = await this.clinicalconditionService.CreateClinicalCondition(idCondicionClinica, idIngresoPaciente)
        res.status(HttpStatus.OK).json(response)
    }


    @Get('/All')
    public async getAllClinicalCondition(
        @Request() req,
        @Response() res,
    ){
        const response = await this.clinicalconditionService.getAllClinicalCondition()
        res.status(HttpStatus.OK).json(response)
    }

    @Get('/AllIncomeClinical/:idIngreso')
    public async getAllIncomeClinicalCondition(
        @Request() req,
        @Response() res,
        @Param('idIngreso') idIngreso
    ){
        const income = await this.clinicalconditionService.getAllIncomeClinicalCondition(idIngreso)
        res.status(HttpStatus.OK).json(income)
    }

    @Post('/delete')
    public async DeleteClinicalCondition(
        @Request() req,
        @Response() res,
        @Body('idCondicionClinica') idCondicionClinica,
        @Body('idIngresoPaciente') idIngresoPaciente 
    ){
        const paciente = await this.clinicalconditionService.DeleteClinicalCondition(idCondicionClinica, idIngresoPaciente)
        res.status(HttpStatus.OK).json(paciente)
    }


}