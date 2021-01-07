[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->

<br />
<p align="center">

  <img src="logo.png" alt="Logo" width="269" height="98">

  <h3 align="center">Shortster API</h3>

  <p align="center">
   An API that creates codes to shorten URL links.
    <br />
    <a href="https://github.com/Torres-ssf/shortster-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/Torres-ssf/shortster-api/issues">Request Feature</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is a RESTful API with the functionality to create URL Shortsters, a short code to replace URL long links.

### Built With

The project was built using the following languages stacks:

```sh
Back-End(server)
```

- Node
- Typescript
- [Express](https://www.npmjs.com/package/expresshttps://www.npmjs.com/package/express)
- [TypeORM](https://www.npmjs.com/package/typeorm)
- [PostgreSQL](https://www.npmjs.com/package/pg)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [TSyringe](https://www.npmjs.com/package/tsyringe)
- [class-transformer](https://www.npmjs.com/package/class-transformer)
- [date-fns](https://www.npmjs.com/package/date-fns)
- [node-rate-limiter-flexible](https://www.npmjs.com/package/rate-limiter-flexible)
- [uuid](https://www.npmjs.com/package/uuid)

```sh
Testing Frameworks
```

- [Jest](https://www.npmjs.com/package/jest)

## Routes

1. `POST` Create Shortster

```sh
/shortster
```

- Description

  - Creates a new Shortster object into the system. This route does not requires authentication, but verifies if a JSON web token was provided within the request header. If a token is found, then it will try to extract the user ID from it and assign it to the Shortster object. If no token is found the Shortster will be created with a null value for the `user_id` property. A JSON web token can be created using the create session route.

- Body Params

  - ```JS
    {
      "url": "https://www.google.com",   //required
      "code": "myCustomCode99"   //optional: The user can pick a desired shortster code.
    }
    ```

- Header
  - ```JS
    {
      "authorization": "Bearer ${token_value}",   //required
    }
    ```


- Response Object Example
  - ```JS
    {
      "id": "25063285-6e4d-4256-b512-d6401ab3e863",
      "code": "2ziejQ",
      "url": "https://google.com",
      "last_access": "2021-01-07T00:02:17.564Z",
      "times_accessed": 9,
      "user_id": null,
      "created_at": "2021-01-06T23:39:22.374Z",
      "updated_at": "2021-01-07T03:02:17.566Z"
    }
    ```

2. `Get` Shortster

```sh
/shortster/:code
```

- Description

  - Route to access Shortster URL. The system will return an object containing the URL and all    information related to the given Shortster code.

- Route Params

  - ```sh
    code: Shortster code.
    ```

- Response Object Example

  - ```JS
    {
      "id": "25063285-6e4d-4256-b512-d6401ab3e863",
      "code": "2ziejQ",
      "url": "https://google.com",
      "last_access": "2021-01-07T00:02:17.564Z",
      "times_accessed": 9,
      "user_id": null,
      "created_at": "2021-01-06T23:39:22.374Z",
      "updated_at": "2021-01-07T03:02:17.566Z"
    }
    ```


3. `Get` Shortster Stats

```sh
/shortster/:code/stats
```

- Description

  - Route to access Shortster stats. The response it's an object with relevant information about the Shortster like, the URL, how many times it was used, and also friendly formatted dates like, when it was created, and when it was last used.

- Route Params

  - ```sh
    code: Shortster code.
    ```

- Response Object Example

  - ```JS
    {
      "url": "https://google.com",
      "created_at": "January 6th, 2021 at 8:39:22 PM GMT-3",
      "last_access": "January 6th, 2021 at 9:02:17 PM GMT-3",
      "times_accessed": 9
    }
    ```

4. `Post` Create User

```sh
/users
```

- Description

  - Creates a new User into to the system. The response is an object containing all information related to the newly created User.

- Body Params

  - ```JS
    {
      "name": "Sergio Torres",   //required
      "email": "sergio@email.com",   //required
      "password": ".Zxc3518"   //required
    }
    ```

- Response Object Example
  - ```JS
    {
      "id": "9f050eae-720f-4edd-a609-c4c42e12e34f",
      "name": "Sergio Torres",
      "email": "sergio@email.com",
      "created_at": "2021-01-06T23:39:44.480Z",
      "updated_at": "2021-01-06T23:39:44.480Z"
    }
    ```

5. `Post` Create Session

```sh
/session
```

- Description

  - Creates a new Session into to the system. The response is an object containing all information about the user and a JSON web token. The token is going to be used to verify user authentication on routes that require authentication. Right now, no routes within the app requires authentication. This was implemented to be used in features that are going to be implemented in the future, like updating User information, get all created shortsters by an user, try to change a shortster code and so on.

- Body Params

  - ```JS
    {
      "email": "sergio@email.com",   //required
      "password": ".Zxc3518"   //required
    }
    ```

- Response Object Example
  - ```JS
    {
      "user": {
        "id": "9f050eae-720f-4edd-a609-c4c42e12e34f",
        "name": "Sergio Torres",
        "email": "sergio@email.com",
        "created_at": "2021-01-06T23:39:44.480Z",
        "updated_at": "2021-01-06T23:39:44.480Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTAwMjg0NDUsImV4cCI6MTYxMDAzMjA0NSwic3ViIjoiOWYwNTBlYWUtNzIwZi00ZWRkLWE2MDktYzRjNDJlMTJlMzRmIn0.IOPVfrHmoFOa96S7R61LmODwW8KB-sONHB5-fhbT3Io"
    }
    ```

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- Node
- NPM
- PostgreSQL

### Installation

1. Clone the repo

```sh
git clone https://github.com/Torres-ssf/shortster-api
```

2. CD into the project root directory

```sh
cd shortster-api/
```

3. Install npm packages

```sh
yarn
```

4. Set up databases:

  This project uses `Postgres`.

  You will need to have it running into your system:
  - Make a copy of the `ormconfig.example.json` file and rename it to ```ormconfig.json```.
  - Assign values according with the postgres configuration in your system.

  - Setting up PostgreSQL
    ```json
    "port": 5432,
    "username": "postgres username",
    "password": "postgres password",
    "database": "database name",
    ```
    - Assign the port number that was configured in your system to the `port` object (default is `5432`).
    - Assign your postgres username to the `username` object.
    - Assign your postgres password to the `password` object.
    - Create a new postgres database and assign the name to the `database` object.

5. Run migrate command to create all migrations.
```
yarn typeorm migration:run
```

6. This applications uses `jsonwebtokenNow` to grant an access token to logged users.
  - You will need to provide a MD5 hash from an encoded string from your choice. You can generate the hash [here](https://www.md5hashgenerator.com/).
  - With the hash in hands, we are ready to setup the environment variables. Make a copy of the `.env.example` to and rename it `.env`.
  - Assign your generated hash to the variable
  ```
  APP_SECRET=generatedMD5HashHere
  ```

### Usage

App Scripts:

```
yarn dev:server
```

- Script for development stage. If all the installation section was properly made, an output message will appear at the terminal: `Server started on port 3333!`

```
yarn build
```

- Script for productions stage.

```
yarn typeorm
```

- Script design to do typeorm task, like creating and revert migrations.

### Run tests

```
yarn test
```

## Authors

👤 **Torres-ssf**

- Github: [@Torres-ssf](https://github.com/Torres-ssf)
- Twitter: [@torres_ssf](https://twitter.com/torres_ssf)
- Linkedin: [torres-ssf](https://www.linkedin.com/in/torres-ssf/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](https://github.com/Torres-ssf/shortster-api/issues).

## Show your support

Give a ⭐️ if you like this project!

## 📝 License

This project is [MIT](lic.url) licensed.

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/Torres-ssf/shortster-api.svg?style=flat-square
[contributors-url]: https://github.com/Torres-ssf/shortster-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Torres-ssf/shortster-api.svg?style=flat-square
[forks-url]: https://github.com/Torres-ssf/shortster-api/network/members
[stars-shield]: https://img.shields.io/github/stars/Torres-ssf/shortster-api.svg?style=flat-square
[stars-url]: https://github.com/Torres-ssf/shortster-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/Torres-ssf/shortster-api.svg?style=flat-square
[issues-url]: https://github.com/Torres-ssf/shortster-api/issues
