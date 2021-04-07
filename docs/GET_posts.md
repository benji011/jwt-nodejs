# Get posts

1. Using POSTMAN, Set the `Authorization` type to `Bearer Token`

2. Set the Token to the access token obtained after logging in. [Read here to learn more](./LOGIN.md)

3. Access `http://localhost:3000/posts` via `GET`

## Sample response

```bash
[
    {
        "username": "Ben",
        "title": "Title 1"
    }
]
```

※ Take note the port number here. The API server runs on **port 3000**
