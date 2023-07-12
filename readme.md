### Live Link: https://cow-hut-backend-assignment-peach.vercel.app/

### Application Routes:

#### User

- api/v1/users/signup (POST)
- api/v1/users/ (GET)
- api/v1/users/?role=buyer (GET)
- api/v1/users/64ade52a0c9905d2096dbf5f (Single GET) Include an id that is saved in your database
- api/v1/users/64ade52a0c9905d2096dbf5f (PATCH)
- api/v1/users/64ade52a0c9905d2096dbf5f (DELETE) Include an id that is saved in your database

#### Cows

- api/v1/cows/create-cow (POST)
- api/v1/cows (GET)
- api/v1/cows/?maxPrice=50000 (GET)
- api/v1/cows/?minPrice=50000 (GET)
- api/v1/cows/?name=chulbull (GET)
- api/v1/cows/?location=Chattogram(GET)
- api/v1/cows/64add013ba11bee2d761008c (Single GET)
- api/v1/cows/64add013ba11bee2d761008c (PATCH)
- api/v1/cows/64add013ba11bee2d761008c (DELETE)

### Pagination and Filtering routes of Cows

- api/v1/cows?page=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=20000&maxPrice=70000
- api/v1/cows?location=Chattogram
- api/v1/cows?searchTerm=Cha

#### Orders

- /api/v1/orders/create-order (POST)
- /api/v1/orders/ (GET)
- /api/v1/orders/64adf8210cc24193621a126d (GET)
