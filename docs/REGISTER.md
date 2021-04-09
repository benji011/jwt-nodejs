# Register user

1. Using POSTMAN, Set the header `Content-type` to `application/json`

2. Access `http://localhost:4000/register` via `POST`

## Sample request

```json
{
  "username": "testuser1",
  "firstname": "test",
  "lastname": "user",
  "email": "testuser@example.com",
  "password": "yourpassword"
}
```

## Sample response

```bash
{
  Created
}
```

※ Take note the port number here. The API server runs on **port 4000**
