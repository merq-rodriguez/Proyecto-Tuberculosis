import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post, Put } from '@nestjs/common';
import { GeopositionService } from './geoposition.service';



@Controller('/geopositions')
export class GeopositionController{
    constructor(private geopositionService : GeopositionService){}
    
    @Get('/All')
    public async getAllGeopositions(
        @Request() req,
        @Response() res,
    ){
        const geopositions = await this.geopositionService.getAllGeopositions()
        res.status(HttpStatus.OK).json(geopositions)
    }

    @Post('/create')
    public async CreateGeoposition(
        @Request() req,
        @Response() res,
        @Body('latitud') latitud,
        @Body('longitud') longitud,
        @Body('idDireccion') idDireccion
    ){
        console.log(latitud, idDireccion)
        
        const geoposition = await this.geopositionService.CreateGeoposition(latitud, longitud, idDireccion)
        res.status(HttpStatus.OK).json(geoposition)
    }

    @Put('/update')
    public async UpdateGeoposition(
        @Request() req,
        @Response() res,
        @Body('idLocalizacion') idLocalizacion,
        @Body('latitud') latitud,
        @Body('longitud') longitud,
        @Body('idDireccion') idDireccion
    ){
        const geoposition = await this.geopositionService.UpdateGeoposicion(idLocalizacion, latitud, longitud, idDireccion )
        res.status(HttpStatus.OK).json(geoposition)
    }

    @Get('/:idLocalizacion')
    public async getGeoposition(
        @Request() req,
        @Response() res,
        @Param('idLocalizacion') idLocalizacion
    ){
        console.log(idLocalizacion)
        const worksplace = await this.geopositionService.getGeoposition(idLocalizacion)
        res.status(HttpStatus.OK).json(worksplace)
    }
    
   
 

  
 @Delete('/delete/:idLocalizacion')
    public async DeleteGeoposition(
        @Request() req,
        @Response() res,
        @Param('idLocalizacion') idLocalizacion
    ){
        const response = await this.geopositionService.DeleteGeoPosition(idLocalizacion)
        res.status(HttpStatus.OK).json(response)
    }
}