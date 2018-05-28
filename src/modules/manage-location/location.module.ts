import { Module, MiddlewaresConsumer } from '@nestjs/common';

import { WorkplaceController } from './worksplaces/workplace.controller';
import { WorkplaceService } from './worksplaces/workplace.service';
import { GeopositionController } from './Geopositioning/geoposition.controller';
import { GeopositionService } from './Geopositioning/geoposition.service';
import { ResidenceplaceController } from './residenceplaces/residenceplace.controller';
import { ResidenceplaceService } from './residenceplaces/residenceplace.service';

@Module({
    controllers: [ResidenceplaceController, WorkplaceController, GeopositionController],
    components: [ResidenceplaceService, WorkplaceService, GeopositionService],
    imports: []
})

export class ManageLocationModule{}
