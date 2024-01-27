import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../utils/file-upload';
import { FilesService } from './files.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('files')
@ApiTags('Files')
export class FilesController {
  constructor(private filesService: FilesService) {}
  // upload single file
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  async uploadedFile(@UploadedFile() file: Express.Multer.File) {
    return await this.filesService.createFile(file.filename);
  }
  @Get(':imagename')
  getImage(@Param('imagename') image, @Res() res) {
    console.log('asdlkjasldkj')
    res.sendFile(image, { root: './uploads' });
  }
}
