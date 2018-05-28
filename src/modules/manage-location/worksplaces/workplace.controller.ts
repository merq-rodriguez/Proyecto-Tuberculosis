import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post, Put } from '@nestjs/common';
import { WorkplaceService } from './workplace.service';





@Controller('works-places')
export class WorkplaceController{
    constructor(private workplaceService : WorkplaceService){}

    @Get('/All/:idPersona')
    public async getWorksPlaces(
        @Request() req,
        @Response() res,
        @Param('idPersona') idPersona
    ){
        const worksplaces = await this.workplaceService.getWorksPlaces(idPersona)
        res.status(HttpStatus.OK).json(worksplaces)
    }

    @Get('/getone/:idTrabajo')
    public async getWorkPlace(
        @Request() req,
        @Response() res,
        @Param('idTrabajo') idTrabajo
    ){
        const worksplace = await this.workplaceService.getWorkPlace(idTrabajo)
        res.status(HttpStatus.OK).json(worksplace)
    }

    

    @Post('/create')
    public async CreateWorkPlace(
        @Request() req,
        @Response() res,
        @Body('nombre') nombre,
        @Body('fecha') fecha,
        @Body('idPersona') idPersona,
        @Body('telefono') telefono,
        @Body('idUbicacion') idUbicacion,
        @Body('prefijo') prefijo, 
        @Body('numero') numero,
        @Body('sufijo') sufijo, 
        @Body('barrio') barrio, 
        
    ){
        const response = await this.workplaceService.CreateWorkPlace(nombre, fecha, idPersona, telefono, idUbicacion, prefijo, numero, sufijo, barrio)
        res.status(HttpStatus.OK).json(response)
    }

    

    @Put('/update')
    public async UpdateWorkPlace(
        @Request() req,
        @Response() res,
        @Body('idDireccion') idDireccion,
        @Body('idTrabajo') idTrabajo,
        @Body('nombre') nombre,
        @Body('fecha') fecha,
        @Body('idPersona') idPersona,
        @Body('telefono') telefono,
        @Body('idUbicacion') idUbicacion,
        @Body('prefijo') prefijo, 
        @Body('numero') numero,
        @Body('sufijo') sufijo, 
        @Body('barrio') barrio, 
        
    ){
        const worksplaces = await this.workplaceService.UpdateWorkPlace(idDireccion, idTrabajo, nombre, fecha, idPersona, telefono, idUbicacion, prefijo, numero, sufijo, barrio)
        res.status(HttpStatus.OK).json(worksplaces)
    }

    @Delete('/delete/:idTrabajo')
    public async DeleteWorkPlace(
        @Request() req,
        @Response() res,
        @Param('idTrabajo') idTrabajo
    ){
        const worksplace = await this.workplaceService.DeleteWorkPlace(idTrabajo)
        res.status(HttpStatus.OK).json(worksplace)
    }
}