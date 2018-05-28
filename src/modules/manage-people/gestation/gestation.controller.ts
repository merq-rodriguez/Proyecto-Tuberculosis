import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post, Put } from '@nestjs/common';
import { GestationService } from './gestation.service';


@Controller('/gestations')
export class GestationController{
    constructor(private gestationService :GestationService){}


    @Post('/create')
    public async CreateGestation(
        @Response() res,
        @Request() req,
        @Body('fecha') fecha,
        @Body('idPersona') idPersona   
    ){
        let Strfecha = Date.parse(fecha);
        let Dfecha = new Date(Strfecha);
        const response = await this.gestationService.CreateGestation(Dfecha, idPersona)
        res.status(HttpStatus.OK).json(response)
    }

    @Put('/update')
    public async UpdateGestation(
        @Response() res,
        @Request() req,
        @Body('fecha') fecha,
        @Body('idPersona') idPersona
    ){
        let Strfecha = Date.parse(fecha);
        let Dfecha = new Date(Strfecha);
        const response = await this.gestationService.UpdateGestation(Dfecha, idPersona)
        res.status(HttpStatus.OK).json(response)
    }

    @Get('/All/:idPersona')
    public async getAllGestations(
        @Request() req,
        @Response() res,
        @Param('idPersona') idPersona
    ){
        const gestations = await this.gestationService.getAllGestations(idPersona)
        res.status(HttpStatus.OK).json(gestations);
    }
    
    @Get('/getone/:id')
    public async getGestation(
        @Request() req,
        @Response() res,
        @Param('id') id 
    ){
        const person = await this.gestationService.getGestation(id)
        res.status(HttpStatus.OK).json(person);
    }

    @Delete('/delete/:id')
    public async DeletePerson(
        @Request() req,
        @Response() res,
        @Param('id') id 
    ){
        const person = await this.gestationService.DeleteGestation(id)
        res.status(HttpStatus.OK).json(person);
    }

   



}