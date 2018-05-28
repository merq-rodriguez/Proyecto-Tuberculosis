import { Module } from '@nestjs/common'
import { AuthModule } from './auth.module'

@Module({
  modules: [ 
         AuthModule
   ]
})
export class CoreModule { }