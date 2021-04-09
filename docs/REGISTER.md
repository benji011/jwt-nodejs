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

## Sample response (for new users)

```json
{
  "message": "testuser2 created!",
  "status": 201
}
```

An email will then be sent to the (currently assign) test user email with an activation URL. This URL, when clicked, will activate the user for them to being able to login.

[Read about logging in here](../docs/LOGIN.md)

※ Take note the port number here. The API server runs on **port 4000**

## Sample response (for existing users)

```json
{
  "error": "A user with the email address \"testuser2@example.com\" already exists."
}
```
