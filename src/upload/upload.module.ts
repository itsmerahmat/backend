import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadInterceptor } from './upload.interceptor';
import { UploadController } from './upload.controller';

@Module({
  providers: [UploadService, UploadInterceptor],
  exports: [UploadService, UploadInterceptor],
  controllers: [UploadController],
})
export class UploadModule {}
