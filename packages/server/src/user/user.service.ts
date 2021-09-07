import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  UserDeleteInput,
  UsersQueryInput,
  UserUpdateInput
} from './user.input';
import { User } from './user.object';
import { UserRole } from '../common/enums';
import { UserEntity } from '../database/entities';
import { ApartmentService } from '../apartment/apartment.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => ApartmentService))
    private apartmentService: ApartmentService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  public async getByQuery(
    input: UsersQueryInput,
    { role: currentUserRole }: User
  ) {
    const {
      role,
      order: { field, direction },
      pagination
    } = input;

    if (currentUserRole !== UserRole.admin) {
      throw new Error('Action permitted');
    }

    const [items, total] = await this.userRepository.findAndCount({
      where: { role },
      ...pagination,
      order: { [field]: direction }
    });

    return { items, total };
  }

  public getOne(id: string) {
    return this.userRepository.findOne(id);
  }

  public async update(
    id: string,
    role: UserRole,
    input: UserUpdateInput,
    { role: currentUserRole }: User
  ) {
    if (currentUserRole !== UserRole.admin && role !== currentUserRole) {
      throw new Error('Action permitted');
    }

    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.userRepository.update(id, input);
  }

  public async delete(input: UserDeleteInput, { role: currentUserRole }: User) {
    const { id, role, newRealtorId } = input;

    if (currentUserRole !== UserRole.admin) {
      throw new Error('Action permitted');
    }

    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (role === UserRole.realtor && newRealtorId) {
      await this.apartmentService.updateByQuery(
        { realtorId: id },
        { realtorId: newRealtorId }
      );
    }

    return this.userRepository.delete(id);
  }
}
