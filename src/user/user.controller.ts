import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Users, USERS_SERVICE_NAME, UsersServiceClient } from './user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/auth.guard';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController implements OnModuleInit {
  private svc: UsersServiceClient;

  @Inject(USERS_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  @Get()
  @UseGuards(AuthGuard)
  private async findAllUsers(@Req() req: Request): Promise<Observable<Users>> {
    return this.svc.findAllUsers(req);
  }
}
