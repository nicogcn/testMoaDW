# Test backend developer MoaDW

Using mongoose and express make an API to get expended in hats and recommended hats per user.

## Run

Install project dependencies
```bash
npm install
```

Start application
```bash
npm start
```

## Endpoints

### Expended in hats

```http
http://localhost:3000/users/expended-in-hats
```

Return a JSON object like this:

```JSON
{
  "users": [{
    "email": "user@some.com",
    "expended": $$$$
  }]
}
```

By default it returns the first page, to obtain a especific page use a parameter

```http
http://localhost:3000/users/expended-in-hats?page=3
```

#### Filter by expended range

To get a especific range of expended in hats, use a "range" parameter

```http
http://localhost:3000/users/expended-in-hats?range=1000,2000
```

Can be used with "page" parameter

```http
http://localhost:3000/users/expended-in-hats?page=2&range=1000,2000
```

### Recommended hats

```http
http://localhost:3000/users/recommended-hats
```

Returns a table per user of recommended hats, it acepts a "page" parameter in the same way that expended in hats

```http
http://localhost:3000/users/recommended-hats?page=2
```
