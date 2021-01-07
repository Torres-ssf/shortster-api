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

1. Create Shortster

```sh
/shortster
```

- Body Params
```sh
url: (required) URL from the desired webpage.
code: (optional) Custom code for the desired shortster.
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

4. Set up databases
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
