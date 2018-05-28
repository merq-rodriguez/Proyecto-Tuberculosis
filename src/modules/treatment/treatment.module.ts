import { Module, MiddlewaresConsumer } from '@nestjs/common';
import { MedicineService } from './medicine/medicine.service';
import { MedicineController } from './medicine/medicine.controller';


@Module({
    controllers: [MedicineController],
    components: [MedicineService],
    imports: []
})

export class TreatmentModule{}
