import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post, Put } from '@nestjs/common';
import { PersonService } from './person.service';

@Controller('/people')
export class PersonController{
    constructor(private personService :PersonService){}


    @Post('/create')
    public async CreatePerson(
        @Response() res,
        @Request() req,
        @Body('id') id,
        @Body('nombres') nombres,
        @Body('apellidos') apellidos,
        @Body('ocupacion') ocupacion,
        @Body('telefono') telefono,
        @Body('fecha_nacimiento') fecha_nacimiento,
        @Body('idIPS') idIPS,
        @Body('idPertenencia_etnica') idPertenencia_etnica,
        @Body('idRegimen') idRegimen,
        @Body('idPueblo_indigeno') idPueblo_indigeno,
        @Body('idGrupo_poblacional') idGrupo_poblacional,
        @Body('idLugar_nacimiento') idLugar_nacimiento,
        @Body('idTipo_documento') idTipo_documento,
        @Body('idGenero') idGenero          
    ){
        let Strfecha = Date.parse(fecha_nacimiento);
        let Dfecha = new Date(Strfecha); 
        //console.log(typeof Dfecha)
        //console.log(id, nombres, apellidos, ocupacion, grupo_poblacional, fecha_nacimiento, lugar_nacimiento,tipo_documento, genero);
        const response = await this.personService.CreatePerson(id, nombres, apellidos, ocupacion, telefono,  Dfecha, idIPS,idPertenencia_etnica, idRegimen, idPueblo_indigeno, idGrupo_poblacional, idLugar_nacimiento, idTipo_documento, idGenero)
        res.status(HttpStatus.OK).json(response)
    }
    
    @Put('/update')
    public async UpdatePerson(
        @Response() res,
        @Request() req,
        @Body('id') id,
        @Body('nombres') nombres,
        @Body('apellidos') apellidos,
        @Body('ocupacion') ocupacion,
        @Body('telefono') telefono,
        @Body('fecha_nacimiento') fecha_nacimiento,
        @Body('idIPS') idIPS,
        @Body('idPertenencia_etnica') idPertenencia_etnica,
        @Body('idRegimen') idRegimen,
        @Body('idPueblo_indigeno') idPueblo_indigeno,
        @Body('idGrupo_poblacional') idGrupo_poblacional,
        @Body('idLugar_nacimiento') idLugar_nacimiento,
        @Body('idTipo_documento') idTipo_documento,
        @Body('idGenero') idGenero         
    ){
        let Strfecha = Date.parse(fecha_nacimiento);
        let Dfecha = new Date(Strfecha);
        const response = await this.personService.UpdatePerson(id, nombres, apellidos, ocupacion, telefono,  Dfecha, idIPS,idPertenencia_etnica, idRegimen, idPueblo_indigeno, idGrupo_poblacional, idLugar_nacimiento, idTipo_documento, idGenero )
        res.status(HttpStatus.OK).json(response)
    }

    @Get('/All')
    public async getPeople(
        @Request() req,
        @Response() res
    ){
        const people = await this.personService.getAllPeople()
        res.status(HttpStatus.OK).json(people);
    }

    @Delete('/delete/:id')
    public async DeletePerson(
        @Request() req,
        @Response() res,
        @Param('id') id 
    ){
        const person = await this.personService.DeletePerson(id)
        res.status(HttpStatus.OK).json(person);
    }

    @Get('getone/:id')
    public async getPerson(
        @Request() req,
        @Response() res,
        @Param('id') id 
    ){
        const person = await this.personService.getPerson(id)
        res.status(HttpStatus.OK).json(person);
    }

   
    



}