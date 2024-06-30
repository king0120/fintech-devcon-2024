### Fintech Devcon 2024 Server Components Workshop

This is a workshop for the Fintech Devcon 2024 conference. The workshop will cover the basics of server components
and how to utilize them in the latest version of Next.js.

## Prerequisites
This application was initiated using pnpm. If you do not have pnpm installed, you can install it by running the following command:

```bash
npm install -g pnpm
```

Alternatively, you can use npm or yarn to install the dependencies.

## Installation
To install the dependencies, run the following command:

```bash
pnpm install
```

This repository also includes a basic database using sqlite and drizzle-orm for the ORM. To create the database and seed it with data, run the following command:

```bash
pnpm drizzle:init
```

## Branches
In order to provide checkpoints along the way, this repository is broken up into branches. The branches are as follows:
- main: The starting point for the workshop
- complete: The final version of the application

## Other Tools and Libraries
While this workshop does not cover these tools, the following tools and libraries are used in this application:
- Tailwind CSS
- Drizzle ORM
- SQLite
- nivo graphs
- TypeScript