import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post, Put } from '@nestjs/common';
import { ResidenceplaceService } from './residenceplace.service';


@Controller('/residence-places')
export class ResidenceplaceController{
    constructor(private residenceService : ResidenceplaceService){}


    @Post('/create')
    public async CreateResidencePlace(
        @Request() req,
        @Response() res,
        @Body('fecha') fecha,
        @Body('idUbicacion') idUbicacion,
        @Body('idPersona') idPersona,
        @Body('prefijo') prefijo,
        @Body('numero') numero,
        @Body('sufijo') sufijo,
        @Body('barrio') barrio
    ){
        const residenceplace = await this.residenceService.CreateResidencePlace(fecha, idUbicacion, idPersona, prefijo, numero, sufijo, barrio)
        res.status(HttpStatus.OK).json(residenceplace)
    }

    @Put('/update')
    public async UpdateResidencePlace(
        @Request() req,
        @Response() res,
        @Body('idDireccion') idDireccion,
        @Body('idResidencia') idResidencia,
        @Body('duracion') duracion ,
        @Body('fecha') fecha,
        @Body('idUbicacion') idUbicacion,
        @Body('idPersona') idPersona,
        @Body('prefijo') prefijo,
        @Body('numero') numero,
        @Body('sufijo') sufijo,
        @Body('barrio') barrio
    ){
        const residenceplace = await this.residenceService.UpdateResidencePlace(idDireccion, idResidencia, duracion, fecha, idUbicacion, idPersona, prefijo, numero, sufijo, barrio)
        res.status(HttpStatus.OK).json(residenceplace)
    }

    @Get('/getOne/:idResidencia')
    public async getResidencePlace(
        @Request() req,
        @Response() res,
        @Param('idResidencia') idResidencia
    ){
        const worksplace = await this.residenceService.getResidencePlace(idResidencia)
        res.status(HttpStatus.OK).json(worksplace)
    }

    @Get('/All/:idPersona')
    public async getResidencePlaces(
        @Request() req,
        @Response() res,
        @Param('idPersona') idPersona
    ){
        const worksplaces = await this.residenceService.getResidencePlaces(idPersona)
        res.status(HttpStatus.OK).json(worksplaces)
    }

    @Delete('/delete/:idResidencia')
    public async DeleteResidencePlace(
        @Request() req,
        @Response() res,
        @Param('idResidencia') idResidencia
    ){
        console.log(idResidencia)
        const response = await this.residenceService.DeleteResidencePlace(idResidencia)
        res.status(HttpStatus.OK).json(response)
    }

}