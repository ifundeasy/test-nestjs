# Endpoints

## Root
```bash
curl http://localhost:3000 && echo
```

## Public State
### Login (initialized user list)
```bash
# administrator (admin)
curl -X POST http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username": "admin", "password": "admin"}' && echo

# customer (adi)
curl -X POST http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username": "adi", "password": "adi"}' && echo

# customer (ucup)
curl -X POST http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username": "ucup", "password": "ucup"}' && echo
```

### Registration
```bash
# administrator
curl -X POST http://localhost:3000/user/signup \
  -H 'Content-Type: application/json' \
  -d '{"name": "maria", "username": "maria", "password": "maria", "isAdmin": true }' && echo

# customer
curl -X POST http://localhost:3000/user/signup \
  -H 'Content-Type: application/json' \
  -d '{"name": "mamake", "username": "mamake", "password": "mamake", "isAdmin": false }' && echo
```

### List products (initialized product list)
```bash
# Also support with additional /:code as parameter
curl -X GET http://localhost:3000/product && echo
```

## Authenticated State (Admininstrator or Customer)
### Get My Profile
```bash
curl -X GET  http://localhost:3000/profile -H "Authorization: Bearer <JWT>" && echo
```

### Get My Collection
```bash
# Also support with additional /:saleId as parameter
curl -X GET http://localhost:3000/sales/collection -H 'Authorization: Bearer <JWT>' && echo
```

### Register New Collection
```bash
curl -X POST http://localhost:3000/sales/collection \
  -d '{ "productId": "a001", "buyTimestamp": "2022-09-12 12:00:00" }' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <JWT>' && echo
```

### Warranty Claim
```bash
curl -X POST http://localhost:3000/sales/warranty-claim/:saleId -H 'Authorization: Bearer <JWT>' && echo
```

## Authenticated State (Admin only)
### Get All Users Collection
```bash
# Also support with additional /:saleId as parameter
curl -X GET http://localhost:3000/sales/user-collection -H 'Authorization: Bearer <JWT>' && echo
```

### Update Warraty Status
```bash
# The /:value parameter available for
# /1 for Accepted
# /2 for Refused
# /3 for Delivered
curl -X POST http://localhost:3000/sales/user-claim/:saleId/:value -H 'Authorization: Bearer <JWT>' && echo
```
