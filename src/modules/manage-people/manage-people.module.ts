import { Module, MiddlewaresConsumer } from '@nestjs/common';
import { GestationController } from '../manage-people/gestation/gestation.controller';
import { GestationService } from './gestation/gestation.service';
import { PersonController } from './people/person.controller';
import { PersonService } from './people/person.service';


@Module({
    controllers: [GestationController, PersonController],
    components: [GestationService, PersonService],
    imports: []
})

export class ManagePeopleModule{}
