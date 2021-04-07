## JWT Authentication service

A simple NodeJS app to generate JWT after logging a user in and saving their account info on Supabase. This project is still a WIP and more will be added later. [View this doc for more info](./docs/ROADMAP.md)

## Creating a secret access token

Access the `node` repl environment then generate the token with Crypto.

```javascript
> require('crypto').randomBytes(64).toString('hex')
<your_secret_token_here>
```

Then paste them to `.env` file

```bash
ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
```

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

- [Logging in to obtain access token](./docs/LOGIN.md)
- [GET posts after login](./docs/GET_posts.md)
