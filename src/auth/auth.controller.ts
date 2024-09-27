import { Body, Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  ValidateRequest,
  ValidateResponse,
} from './auth.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Get('validate')
  private async validateToken(
    @Body() body: ValidateRequest,
  ): Promise<Observable<ValidateResponse>> {
    return this.svc.validate(body);
  }
}
