import { Component, Inject, BadRequestException } from '@nestjs/common';



@Component()
export class UserService{
    constructor(
        @Inject('DbConnection') private connection
    ){}

public CreateUser(username : String,
                  email : String,
                  password : String,
                  idPersona : number,
                  idRol : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'CALL ProSaveUsuario(?,?,?,?,?,?)',
            ['REGISTRAR',
              username,
              email, 
              password, 
              idPersona, 
              idRol], 
              (err, result) => {
                return !err
                    ? resolve({ 'message': 'Usuario registrado' })
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public UpdateUser(
    username : String,
    email : String,
    password : String,
    idPersona : number,
    idRol : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
        'CALL ProSaveUsuario(?,?,?,?,?,?)',
         ['ACTUALIZAR',
          username,
          email, 
          password, 
          idPersona, 
          idRol], 
          (err, result) => {
          return !err
              ? resolve({ 'message': 'Usuario actualizado' })
              :  reject(new BadRequestException(err.message))
        })
    })
}

public signIn(email : String, password : String){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM usuario WHERE email = ? AND password = ? AND estado = 1', 
            [email, 
            password], (err, result) => {
                return !err
                    ? resolve( result )
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public getUser(idUser : number ){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM usuario WHERE idUsuario = ? AND estado = 1', idUser, (err, result) => {
                return !err
                    ? resolve( result )
                    :  reject(new BadRequestException(err.message))
        })
    })
}

public getAllUsers(){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'SELECT * FROM usuario WHERE estado = 1', (err, result) => {
                return !err
                    ? resolve(result)
                    :  reject(new BadRequestException(err.message))
        })
    })
}


public DeleteUser(idUser : number){
    return new Promise( (resolve, reject) => {
        this.connection.query(
            'UPDATE usuario SET estado = 0 WHERE idUsuario = ?',idUser,(err, results) => {
                return !err
                    ? resolve({'message' : 'Se eliminado el usuario correctamente.'})
                    : reject(new BadRequestException(err.message))
            }
        )
    })
}

}