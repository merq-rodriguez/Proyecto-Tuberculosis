import { Module, MiddlewaresConsumer } from '@nestjs/common';
import { PatientController } from './patients/patient.controller';
import { PatientService } from './patients/patient.service';
import { SymptomService } from './symptom/symptom.service';
import { SymptomController } from './symptom/symptom.controller';
import { IngressPatientController } from './ingress-patients/ingress-patient.controller';
import { IngressPatientService } from './ingress-patients/ingress-patient.service';
import { ClinicalConditionService } from './clinical-condition/clinical.service';
import { ClinicalConditionController } from './clinical-condition/clinical.controller';


@Module({
    controllers: [PatientController, 
                  SymptomController,
                  IngressPatientController,
                  ClinicalConditionController ],
    components: [PatientService,
                 SymptomService,
                 IngressPatientService,
                 ClinicalConditionService],
    imports: []
})

export class ManagePatientModule{}
