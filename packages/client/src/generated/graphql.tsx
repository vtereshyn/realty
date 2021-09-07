import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AdminCreateInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Apartment = {
  __typename?: 'Apartment';
  id: Scalars['String'];
  name: Scalars['String'];
  status: RentStatus;
  description: Scalars['String'];
  pictures: Array<Scalars['String']>;
  size: Scalars['Float'];
  price: Scalars['Float'];
  roomsCount: RoomsCount;
  location: Location;
  realtor: Realtor;
  client: Client;
};

export type ApartmentCreateInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  size: Scalars['Float'];
  pictures?: Maybe<Array<Scalars['String']>>;
  price: Scalars['Float'];
  roomsCount: RoomsCount;
  location: LocationInput;
  realtorId: Scalars['String'];
};

export type ApartmentQueryInput = {
  id?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  roomsCount?: Maybe<Array<RoomsCount>>;
  realtorId?: Maybe<Scalars['String']>;
  pagination?: Maybe<PaginationArgs>;
  order?: Maybe<OrderArgs>;
};

export type ApartmentUpdateInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  pictures?: Maybe<Array<Scalars['String']>>;
  price?: Maybe<Scalars['Float']>;
  roomsCount?: Maybe<RoomsCount>;
  location?: Maybe<LocationInput>;
  realtorId?: Maybe<Scalars['String']>;
};

export type Client = {
  __typename?: 'Client';
  id: Scalars['String'];
  role: UserRole;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  apartment: Apartment;
};

export type ClientCreateInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Coordinates = {
  __typename?: 'Coordinates';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type CoordinatesInput = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};


export type Location = {
  __typename?: 'Location';
  address: Scalars['String'];
  coordinates: Coordinates;
};

export type LocationInput = {
  address: Scalars['String'];
  coordinates: CoordinatesInput;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createClient: UserToken;
  createRealtor: UserToken;
  createAdmin: UserToken;
  login: UserWithToken;
  updateUser: User;
  deleteUser: Scalars['Boolean'];
  createApartment: Apartment;
  updateApartment: Scalars['Boolean'];
  deleteApartment: Scalars['Boolean'];
};


export type MutationCreateClientArgs = {
  input: ClientCreateInput;
};


export type MutationCreateRealtorArgs = {
  input: RealtorCreateInput;
};


export type MutationCreateAdminArgs = {
  input: AdminCreateInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationUpdateUserArgs = {
  input: UserUpdateInput;
  role: UserRole;
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  input: UserDeleteInput;
};


export type MutationCreateApartmentArgs = {
  input: ApartmentCreateInput;
};


export type MutationUpdateApartmentArgs = {
  input: ApartmentUpdateInput;
  id: Scalars['String'];
};


export type MutationDeleteApartmentArgs = {
  id: Scalars['String'];
};

export enum Order {
  Asc = 'Asc',
  Desc = 'Desc'
}

export type OrderArgs = {
  field?: Maybe<Scalars['String']>;
  direction?: Maybe<Order>;
};

export type PaginatedApartments = {
  __typename?: 'PaginatedApartments';
  total: Scalars['Int'];
  items: Array<Apartment>;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  total: Scalars['Float'];
  items: Array<User>;
};

export type PaginationArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  usersByQuery: PaginatedUsers;
  apartment: Apartment;
  apartmentsByQuery: PaginatedApartments;
};


export type QueryUsersByQueryArgs = {
  input: UsersQueryInput;
};


export type QueryApartmentArgs = {
  id: Scalars['String'];
};


export type QueryApartmentsByQueryArgs = {
  input: ApartmentQueryInput;
};

export type Realtor = {
  __typename?: 'Realtor';
  id: Scalars['String'];
  role: UserRole;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  apartments: Array<Apartment>;
};

export type RealtorCreateInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum RentStatus {
  Available = 'available',
  Rented = 'rented'
}

export enum RoomsCount {
  Room_1 = 'Room_1',
  Rooms_2 = 'Rooms_2',
  Rooms_3 = 'Rooms_3',
  Rooms_4 = 'Rooms_4',
  Rooms_5Plus = 'Rooms_5Plus'
}

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  role: UserRole;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
};

