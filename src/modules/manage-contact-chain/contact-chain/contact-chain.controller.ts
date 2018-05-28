import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post, Put } from '@nestjs/common';
import { ContactChainService } from './contact-chain.service';


@Controller('contact-chain')
export class ContactChainController{
    constructor(private contactChainService : ContactChainService){}


    @Post('/create')
    public async CreateContactChain(
        @Request() req,
        @Response() res,
        @Body('idPaciente') idPaciente,
        @Body('estado_salud') estado_salud,
        @Body('duracion_contacto') duracion_contacto,
        @Body('fecha_contacto') fecha_contacto,
        @Body('contexto') contexto,
        @Body('idPersona') idPersona,
        @Body('idLugarContacto') idLugarContacto,
        @Body('idDirecion_contacto') idDirecion_contacto,
        @Body('idTipo_relacion') idTipo_relacion,
        @Body('idNivel_exposicion') idNivel_exposicion
    ){
        const response = await this.contactChainService.CreateContactChain(
            idPaciente,
            estado_salud, 
            duracion_contacto, 
            fecha_contacto,
            contexto,
            idPersona,
            idLugarContacto,
            idDirecion_contacto,
            idTipo_relacion,
            idNivel_exposicion)
        res.status(HttpStatus.OK).json(response)
    }

    @Put('/update')
    public async UpdateContactChain(
        @Request() req,
        @Response() res,
        @Body('idContacto') idContacto,
        @Body('estado_salud') estado_salud,
        @Body('duracion_contacto') duracion_contacto,
        @Body('fecha_contacto') fecha_contacto,
        @Body('contexto') contexto,
        @Body('idPersona') idPersona,
        @Body('idLugarContacto') idLugarContacto,
        @Body('idDirecion_contacto') idDirecion_contacto,
        @Body('idTipo_relacion') idTipo_relacion,
        @Body('idNivel_exposicion') idNivel_exposicion
    ){
        const response= await this.contactChainService.UpdateContactChain(
            idContacto,
            estado_salud, 
            duracion_contacto, 
            fecha_contacto,
            contexto,
            idPersona,
            idLugarContacto,
            idDirecion_contacto,
            idTipo_relacion,
            idNivel_exposicion
        )
        res.status(HttpStatus.OK).json(response)
    }

    @Get('/getOne/:idContacto')
    public async getContactChain(
        @Request() req,
        @Response() res,
        @Param('idContacto') idContacto
    ){
        const contactChain = await this.contactChainService.getContactChain(idContacto)
        res.status(HttpStatus.OK).json(contactChain)
    }

    @Get('/All')
    public async getAllContactChain(
        @Request() req,
        @Response() res,
    ){
        const response = await this.contactChainService.getAllContactChain()
        res.status(HttpStatus.OK).json(response)
    }

    @Get('/AllContactChain-Patient/:idPaciente')
    public async getAllContactChainPatient(
        @Request() req,
        @Response() res,
        @Param('idPaciente') idPaciente
    ){
        const response = await this.contactChainService.getAllContactChainPatient(idPaciente)
        res.status(HttpStatus.OK).json(response)
    }

    @Delete('/delete/:idContacto')
    public async DeleteContactChain(
        @Request() req,
        @Response() res,
        @Param('idContacto') idContacto
    ){
        const response = await this.contactChainService.DeleteContactChain(idContacto)
        res.status(HttpStatus.OK).json(response)
    }

    @Post('/delete-contactchain-pacient')
    public async DeleteContactChainPacient(
        @Request() req,
        @Response() res,
        @Body('idContacto') idContacto,
        @Body('idPaciente') idPaciente
    ){
        const response = await this.contactChainService.DeleteContactChainPacient(idPaciente, idContacto)
        res.status(HttpStatus.OK).json(response)
    }
    
}