### Management Access System

Sebuah sistem management access berbasis Laravel, React, dan Inertia dengan dukungan role & permission menggunakan Spatie.

### Fitur Utama

1. Create User dan Role
2. Edit User dan Role
3. Delete Role
4. Assign Role (ke user) dan Permission (ke role)
5. Revoke Role (dari user) dan Permission (dari role)

### Tech Stack

1. Backend : L A R A V E L 12
2. Frontend : R E A C T J S + I N E R T I A J S
3. Database : M Y S Q L
4. Package utama : laravel-permission [https://spatie.be/docs/laravel-permission/v6/] dan Laravel-data [https://spatie.be/docs/laravel-data/v4/introduction]

### Cara Penggunaan

1. Clone Repo di terminal
2. Masuk ke direktori, `composer install`, `npm install`, edit file .env.example menjadi .env, `php artisan key:generate`, `php artisan migrate --seed`, `npm run dev`.
3. Agar dapat melihat tampilan login sebagai Super-admin dengan user id 1. Lebih mudah login gunakan url `http://belajar-spatie-package.test/dev/login/1`. Management access terletak di user menu.


### Laravel Inertia React with TypeScript


### Quick Login

This project includes a quick login feature. Simply add `/dev/login/{user_id}` to the URL to log in as a specific user.

Example:

```text
http://localhost:8000/dev/login/1
```