export type UserDeleteInput = {
  id: Scalars['String'];
  role: UserRole;
  newRealtorId?: Maybe<Scalars['String']>;
};

export enum UserRole {
  Client = 'client',
  Realtor = 'realtor',
  Admin = 'admin'
}

export type UserToken = {
  __typename?: 'UserToken';
  token: Scalars['String'];
};

export type UserUpdateInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserWithToken = {
  __typename?: 'UserWithToken';
  token: Scalars['String'];
  user: User;
};

export type UsersQueryInput = {
  role: UserRole;
  order?: Maybe<OrderArgs>;
  pagination?: Maybe<PaginationArgs>;
};

export type UpdateApartmentMutationVariables = Exact<{
  input: ApartmentUpdateInput;
  id: Scalars['String'];
}>;


export type UpdateApartmentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateApartment'>
);

export type CreateApartmentMutationVariables = Exact<{
  input: ApartmentCreateInput;
}>;


export type CreateApartmentMutation = (
  { __typename?: 'Mutation' }
  & { createApartment: (
    { __typename?: 'Apartment' }
    & Pick<Apartment, 'id'>
  ) }
);

export type DeleteApartmentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteApartmentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteApartment'>
);

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserWithToken' }
    & Pick<UserWithToken, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'role'>
      & UserFieldsFragment
    ) }
  ) }
);

export type CreateClientMutationVariables = Exact<{
  input: ClientCreateInput;
}>;


export type CreateClientMutation = (
  { __typename?: 'Mutation' }
  & { createClient: (
    { __typename?: 'UserToken' }
    & Pick<UserToken, 'token'>
  ) }
);

export type CreateRealtorMutationVariables = Exact<{
  input: RealtorCreateInput;
}>;


export type CreateRealtorMutation = (
  { __typename?: 'Mutation' }
  & { createRealtor: (
    { __typename?: 'UserToken' }
    & Pick<UserToken, 'token'>
  ) }
);

export type DeleteUserMutationVariables = Exact<{
  input: UserDeleteInput;
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String'];
  role: UserRole;
  input: UserUpdateInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & Pick<User, 'createdAt' | 'updatedAt'>
    & UserFieldsFragment
  ) }
);

export type ApartmentQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ApartmentQuery = (
  { __typename?: 'Query' }
  & { apartment: (
    { __typename?: 'Apartment' }
    & Pick<Apartment, 'id' | 'status' | 'name' | 'description' | 'roomsCount' | 'price' | 'size' | 'pictures'>
    & { location: (
      { __typename?: 'Location' }
      & Pick<Location, 'address'>
      & { coordinates: (
        { __typename?: 'Coordinates' }
        & Pick<Coordinates, 'lat' | 'lng'>
      ) }
    ), realtor: (
      { __typename?: 'Realtor' }
      & Pick<Realtor, 'id' | 'firstName' | 'lastName' | 'email'>
    ) }
  ) }
);

export type ApartmentsByQueryQueryVariables = Exact<{
  input: ApartmentQueryInput;
}>;


export type ApartmentsByQueryQuery = (
  { __typename?: 'Query' }
  & { apartmentsByQuery: (
    { __typename?: 'PaginatedApartments' }
    & Pick<PaginatedApartments, 'total'>
    & { items: Array<(
      { __typename?: 'Apartment' }
      & Pick<Apartment, 'id' | 'status' | 'name' | 'roomsCount' | 'price' | 'pictures'>
      & { location: (
        { __typename?: 'Location' }
        & Pick<Location, 'address'>
        & { coordinates: (
          { __typename?: 'Coordinates' }
          & Pick<Coordinates, 'lat' | 'lng'>
        ) }
      ) }
    )> }
  ) }
);

export type UserFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'role'>
    & UserFieldsFragment
  ) }
);

export type UsersByQueryQueryVariables = Exact<{
  input: UsersQueryInput;
}>;


