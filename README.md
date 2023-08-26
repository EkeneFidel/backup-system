# Backup-system
an API that serves as a cloud backup system

[backup system live server](https://backup-system-ekene.onrender.com/) <br><br>
[API documentation](https://documenter.getpostman.com/view/16637530/2s9Y5YRhag) <br><br>

## Features Implemented
  - Users can create an account with:
      - email address
      - password
      - full name
  - Users can upload files up to 200MB
  - Users can download uploaded files
  - Users can create folders to hold files
  - An admin user type for managing the content uploaded
  - Admins can mark pictures and videos as unsafe
  - Unsafe files automatically get deleted

## Tools/Stack
  - NodeJs (TypeScript & Express)
  - Postgres
  - Redis
  - Docker
  - Postman
  - AWS S3

## Getting started

1. Clone the repository

```console
git clone https://github.com/EkeneFidel/backup-system.git
```

2. Install the dependencies

```console
yarn install
```

3. Copy `example.env` file in your `.env` file and fill with your details

```console
yarn run dev
```

4. Run the application

```console
yarn run dev
```
