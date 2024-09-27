import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { User, USERS_SERVICE_NAME, UsersServiceClient } from './user.pb';
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

  @Get(':id')
  @UseGuards(AuthGuard)
  private async findOneUser(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<Observable<User>> {
    console.log(id);

    return this.svc.findOneUser({ id });
  }
}