export type UsersByQueryQuery = (
  { __typename?: 'Query' }
  & { usersByQuery: (
    { __typename?: 'PaginatedUsers' }
    & Pick<PaginatedUsers, 'total'>
    & { items: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  email
  firstName
  lastName
}
    `;
export const UpdateApartmentDocument = gql`
    mutation updateApartment($input: ApartmentUpdateInput!, $id: String!) {
  updateApartment(input: $input, id: $id)
}
    `;
export type UpdateApartmentMutationFn = Apollo.MutationFunction<UpdateApartmentMutation, UpdateApartmentMutationVariables>;

/**
 * __useUpdateApartmentMutation__
 *
 * To run a mutation, you first call `useUpdateApartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateApartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateApartmentMutation, { data, loading, error }] = useUpdateApartmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateApartmentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateApartmentMutation, UpdateApartmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateApartmentMutation, UpdateApartmentMutationVariables>(UpdateApartmentDocument, options);
      }
export type UpdateApartmentMutationHookResult = ReturnType<typeof useUpdateApartmentMutation>;
export type UpdateApartmentMutationResult = Apollo.MutationResult<UpdateApartmentMutation>;
export type UpdateApartmentMutationOptions = Apollo.BaseMutationOptions<UpdateApartmentMutation, UpdateApartmentMutationVariables>;
export const CreateApartmentDocument = gql`
    mutation createApartment($input: ApartmentCreateInput!) {
  createApartment(input: $input) {
    id
  }
}
    `;
export type CreateApartmentMutationFn = Apollo.MutationFunction<CreateApartmentMutation, CreateApartmentMutationVariables>;

/**
 * __useCreateApartmentMutation__
 *
 * To run a mutation, you first call `useCreateApartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApartmentMutation, { data, loading, error }] = useCreateApartmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateApartmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateApartmentMutation, CreateApartmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateApartmentMutation, CreateApartmentMutationVariables>(CreateApartmentDocument, options);
      }
export type CreateApartmentMutationHookResult = ReturnType<typeof useCreateApartmentMutation>;
export type CreateApartmentMutationResult = Apollo.MutationResult<CreateApartmentMutation>;
export type CreateApartmentMutationOptions = Apollo.BaseMutationOptions<CreateApartmentMutation, CreateApartmentMutationVariables>;
export const DeleteApartmentDocument = gql`
    mutation deleteApartment($id: String!) {
  deleteApartment(id: $id)
}
    `;
export type DeleteApartmentMutationFn = Apollo.MutationFunction<DeleteApartmentMutation, DeleteApartmentMutationVariables>;

/**
 * __useDeleteApartmentMutation__
 *
 * To run a mutation, you first call `useDeleteApartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteApartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteApartmentMutation, { data, loading, error }] = useDeleteApartmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteApartmentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteApartmentMutation, DeleteApartmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteApartmentMutation, DeleteApartmentMutationVariables>(DeleteApartmentDocument, options);
      }
export type DeleteApartmentMutationHookResult = ReturnType<typeof useDeleteApartmentMutation>;
export type DeleteApartmentMutationResult = Apollo.MutationResult<DeleteApartmentMutation>;
export type DeleteApartmentMutationOptions = Apollo.BaseMutationOptions<DeleteApartmentMutation, DeleteApartmentMutationVariables>;
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      ...UserFields
      role
    }
  }
}
    ${UserFieldsFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateClientDocument = gql`
    mutation createClient($input: ClientCreateInput!) {
  createClient(input: $input) {
    token
  }
}
    `;
export type CreateClientMutationFn = Apollo.MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, options);
      }
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = Apollo.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
export const CreateRealtorDocument = gql`
    mutation createRealtor($input: RealtorCreateInput!) {
  createRealtor(input: $input) {
    token
  }
}
    `;
export type CreateRealtorMutationFn = Apollo.MutationFunction<CreateRealtorMutation, CreateRealtorMutationVariables>;

/**
 * __useCreateRealtorMutation__
 *
 * To run a mutation, you first call `useCreateRealtorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRealtorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRealtorMutation, { data, loading, error }] = useCreateRealtorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRealtorMutation(baseOptions?: Apollo.MutationHookOptions<CreateRealtorMutation, CreateRealtorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRealtorMutation, CreateRealtorMutationVariables>(CreateRealtorDocument, options);
      }
export type CreateRealtorMutationHookResult = ReturnType<typeof useCreateRealtorMutation>;
export type CreateRealtorMutationResult = Apollo.MutationResult<CreateRealtorMutation>;
export type CreateRealtorMutationOptions = Apollo.BaseMutationOptions<CreateRealtorMutation, CreateRealtorMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($input: UserDeleteInput!) {
  deleteUser(input: $input)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($id: String!, $role: UserRole!, $input: UserUpdateInput!) {
  updateUser(id: $id, role: $role, input: $input) {
    ...UserFields
    createdAt
    updatedAt
  }
}
    ${UserFieldsFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      role: // value for 'role'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const ApartmentDocument = gql`
    query apartment($id: String!) {
  apartment(id: $id) {
    id
    status
    name
    description
    roomsCount
    price
    size
    pictures
    location {
      address
      coordinates {
        lat
        lng
      }
    }
    realtor {
      id
      firstName
      lastName
      email
    }
  }
}
    `;

/**
 * __useApartmentQuery__
 *
 * To run a query within a React component, call `useApartmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useApartmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApartmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApartmentQuery(baseOptions: Apollo.QueryHookOptions<ApartmentQuery, ApartmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ApartmentQuery, ApartmentQueryVariables>(ApartmentDocument, options);
      }
export function useApartmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApartmentQuery, ApartmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ApartmentQuery, ApartmentQueryVariables>(ApartmentDocument, options);
        }
export type ApartmentQueryHookResult = ReturnType<typeof useApartmentQuery>;
export type ApartmentLazyQueryHookResult = ReturnType<typeof useApartmentLazyQuery>;
export type ApartmentQueryResult = Apollo.QueryResult<ApartmentQuery, ApartmentQueryVariables>;
export const ApartmentsByQueryDocument = gql`
    query apartmentsByQuery($input: ApartmentQueryInput!) {
  apartmentsByQuery(input: $input) {
    total
    items {
      id
      status
      name
      roomsCount
      price
      pictures
      location {
        address
        coordinates {
          lat
          lng
        }
      }
    }
  }
}
    `;

/**
 * __useApartmentsByQueryQuery__
 *
 * To run a query within a React component, call `useApartmentsByQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useApartmentsByQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApartmentsByQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApartmentsByQueryQuery(baseOptions: Apollo.QueryHookOptions<ApartmentsByQueryQuery, ApartmentsByQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ApartmentsByQueryQuery, ApartmentsByQueryQueryVariables>(ApartmentsByQueryDocument, options);
      }
export function useApartmentsByQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApartmentsByQueryQuery, ApartmentsByQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ApartmentsByQueryQuery, ApartmentsByQueryQueryVariables>(ApartmentsByQueryDocument, options);
        }
export type ApartmentsByQueryQueryHookResult = ReturnType<typeof useApartmentsByQueryQuery>;
export type ApartmentsByQueryLazyQueryHookResult = ReturnType<typeof useApartmentsByQueryLazyQuery>;
export type ApartmentsByQueryQueryResult = Apollo.QueryResult<ApartmentsByQueryQuery, ApartmentsByQueryQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    ...UserFields
    role
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UsersByQueryDocument = gql`
    query usersByQuery($input: UsersQueryInput!) {
  usersByQuery(input: $input) {
    total
    items {
      id
      email
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useUsersByQueryQuery__
 *
 * To run a query within a React component, call `useUsersByQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersByQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersByQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUsersByQueryQuery(baseOptions: Apollo.QueryHookOptions<UsersByQueryQuery, UsersByQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersByQueryQuery, UsersByQueryQueryVariables>(UsersByQueryDocument, options);
      }
export function useUsersByQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersByQueryQuery, UsersByQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersByQueryQuery, UsersByQueryQueryVariables>(UsersByQueryDocument, options);
        }
export type UsersByQueryQueryHookResult = ReturnType<typeof useUsersByQueryQuery>;
export type UsersByQueryLazyQueryHookResult = ReturnType<typeof useUsersByQueryLazyQuery>;
export type UsersByQueryQueryResult = Apollo.QueryResult<UsersByQueryQuery, UsersByQueryQueryVariables>;