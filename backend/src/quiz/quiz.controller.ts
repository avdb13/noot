import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizDto } from './quiz.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('quiz')
  async create(@Body() quiz: QuizDto) {
    return await this.quizService.create(quiz);
  }

  @Post('quiz/images')
  @UseInterceptors(FilesInterceptor('image'))
  async uploadImages(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10_000_000 }),
          new FileTypeValidator({ fileType: /image\/*/ }),
        ],
      }),
    )
    images: Array<Express.Multer.File>,
  ) {
    console.log(images);
  }
}
