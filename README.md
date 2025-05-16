# GuildKit

A CMS for job search services

> [!CAUTION]
> Currently WIP. Do not use in production.

## Development

### Prerequisites

- [mise](https://mise.jdx.dev/getting-started.html)
- Postgres dependencies
  - On Ubuntu and its derivatives, run the following command to install the packages: `sudo apt install "linux-headers-$(uname -r)" build-essential libssl-dev libreadline-dev zlib1g-dev libcurl4-openssl-dev uuid-dev icu-devtools libicu-dev libbison-dev flex`

### Run local server

```sh
cd /path/to/guildkit
cp ./.env.example ./.env
pnpm install
```

Then run `pnpm dev` to run GuildKit on your local machine.

### Wording conventions

- organization: The organization (i.e. company in most cases) to hire the candidate(s).
- recruiter: The recruitment staff (user) who belongs to the organization(s).
- employer: Only use this term if you want to express both the organization or its recruitment staff(s).

## Credit

Copyright (c) 2025-present Jumpei Ogawa and the contributors

This project includes source code derived from:

- [JOB PORTAL](https://github.com/irakozetony/jobportal) by [**@irakozetony**](https://github.com/irakozetony)
  - License: [MIT](https://github.com/irakozetony/jobportal/blob/69f5478cb18c97e5a703dfc2235e2b9c900f40c0/LICENSE)
  - Hash of the HEAD at the time of fork: [69f5478](https://github.com/irakozetony/jobportal/commit/69f5478cb18c97e5a703dfc2235e2b9c900f40c0)

This project includes thirdparty assets listed in [CREDITS.md](./static/vendor/CREDITS.md)

## License

[A proprietary license](./LICENSE.md), but it allows self host and redistributing under some limitations.
