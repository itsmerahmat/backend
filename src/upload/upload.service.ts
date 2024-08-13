import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { unlinkSync } from 'fs';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  getMulterOptions() {
    return {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    };
  }

  getFileUrl(filename: string): string {
    const appUrl = this.configService.get<string>('APP_URL');
    return `${appUrl}/uploads/${filename}`;
  }

  deleteFile(filename: string) {
    try {
      unlinkSync(`./uploads/${filename}`);
    } catch (error) {
      console.error('Error deleting file', error);
    }
  }
}
