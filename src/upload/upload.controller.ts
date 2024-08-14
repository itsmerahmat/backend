import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { Role } from '@/roles/role.enum';
import { Roles } from '@/roles/roles.decorator';
import { RolesGuard } from '@/roles/roles.guard';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

@ApiTags('uploads')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('uploads')
export class UploadController {
  @Roles(Role.Public)
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
