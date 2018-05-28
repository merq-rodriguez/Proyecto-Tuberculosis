import { Module, MiddlewaresConsumer } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    controllers: [UserController],
    components: [UserService],
    imports: []
})

export class UserModule{}