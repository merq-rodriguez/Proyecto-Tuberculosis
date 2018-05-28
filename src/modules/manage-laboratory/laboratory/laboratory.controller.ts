import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post, Put } from '@nestjs/common';
import { LaboratoryService } from './laboratory.service';


@Controller('laboratory')
export class LaboratoryController{
    constructor(private laboratoryService : LaboratoryService){}


    @Post('/create')
    public async CreateLaboratory(
        @Request() req,
        @Response() res,
        @Body('nombre') nombre,
        @Body('fecha') fecha,
        @Body('idNivel') idNivel
    ){
        const response = await this.laboratoryService.CreateLaboratory(nombre, fecha, idNivel)
        res.status(HttpStatus.OK).json(response)
    }

    @Put('/update')
    public async UpdateLaboratory(
        @Request() req,
        @Response() res,
        @Body('idLaboratorio') idLaboratorio,
        @Body('nombre') nombre,
        @Body('fecha') fecha,
        @Body('idNivel') idNivel
    ){
        const response= await this.laboratoryService.UpdateLaboratory(idLaboratorio, nombre, fecha, idNivel)
        res.status(HttpStatus.OK).json(response)
    }

    @Get('/getOne/:idLaboratorio')
    public async getLaboratory(
        @Request() req,
        @Response() res,
        @Param('idLaboratorio') idLaboratorio
    ){
        const laboratory = await this.laboratoryService.getLaboratory(idLaboratorio)
        res.status(HttpStatus.OK).json(laboratory)
    }

    @Get('/All')
    public async getAllLaboratory(
        @Request() req,
        @Response() res,
    ){
        const response = await this.laboratoryService.getAllLaboratories()
        res.status(HttpStatus.OK).json(response)
    }

    @Delete('/delete/:idLaboratorio')
    public async DeleteLaboratory(
        @Request() req,
        @Response() res,
        @Param('idLaboratorio') idLaboratorio
    ){
        const response = await this.laboratoryService.DeleteLaboratory(idLaboratorio)
        res.status(HttpStatus.OK).json(response)
    }

}