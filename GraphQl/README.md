# GraphQL Backend

A simple GraphQL server with a `signup` mutation.

## Install

```bash
cd GraphQl
npm install
```

## Run

```bash
npm start
```

The server will be available at `http://localhost:4000`.

## GraphQL API

### Mutation: signup

```graphql
mutation Signup($input: SignupInput!) {
  signup(input: $input) {
    success
    message
    user {
      id
      name
      email
    }
  }
}
```

### SignupInput

```graphql
input SignupInput {
  name: String!
  email: String!
  password: String!
}
```

### Example Variables

```json
{
  "input": {
    "name": "Vikas",
    "email": "vikas@example.com",
    "password": "securePassword123"
  }
}
```
