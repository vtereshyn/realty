import { registerEnumType } from '@nestjs/graphql';

export enum RentStatus {
  available = 'available',
  rented = 'rented'
}

registerEnumType(RentStatus, { name: 'RentStatus' });

export enum RoomsCount {
  Room_1 = '1',
  Rooms_2 = '2',
  Rooms_3 = '3',
  Rooms_4 = '4',
  Rooms_5Plus = '5+'
}

registerEnumType(RoomsCount, { name: 'RoomsCount' });

export enum UserRole {
  client = 'client',
  realtor = 'realtor',
  admin = 'admin'
}

registerEnumType(UserRole, { name: 'UserRole' });

export enum Order {
  Asc = 'ASC',
  Desc = 'DESC'
}

registerEnumType(Order, { name: 'Order' });
