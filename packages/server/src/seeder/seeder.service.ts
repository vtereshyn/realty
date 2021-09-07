import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserRole } from '../common/enums';
import { AdminCreateInput, RealtorCreateInput } from '../user/user.input';

const admins: AdminCreateInput[] = [
  {
    firstName: 'Admin',
    lastName: 'Main',
    email: 'admin@gmail.com',
    password: 'testpass'
  },
  {
    firstName: 'Admin',
    lastName: 'First',
    email: 'admin+1@gmail.com',
    password: 'testpass'
  },
  {
    firstName: 'Admin',
    lastName: 'Second',
    email: 'admin+2@gmail.com',
    password: 'testpass'
  }
];

const realtors: RealtorCreateInput[] = [
  {
    firstName: 'Realtor',
    lastName: 'Main',
    email: 'realtor@gmail.com',
    password: 'testpass'
  },
  {
    firstName: 'Realtor',
    lastName: 'First',
    email: 'realtor+1@gmail.com',
    password: 'testpass'
  }
];

@Injectable()
export class SeederService {
  constructor(private authService: AuthService) {}

  public async seed() {
    await this.createAdmins();
    await this.createRealtors();
  }

  private createAdmins() {
    return Promise.all(
      admins.map(adminInput =>
        this.authService.register(adminInput, UserRole.admin)
      )
    );
  }

  private createRealtors() {
    return Promise.all(
      realtors.map(adminInput =>
        this.authService.register(adminInput, UserRole.realtor)
      )
    );
  }
}
