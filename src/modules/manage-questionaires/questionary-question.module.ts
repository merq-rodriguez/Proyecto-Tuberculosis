import { Module, MiddlewaresConsumer } from '@nestjs/common';
import { QuestionaryService } from './questionaires/questionary.service';
import { QuestionController } from './questions/question.controller';
import { QuestionService } from './questions/question.service';
import { QuestionaryController } from './questionaires/questionary.controller';
import { AnswerController } from './answer/answer.controller';
import { AnswerService } from './answer/answer.service';

@Module({
    controllers: [QuestionController, QuestionaryController, AnswerController],
    components: [QuestionService, QuestionaryService, AnswerService],
    imports: []
})

export class ManageQuestionaryModule{}