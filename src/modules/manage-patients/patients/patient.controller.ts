import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post, Put } from '@nestjs/common';
import { PatientService } from './patient.service';

@Controller('/Patients')
export class PatientController{
    constructor(private pacienteService : PatientService){}

    @Post('/create')
    public async CreatePatient(
        @Response() res,
        @Request() req,
        @Body('estatura') estatura,
        @Body('peso') peso,
        @Body('talla') talla,
        @Body('idPersona') idPersona,
        @Body('idCondicionIngreso') idCondicionIngreso
    ){
        const response = await this.pacienteService.CreatePatient(estatura, peso, talla, idPersona, idCondicionIngreso)
        res.status(HttpStatus.OK).json(response)
    }


    @Put('/update')
    public async UpdatePatient(
        @Response() res,
        @Request() req,
        @Body('estatura') estatura,
        @Body('peso') peso,
        @Body('talla') talla,
        @Body('idPersona') idPersona,
        @Body('idCondicionIngreso') idCondicionIngreso
    ){
        const response = await this.pacienteService.UpdatePatient( estatura, peso, talla, idPersona, idCondicionIngreso)
        res.status(HttpStatus.OK).json(response)
    }

    @Get('/All')
    public async getAllPatients(
        @Request() req,
        @Response() res,
    ){
        const pacientes = await this.pacienteService.getAllPatients()
        res.status(HttpStatus.OK).json(pacientes)
    }

    @Get('/:idPaciente')
    public async getPatient(
        @Request() req,
        @Response() res,
        @Param('idPaciente') idPaciente
    ){
        console.log(idPaciente)
        const paciente = await this.pacienteService.getPatient(idPaciente)
        res.status(HttpStatus.OK).json(paciente)
    }

    @Delete('/delete/:idPaciente')
    public async DeletePatient(
        @Request() req,
        @Response() res,
        @Param('idPaciente') idPaciente
    ){
        console.log(idPaciente)
        const paciente = await this.pacienteService.DeletePaciente(idPaciente)
        res.status(HttpStatus.OK).json(paciente)
    }


}