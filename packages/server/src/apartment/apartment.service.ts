import fetch from 'node-fetch';
import { createApi } from 'unsplash-js';
import { InjectRepository } from '@nestjs/typeorm';
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { FindManyOptions, In, LessThan, MoreThan, Repository } from 'typeorm';

import { UserService } from '../user/user.service';
import {
  ApartmentCreateInput,
  ApartmentQueryInput,
  ApartmentUpdateInput
} from './apartment.input';
import { ApartmentEntity } from '../database/entities';

import { config } from '../config';

import { baseCreate } from '../common/crud';
import { RentStatus, UserRole } from '../common/enums';

import { User } from '../user/user.object';

const { unsplash } = config;

const unsplashApi = createApi({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fetch,
  accessKey: unsplash.accessKey
});

@Injectable()
export class ApartmentService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @InjectRepository(ApartmentEntity)
    private apartmentRepository: Repository<ApartmentEntity>
  ) {}

  public async getOne(id: string) {
    const apartment = await this.apartmentRepository.findOne(id);

    if (!apartment) {
      throw new NotFoundException('Apartment not found');
    }

    return apartment;
  }

  public async getByQuery(
    query: ApartmentQueryInput,
    { id: userId, role: userRole }: Pick<User, 'id' | 'role'>
  ) {
    const {
      size,
      order: { field, direction },
      price,
      roomsCount,
      pagination,
      ...where
    } = query;

    const whereQuery: FindManyOptions<ApartmentQueryInput>['where'] = {
      ...where
    };

    if (size) {
      whereQuery.size = MoreThan(size);
    }

    if (price) {
      whereQuery.price = LessThan(price);
    }

    if (roomsCount?.length) {
      whereQuery.roomsCount = In(roomsCount);
    }

    if (userRole === UserRole.client) {
      const [items, total] = await this.apartmentRepository.findAndCount({
        order: {
          [field]: direction
        },
        where: { ...whereQuery, status: RentStatus.available },
        ...pagination
      });
      return { items, total };
    }

    if (userRole === UserRole.realtor) {
      const [items, total] = await this.apartmentRepository.findAndCount({
        order: {
          [field]: direction
        },
        where: { ...whereQuery, realtorId: userId },
        ...pagination
      });

      return { items, total };
    }

    const [items, total] = await this.apartmentRepository.findAndCount({
      order: {
        [field]: direction
      },
      where: whereQuery,
      ...pagination
    });

    return { items, total };
  }

  public async create(input: ApartmentCreateInput, { role }: User) {
    if (role === UserRole.client) {
      throw new Error('Action permitted');
    }

    const realtor = await this.userService.getOne(input.realtorId);

    if (!realtor) {
      throw new NotFoundException(`Realtor doesn't exist`);
    }

    const pictures = !input.pictures.length
      ? await this.getPicturesFromUnsplash()
      : input.pictures;

    return baseCreate(this.apartmentRepository, { ...input, pictures });
  }

  public async update(id: string, input: ApartmentUpdateInput, user: User) {
    const { role, id: userId } = user;

    if (role === UserRole.client) {
      throw new Error('Action permitted');
    }

    const { realtorId } = await this.getOne(id);

    if (role === UserRole.realtor && userId !== realtorId) {
      throw new Error('Apartment assigned to another realtor');
    }

    return this.apartmentRepository.update(id, input);
  }

  public async updateByQuery(
    query: Omit<ApartmentQueryInput, 'order'>,
    input: ApartmentUpdateInput
  ) {
    const { pagination, roomsCount, ...restQuery } = query;

    return this.apartmentRepository.update(restQuery, input);
  }

  public async delete(id: string, user: User) {
    const { role } = user;

    if (role === UserRole.client) {
      throw new Error('Action permitted');
    }

    const apartment = await this.getOne(id);

    if (!apartment) {
      throw new Error(`Apartment with ${id} doesn't exist`);
    }

    return this.apartmentRepository.remove(apartment);
  }

  private async getPicturesFromUnsplash() {
    const { response } = await unsplashApi.search.getPhotos({
      query: 'apartments',
      page: Math.floor(Math.random() * 100),
      perPage: 5,
      orientation: 'landscape'
    });

    if (response?.results) {
      return response.results.map(({ urls }) => urls.small);
    }

    return [];
  }
}
