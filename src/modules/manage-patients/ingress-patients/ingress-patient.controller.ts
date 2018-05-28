import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post, Put } from '@nestjs/common';
import { IngressPatientService } from './ingress-patient.service';

@Controller('ingress-patient')
export class IngressPatientController{
    constructor(private ingressPacientService : IngressPatientService){}

    @Post('/create')
    public async createIngressPatient(
        @Response() res,
        @Request() req,
        @Body('idCondicionIngreso') idCondicionIngreso,
        @Body('idPaciente') idPaciente,
        @Body('fecha_ingreso') fecha_ingreso,
        @Body('hora_ingreso') hora_ingreso
    ){  
        let Strfecha = Date.parse(fecha_ingreso);
        let Dfecha = new Date(Strfecha);
        const response = await this.ingressPacientService.CreateIngressPatient(idCondicionIngreso, idPaciente, Dfecha, hora_ingreso )
        res.status(HttpStatus.OK).json(response)
    }

    @Put('/update')
    public async updateIngressPatient(
        @Response() res,
        @Request() req,
        @Body('idIngreso_paciente') idIngreso_paciente,
        @Body('idCondicionIngreso') idCondicionIngreso,
        @Body('idPaciente') idPaciente,
        @Body('fecha_ingreso') fecha_ingreso,
        @Body('hora_ingreso') hora_ingreso
    ){
        let Strfecha = Date.parse(fecha_ingreso);
        let Dfecha = new Date(Strfecha);
        const response = await this.ingressPacientService.UpdateIngressPatient(idIngreso_paciente, idCondicionIngreso, idPaciente, Dfecha, hora_ingreso)
        res.status(HttpStatus.OK).json(response)
    }

    @Get('/All/:idPaciente')
    public async getAllIngressPatient(
        @Request() req,
        @Response() res,
        @Param('idPaciente') idPaciente
    ){
        const pacientes = await this.ingressPacientService.getAllIngressPatient(idPaciente)
        res.status(HttpStatus.OK).json(pacientes)
    }

    @Get('/All-IncomePatients')
    public async getAllIncomePatients(
        @Request() req,
        @Response() res,
    ){
        const pacientes = await this.ingressPacientService.getAllIncomePatients()
        res.status(HttpStatus.OK).json(pacientes)
    }

    @Get('/getone/:idIngreso')
    public async getIngressPatient(
        @Request() req,
        @Response() res,
        @Param('idIngreso') idIngreso
    ){
        const symptom = await this.ingressPacientService.getIngressPatient(idIngreso)
        res.status(HttpStatus.OK).json(symptom)
    }

    @Delete('/delete/:idIngreso')
    public async DeleteSymptom(
        @Request() req,
        @Response() res,
        @Param('idIngreso') idIngreso
    ){
        const ingress = await this.ingressPacientService.DeleteIngressPatient(idIngreso)
        res.status(HttpStatus.OK).json(ingress)
    }


}