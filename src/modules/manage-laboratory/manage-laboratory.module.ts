import { Module, MiddlewaresConsumer } from '@nestjs/common';
import { LaboratoryService } from './laboratory/laboratory.service';
import { LaboratoryController } from './laboratory/laboratory.controller';




@Module({
    controllers: [LaboratoryController],
    components: [LaboratoryService],
    imports: []
})

export class LaboratoryModule{}
