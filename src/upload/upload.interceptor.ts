import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Injectable()
export class UploadInterceptor implements NestInterceptor {
  constructor(private readonly uploadService: UploadService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const multerOptions = this.uploadService.getMulterOptions();
    const fileInterceptor = new (FileInterceptor('image_url', multerOptions))();
    return fileInterceptor.intercept(context, next);
  }
}
