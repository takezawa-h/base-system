# 実装履歴


## nxワークスペースの作成
```bash
% npx create-nx-workspace
npx: 227個のパッケージを5.825秒でインストールしました。
? Workspace name (e.g., org name)     base-system
? What to create in the new workspace angular-nest      [a workspace with a full stack application (Angular + Nest)]
? Application name                    web
? Default stylesheet format           SASS(.scss)  [ http://sass-lang.com   ]
? Default linter                      ESLint [ Modern linting tool ]
? Use Nx Cloud? (It's free and doesn't require registration.) No
Creating a sandbox with Nx...
```

## Nestjs:jwtを使った認証

参考:[Authentication](https://docs.nestjs.com/security/authentication)

```bash
% npm i --save @nestjs/passport passport passport-local @nestjs/jwt passport-jwt
% npm i --save-dev @types/passport-local @types/passport-jwt
```

```bash
$ npx nx g @nrwl/nest:module auth --project=api
$ npx nx g @nrwl/nest:service auth --project=api
$ npx nx g @nrwl/nest:module users --project=api
$ npx nx g @nrwl/nest:service users --project=api
$ npx nx g @nrwl/nest:class LocalStrategy --directory=auth/strategy --flat=true --project=api
$ npx nx g @nrwl/nest:guard LocalAuth --directory=auth/guard --flat=true --project=api
$ npx nx g @nrwl/nest:class JwtStrategy --directory=auth/strategy --flat=true --project=api
$ npx nx g @nrwl/nest:guard JwtAuth --directory=auth/guard --flat=true --project=api
```

```bash
$ # GET /profile
$ curl http://localhost:3333/api/profile
$ # result -> {"statusCode":401,"error":"Unauthorized"}

$ # POST /auth/login
$ curl -X POST http://localhost:3333/api/auth/login -d '{"username": "Takezawa", "password": "p@ssw0rd"}' -H "Content-Type: application/json"
$ # result -> {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTYxNjQyMjYwNSwiZXhwIjoxNjE2NDIyNjY1fQ.7okEfE78nQG4HJ5Xh4uJL4ERVrh_NBk0Ywzsu47mpU4"}%

$ # GET /profile using access_token returned from previous step as bearer code
$ curl http://localhost:3333/api/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRha2V6YXdhIiwic3ViIjoxLCJpYXQiOjE2MTY0MjI5MDQsImV4cCI6MTYxNjQyMjk2NH0.WgcVR5mZH8qvDeI7Z4CJBY5atm05Db4vLTLukxVFH5s"
$ # result -> {"userId":1,"username":"Takezawa"}%
```

