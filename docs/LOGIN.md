# Login

1. Using POSTMAN, Set the `Content-type` header to `application/json`

2. Access `http://localhost:4000/login` via `POST` setting `username` as either of the sample data

## Sample POST request

```bash
{
  "email": "testuser@example.com",
  "password": "testusers_password"
}
```

## Response

```bash
{
    "accessToken": "your_access_token",
    "refreshToken": "your_refresh_token"
}
```

After obtaining the access token you can now consume the API. [Read this doc for sample usage](./GET_posts.md)

※ Take note the port number here. The authentication server runs on **port 4000**
