# amoCRM API

## [pubic API](https://www.amocrm.ru/developers/content/crm_platform/api-reference)

### *headers*

```ts
{
    "Authorization": `Bearer ${access}`,
    "Content-Type": 'application/json; charset=UTF-8',
}
```

## private API

We can get *private api* only through the developer console in the "network" tab

### *headers*

```ts
{
    "Content-Type": 'application/json; charset=UTF-8',
    "X-Requested-With": 'XMLHttpRequest',
}
```

## amomail api

for *amomail api* we need *__mailToken__*, which can be obtained via global variables: 

```ts
AMOCRM.constant('amomail').auth_token
```

### *headers*

```ts
{
    "Content-Type": 'application/json; charset=UTF-8',
    "X-Requested-With": 'XMLHttpRequest',
    "X-Auth-Token": mailToken,
}
```
