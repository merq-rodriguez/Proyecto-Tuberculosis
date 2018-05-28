import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';



@Controller('/users')
export class UserController{
    constructor(private userservice : UserService){}

@Post('/create')
public async createUser(
    @Response() res,
    @Request() req ,
    @Body('username') username,
    @Body('email') email,
    @Body('password') password,
    @Body('idPersona') idPersona,
    @Body('idRol') idRol
){  
    
    const response = await this.userservice.CreateUser(username, email, password, idPersona, idRol)
    res.status(HttpStatus.OK).json(response)
}


@Put('/update')
public async UpdateUser(
    @Response() res,
    @Request() req ,
    @Body('username') username,
    @Body('email') email,
    @Body('password') password,
    @Body('idPersona') idPersona,
    @Body('idRol') idRol
){  
    
    const response = await this.userservice.UpdateUser(username, email, password, idPersona, idRol)
    res.status(HttpStatus.OK).json(response)
}


@Get('/All')
public async getUsers(
    @Request() req,
    @Response() res, 
){
    const users = await this.userservice.getAllUsers()
    res.status(HttpStatus.OK).json(users)
}

@Get('getOne/:idUsuario')
public async getUser(
    @Request() req,
    @Response() res, 
    @Param('idUsuario') idUsuario
){
    const user = await this.userservice.getUser(idUsuario)
    res.status(HttpStatus.OK).json(user)
}


@Post('/signIn')
public async signIn(
    @Request() req,
    @Response() res, 
    @Body('email') email,
    @Body('password') password
){
    console.log(email, password)
    const user = await this.userservice.signIn(email, password)
    res.status(HttpStatus.OK).json(user)
}


@Delete('/delete/:idUser')
public async DeleteUser(
    @Request() req,
    @Response() res,
    @Param('idUser') idUser
){
    console.log(idUser)
    const response = await this.userservice.DeleteUser(idUser)
    res.status(HttpStatus.OK).json(response)
}



}