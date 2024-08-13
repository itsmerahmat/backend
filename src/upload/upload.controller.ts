import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

@ApiTags('uploads')
@Controller('uploads')
export class UploadController {
  @Get(':imgPath')
  async seeUploadedFile(
    @Param('imgPath') imagePath: string,
    @Res() res: Response,
  ) {
    const filePath = join(process.cwd(), 'uploads', imagePath);

    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    return res.sendFile(filePath);
  }
}
