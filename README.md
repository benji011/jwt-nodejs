## JWT Authentication service

A simple NodeJS app to generate JWT after logging a user in and saving their account info on Supabase. This project is still a WIP and more will be added later. [View this doc for more info](./docs/ROADMAP.md)

## Brief description on the file structure

The current structure is separated into 2 services as shown below in the `src/` directory.

```bash
./src
├── api
│   └── server.js
├── auth
│   └── server.js
├── data
│   └── samplePosts.js
└── middleware
    └── authentication.js
```

| src/api/server.js                                      | src/auth/server.js                                             |
| ------------------------------------------------------ | -------------------------------------------------------------- |
| Handles the API endpoints for stuff like GET resources | Handles authentication & distributing access & refresh tokens. |

For this app to work you need to run 2 separate servers as described below

## Running the app

1. Install dependencies

```bash
cd jwt-node
yarn
```

2. In 1 window run the authentication server

```bash
yarn start:auth
```

3. In another window, run the API server

```bash
yarn start:api
```

## Sample API endpoints

- [POST register user account](./docs/REGISTER.md)
- [GET activate user account](./docs/CONFIRMATION.md)
- [GET Logging in to obtain access token](./docs/LOGIN.md)
- [GET posts after login](./docs/POSTS.md)
