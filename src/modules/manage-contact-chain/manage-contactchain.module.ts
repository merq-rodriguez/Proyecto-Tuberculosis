import { Module, MiddlewaresConsumer } from '@nestjs/common';
import { ContactChainController } from './contact-chain/contact-chain.controller';
import { ContactChainService } from './contact-chain/contact-chain.service';




@Module({
    controllers: [ContactChainController],
    components: [ContactChainService],
    imports: []
})

export class ContactChainModule{}
