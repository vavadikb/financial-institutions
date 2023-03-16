### Laba.Solvd Nodejs Course

## Contents

- [Laba Personal Project](#laba-personal-project)
  - [Laba.Solvd Nodejs Course](#labasolvd-nodejs-course)
  - [Table of contents](#table-of-contents)
  - [About](#about)
  - [Assignment](#assignment)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
  - [Usage](#usage)
    - [Using Docker](#using-docker)
    - [Using `npm start`](#using-npm-start)
- [Hedge Fund API Documentation](#Hedge-Fund-api-documentation)
  - [Base URL](#base-url)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)
    - [Autorization](#general-responses)
      - [`/login`](#record-foundupdated)
      - [`/registration`](#requesting-many-records)
    - [Users](#users)
      - [`GET /users`](#get-users)
      - [`GET /users/:id`](#get-users)
      - [`GET /users/:id/orders/:id`](#get-orders)
      - [`POST /users`](#post-employees)
      - [`POST /users/:id/orders`](#post-orders)
      - [`PUT /users/:id`](#put-employeesid)
      - [`PUT /users/:id/orders/:id`](#put-orders)
      - [`PATCH /users/:id/orders/:id`](#patch-orders)
      - [`PATCH /users/:id`](#patch-users)
      - [`DELETE /users/:id`](#delete-users)
      - [`DELETE /users/:id/orders/:id`](#delete-orders)
    - [Offers](#offers)
      - [`GET /offers`](#get-offers)
      - [`GET /offers/:id`](#get-offerid)
      - [`POST /offers`](#post-offers)
      - [`PUT /offers/:id`](#put-offersid)
      - [`PATCH /offers/:id`](#patch-offersid)
      - [`DELETE /offers/:id`](#delete-offersid)

## About

# Hedge fund API Documentation

This API provides information about offers and users of this fund

## Base URL

`http://localhost:3000`

## Endpoints

## Autorization

# /login

Log in user account

- Verbs applied: `POST`

- status code: 201

- Request

  ```
  {
    "login": "login",
    "password": "password"
  }
  ```

- Response
  ```
  {
    "status": 201,
    "data": {
      "id":1,
      "login": "login"
      // other details
    }
  }
  ```
- Errors:
  if user not found
  ```
  {
    "status": 404,
    "data": "Not-found user"
  }
  ```
  if request not correct
  ```
  {
    "status": 400,
    "data": "bad request"
  }
  ```

# /registration

Create new user

- Verbs applied: `POST`

- status code: 201

- Request

  ```
  {
    "login": "newUser",
    "password": "password"
  }
  ```

- Response
  ```
  {
    "status": 201,
    "data": {
      "id":2,
      "login": "newUser"
      // other details
    }
  }
  ```
- Errors:
  if user already registrated
  ```
  {
    "status": 400,
    "data": "already exist"
  }
  ```

### Users

#### `GET /users`

Retrieves a list of all users

- Query Parameters

  None

- Response

  ```
  {
    "status": 200,
    "data": [
      {
        "id": 1,
        "login": "John",
        "orders": [{
            {
                "id": 3,
                "risks": "high",
                "income per year": 20-30%,
                "assets": [ "investing in startups"],
                "status": "active"
            },
            inital-payment:1000$,
            amount-of-money:1200$,
            earned:[20%,200$],
            term: "1 year"
        },
            {
            {
                "id": 3,
                "risks": "high",
                "income per year": 20-30%,
                "assets": ["cryptocurrencies"],
                "status": "active"
            },
            inital-payment:2000$,
            amount-of-money:2400$,
            earned:[40%,800$],
            term: "2 year"
            }
          }]
      },
      {
        "id": 2,
        "name": "Jane",
        "orders":[{
            {
                "id": 3,
                "risks": "high",
                "income per year": 20-30%,
                "assets": [ "investing in startups"],
                "status": "active"
            },
            inital-payment:1000$,
            amount-of-money:1200$,
            earned:[20%,200$],
            term: "1 year"
        },
            {
            {
                "id": 3,
                "risks": "high",
                "income per year": 20-30%,
                "assets": ["cryptocurrencies"],
                "status": "active"
            },
            inital-payment:2000$,
            amount-of-money:2400$,
            earned:[40%,800$],
            term: "2 year"
            }
          }]
      }
    ]
  }
  ```

#### `GET /users/:id`

get a user by id

- Query Parameters

  | Parameter | Type   | Required | Description |
  | --------- | ------ | -------- | ----------- |
  | `id`      | number | Yes      | The user id |

- Response

  ```
  {
    "status": 200,
    "data": {
      "id": 1,
      "name": "John Doe",
      "orders": [{
            {
                "id": 3,
                "risks": "high",
                "income per year": 20-30%,
                "assets": [ "investing in startups"],
                "status": "active"
            },
            inital-payment:1000$,
            amount-of-money:1200$,
            earned:[20%,200$],
            term: "1 year"
        },
            {
            {
                "id": 3,
                "risks": "high",
                "income per year": 20-30%,
                "assets": ["cryptocurrencies"],
                "status": "active"
            },
            inital-payment:2000$,
            amount-of-money:2400$,
            earned:[40%,800$],
            term: "2 year"
            }
          }]
    }
  }
  ```

#### `GET /users/:id/orders`

- Query Parameters

  | Parameter | Type   | Required | Description |
  | --------- | ------ | -------- | ----------- |
  | `id`      | number | Yes      | The user ID |

- Response

  ```
  {
    "status": 200,
      "orders": [{
            {
                "id": 3,
                "risks": "high",
                "income per year": 20-30%,
                "assets": [ "investing in startups"],
                "status": "active"
            },
            inital-payment:1000$,
            amount-of-money:1200$,
            earned:[20%,200$],
            term: "1 year"
        },
            {
            {
                "id": 3,
                "risks": "high",
                "income per year": 20-30%,
                "assets": ["cryptocurrencies"],
                "status": "active"
            },
            inital-payment:2000$,
            amount-of-money:2400$,
            earned:[40%,800$],
            term: "2 year"
            }
          }]
  }
  ```

#### `GET /users/:id/orders/:id`

- Query Parameters

  | Parameter | Type   | Required | Description  |
  | --------- | ------ | -------- | ------------ |
  | `id`      | number | Yes      | The user ID  |
  | `id`      | number | Yes      | The order ID |

- Response

  ```
  {
    "status": 200,
            {
                "id": 3,
                "risks": "high",
                "income per year": 20-30%,
                "assets": [ "investing in startups"],
                "status": "active"
            },
            inital-payment:1000$,
            amount-of-money:1200$,
            earned:[20%,200$],
            term: "1 year"
        }
  }
  ```

#### `POST /users`

Creates a new user

- Request Body

  ```
  {
    "login": "user2",
    "password": "password",
  }
  ```

- Response

  ```
  {
    "status": 201,
    "data": {
      "id": 2,
      "login": "user2",
      "password": "hashed password"
      "orders":{}
    }
  }
  ```

### `POST /users/:id/orders`

- Query Parameters

  | Parameter | Type   | Required | Description |
  | --------- | ------ | -------- | ----------- |
  | `id`      | number | Yes      | The user id |

- Requset Body

```
{
    offer-id: 3,
    inital-payment:1000$,
    amount-of-money:1200$,
    earned:[20%,200$],
    term: "1 year"
}
```

- Response

```
{
  "status": 201,
          {
              "id": 3,
              "risks": "high",
              "income per year": 20-30%,
              "assets": [ "investing in startups"],
              "status": "active"
          },
          inital-payment:1000$,
          amount-of-money:1200$,
          earned:[20%,200$],
          term: "1 year"
      }
}
```

#### `PUT /users/:id`

Update data about user by id

- Query Parameters

  | Parameter | Type   | Required | Description |
  | --------- | ------ | -------- | ----------- |
  | `id`      | number | Yes      | The user id |

- Request Body

  ```
  {
    "id": 2,
    "name": "user1"
  }
  ```

- Response

  ```
  {
    "status": 201,
    "data": {
      "id": 2,
      "name": "user1",
      "password": "hashed password"
      oreders:{}
    }
  }
  ```

#### `PUT /users/:id/orders/:id`

Update data about user orders

- Query parameters

  | Parameter | Type   | Required | Description  |
  | --------- | ------ | -------- | ------------ |
  | `id`      | number | Yes      | The user ID  |
  | `id`      | number | Yes      | The order ID |

- Request body

```
{
    inital-payment:2000$,
    amount-of-money:2400$,
    earned:[20%,400$],
    term:"2 years"
}
```

- Response

```
{
    {
  "status": 201,
          {
              "id": 3,
              "risks": "high",
              "income per year": 20-30%,
              "assets": [ "investing in startups"],
              "status": "active"
          },
        inital-payment:2000$,
        amount-of-money:2400$,
        earned:[20%,400$],
        term:"2 years"
      }
}
}
```

#### `PATCH /users/:id`

Update fields of an users by ID

- Query Parameters

  | Parameter | Type   | Required | Description |
  | --------- | ------ | -------- | ----------- |
  | `id`      | number | Yes      | The user ID |

- Request Body

  ```
  {
    "password": "new password",
  }
  ```

- Response

  ```
  {
    "status": 204,
    "data": {
      "id": 3,
      "name": "user1",
      "position": "new hashed password"
      "orders":{}
    }
  }
  ```

#### `PATCH /users/:id/orders/:id`

Update fields in user order by id

- Query parameters

| Parameter | Type   | Required | Description  |
| --------- | ------ | -------- | ------------ |
| `id`      | number | Yes      | The user ID  |
| `id`      | number | Yes      | The order ID |

- Request body

```
{
    inital-payment:2000$,
    amount-of-money:2400$,
    earned:[20%,400$],
    term:"2 years"
}
```

- Response

```
{
    {
  "status": 204,
          {
              "id": 3,
              "risks": "high",
              "income per year": 20-30%,
              "assets": [ "investing in startups"],
              "status": "active"
          },
        inital-payment:2000$,
        amount-of-money:2400$,
        earned:[20%,400$],
        term:"2 years"
      }
}
}
```

#### `DELETE /users/:id`

Deletes an user by ID

- Query Parameters

  | Parameter | Type   | Required | Description |
  | --------- | ------ | -------- | ----------- |
  | `id`      | number | Yes      | The user ID |

- Response

  ```
  {
    "status": 202,
    "data": {
      "id": 3,
      "name": "Bob",
      "password": "hashed password",
      orders:{}
    }
  }
  ```

### `DELETE /users/:id/orders/:id`

Delete user order by id

- Query Parameters

  | Parameter | Type   | Required | Description  |
  | --------- | ------ | -------- | ------------ |
  | `id`      | number | Yes      | The user ID  |
  | `id`      | number | Yes      | The order ID |

- Response

```
{
       "status": 202,
          {
              "id": 3,
              "risks": "high",
              "income per year": 20-30%,
              "assets": [ "investing in startups"],
              "status": "active"
          },
        inital-payment:2000$,
        amount-of-money:2400$,
        earned:[20%,400$],
        term:"2 years"
}
```

---

### Offers

Offer discribe how % can you earn if you choose it

#### `GET /offers`

Show all offers

- Query Parameters

  None

- Response

  ```
  {
    "status": 200,
    "data": [
      {
        "id": 1,
        "risks": "low",
        "income per year": 8%,
        "assets": ["real estate", "stocks of large companies"],
        "status": "active"
      },
      {
        "id": 2,
        "risks": "middle",
        "income per year": 14-16%,
        "assets": ["options from the profits of large companies", "stocks of technology companies"],
        "status": "active"
      },
      {
        "id": 3,
        "risks": "high",
        "income per year": 20-30%,
        "assets": ["cryptocurrencies", "investing in startups"],
        "status": "active"
      }
    ]
  }
  ```

#### `GET /offers/:id`

Write a specific offer by ID.

- Query Parameters

  | Parameter | Type   | Required | Description   |
  | --------- | ------ | -------- | ------------- |
  | `id`      | number | Yes      | The offer ID. |

- Response

  ```
  {
    "status": 200,
    "data": {
      {
        "id": 3,
        "risks": "high",
        "income per year": 20-30%,
        "assets": ["cryptocurrencies", "investing in startups"],
        "status": "active"
      }
    }
  }
  ```

#### `POST /offers`

Creates a new offer.

- Request Body

  ```
    {
    "risks": "high",
    "income per year": 20-30%,
    "assets": ["cryptocurrencies", "investing in startups"],
    "status": "active"
  }
  ```

- Response

  ```
  {
    "status": 201,
    "data": {
        "id": 3,
        "risks": "high",
        "income per year": 20-30%,
        "assets": ["cryptocurrencies", "investing in startups"],
        "status": "active"
      }
  }
  ```

#### `PUT /offers/:id`

Replace a specific offer by ID.

- Query Parameters

  | Parameter | Type   | Required | Description   |
  | --------- | ------ | -------- | ------------- |
  | `id`      | number | Yes      | The offer ID. |

- Request Body

```
{
   "risks": "high",
   "income per year": 20-30%,
   "assets": ["cryptocurrencies", "investing in startups"],
   "status": "active"
 }
```

- Response

```
  {
    "success": true,
    "data":  {
        "id": 3,
        "risks": "high",
        "income per year": 20-30%,
        "assets": ["cryptocurrencies", "investing in startups"],
        "status": "active"
      }
  }
```

#### `PATCH /offers/:id`

Update one or more fields of an offers by ID.

- Query Parameters

  | Parameter | Type   | Required | Description   |
  | --------- | ------ | -------- | ------------- |
  | `id`      | number | Yes      | The offer ID. |

- Request Body

```
  {
    "risks": "low"
  }
```

- Response

```
 {
   "status": 200,
   "data": {
{
   "id": 3,
   "risks": "low",
   "income per year": 20-30%,
   "assets": ["cryptocurrencies", "investing in startups"],
   "status": "active"
 }
 }
```

#### `DELETE /offers/:id`

Deletes an offers by ID.

- Query Parameters

  | Parameter | Type   | Required | Description   |
  | --------- | ------ | -------- | ------------- |
  | `id`      | number | Yes      | The offer ID. |

- Response

  ```
  {
    "status": 204,
    "data": {
    "id": 3,
    "risks": "low",
    "income per year": 20-30%,
    "assets": ["cryptocurrencies", "investing in startups"],
    "status": "active"
  }
  }
  ```

---
