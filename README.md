# nebulayoon-domain

개인 도메인을 연결하여, 새로운 기술, 공부하고 싶었던 기술, 적용하고 싶었던 서비스 등 역량 발전을 위해서 진행하는 프로젝트입니다.

# Architecture

![mydomain 아키텍처2](https://github.com/nebulayoon/nebulayoon-domain/assets/88534125/03c417bd-af49-4a3f-9c65-7ff4dfea640d)

### Goal

![mydomain 목표](https://github.com/nebulayoon/nebulayoon-domain/assets/88534125/4abf8810-79ff-4005-be72-c87291460733)


# Environments

## backend

```
POSTGRES_DB_HOST=[postgresql db host]
REDIS_HOST=[redis host]
EMAIL_USER=[google email]
EMAIL_PASS=[google email password]
TOKEN_SECRET=[token secret]
API_SERVER_URL=[api-server의 주소]
```

```
# backend directory에는 secret 폴더가 존재해야 하여, 아래의 명을 가진 인증서가 필요하다.
cert-request.csr
cert.pem
private-key.pem
```

## frontend

```
NEXT_PUBLIC_API_URL=[api-server의 url과 api version을 표시]
```

# Installation

monorepo 구성을 진행하였으나, github commit log등 가시적인 관리를 위하여 backend와 frontend 분리하였다.

```bash
# backend
$ cd ./backend
$ npm install

# frontend
$ cd ./frontend
$ npm install
```

# Running the app with docker

## backend

```bash
$ cd ./backend
$ docker compose up --build
```

## frontend

```bash
$ docker compose up --build
```

# Test

```bash
# just backend
$ npm nx api-server
```
