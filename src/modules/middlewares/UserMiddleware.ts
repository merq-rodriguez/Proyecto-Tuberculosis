import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';

@Middleware()
export class LoggerMiddleware implements NestMiddleware{
    constructor(){}
    resolve(){
        return(req, res, next) => {
            if(req.params.usuario){
                
            }
        }
    }
}