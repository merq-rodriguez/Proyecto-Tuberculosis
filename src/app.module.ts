import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './modules/batabase/database.module';
import { ManagePatientModule } from './modules/manage-patients/manage-patient.module';
import { ManagePeopleModule } from './modules/manage-people/manage-people.module';
import { UserModule } from './modules/users/user.module';
import { ManageLocationModule } from './modules/manage-location/location.module';
//import { ManagePhysicianModule } from './modules/manage-physicians/manage-physician.module';
import { ManageQuestionaryModule } from './modules/manage-questionaires/questionary-question.module';
import { TreatmentModule } from './modules/treatment/treatment.module';
import { LaboratoryModule } from './modules/manage-laboratory/manage-laboratory.module';
import { ContactChainModule } from './modules/manage-contact-chain/manage-contactchain.module';


@Module({
  controllers: [],
  components: [],
  imports: [DatabaseModule,  
            UserModule,
            ManagePatientModule,
            ManagePeopleModule, 
            ManageLocationModule,
            ManageQuestionaryModule,
            ManageQuestionaryModule,
            TreatmentModule,
            LaboratoryModule,
            ContactChainModule]
})
export class ApplicationModule {}
