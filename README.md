# Web and mobile app for renting apartments

This is pet project implemented using React, Nest JS, GraphQL, SQL. There is a plan to create a mobile version using React Native.

## Setup

## Local development

Install dependencies

```ssh
yarn
```

#### Create .env file in both *client* and *server*

*Client*:

```ssh
REACT_APP_API_URL=http://localhost:3000/graphql
REACT_APP_GOOGLE_MAP_API_KEY=
```

*Server*:

```ssh
DB_USERNAME=
DB_PASSWORD=

JWT_SECRET=
UNSPLASH_ACCESS_KEY=
UNSPLASH_SECRET_KEY=

GOOGLE_MAP_API_KEY=
```

#### Build

Build server

```ssh
yarn build:server
```

Run Docker

```ssh
yarn docker:start
```

Run database migrations (needed only for first running or if entities have been changed)

```ssh
yarn db:migrate
```

#### Start application

Run server and client separately

```ssh
yarn start:client
yarn start:server
```

or run both at the same time

```ssh
yarn start
```

Seed data for testing (needed only for first running)

```ssh
yarn db:seed
```

### GraphQL

During development you might want to change your *schema.graphql* file to apply implented queries and mutations. To fetch the latest changes from that schema file to client simply run

```ssh
yarn gql:generate
```

This command will fetch all Typescript types that needed for development and also will generate hooks for GraphQL queries and mutations

### Linting

To run eslint do

```ssh
yarn lint
```

This command will fix possible lint issue and will create a report with errors and warning that were found.
