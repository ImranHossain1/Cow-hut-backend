### Live Link: https://cow-hut-assignment-indol.vercel.app

### Application Routes:

## Main part

### Auth (User)

- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/auth/login (POST)
- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/auth/refresh-token (POST)

### Auth (Admin)

- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/admins/create-admin (POST)
- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/admins/login (POST)
- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/admins/refresh-token (POST)

### User

- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/users (GET) //Only Admin can get the list of users
- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/users/64e249bd72bb0c8f648e80a0 (Single GET) //Only Admin can get the list of users
- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/users/64e249bd72bb0c8f648e80a0 (PATCH) //Only Admin can update the user
- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/users/64e249bd72bb0c8f648e80a0 (DELETE) Include an id that is saved in your database

#### Cows

- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/cows/create-cow (POST) //Only seller can create
- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/cows (GET) //Admin, seller , buyer can get
- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/cows/64e24a6572bb0c8f648e80b0 (Single GET) //Admin, seller , buyer can get
- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/cows/64e24a6572bb0c8f648e80b0 (PATCH) // Only the owner of this cow can update
- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/cows/64e24a6572bb0c8f648e80b0 (DELETE) // Only the owner of this cow can Delete

#### Orders

- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/orders/create-order (POST) // Only buyer can order
- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/orders (GET) // Only admin can get
- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/orders/64e218acba250ad417004bbf (GET) //only the seller and the buyer of this cow can get this.

## Bonus Part

#### Admin

-Route: https://cow-hut-assignment-indol.vercel.app/api/v1/admins/create-admin (POST)

#### My Profile

- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/users/my-profile (GET)
- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/users/my-profile (PATCH)

#### Order:

- Route: https://cow-hut-assignment-indol.vercel.app/api/v1/orders/6177a5b87d32123f08d2f5d4 (GET)
