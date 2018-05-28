import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as cors from 'cors'
import 'dotenv/config'

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	app.use(bodyParser.urlencoded ({ extended: false }));
	app.use(bodyParser.json())
	//const port = parseInt(process.env.PORT_ENV, 10);
	await app.listen(4000);
}
bootstrap();
