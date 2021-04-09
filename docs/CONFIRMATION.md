# Confirming/activate user account

1. Using POSTMAN, set your `token` and `uuid` like below:

```
| Key   | Value          |
| ----- | -------------- |
| token | yourtokenvalue |
| uuid  | some-uuid      |
```

2. Access `http://localhost:4000` via `GET`

## Sample response (if user is new and hasn't been activated)

```bash
{
    "message": "Account activated",
    "user": "some-uuid"
}
```

## Sample response (if user exists)

```bash
{
    "message": "some-uuid has already been activated! No action required :)"
}
```

※ Take note the port number here. The API server runs on **port 4000**
