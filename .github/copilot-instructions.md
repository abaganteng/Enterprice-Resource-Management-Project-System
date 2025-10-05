<!-- Copilot instructions for Enterprice-Resource-Management-Project-System -->

## Quick context
- Laravel 12 backend, Inertia + React frontend (resources/js), Tailwind v4, PHP 8.3
- Key tools: Pest (tests), Pint (format), Vite (frontend dev), Herd for local URLs

## Essential commands
- Install: `composer install; npm install`
- Generate key / migrate: `php artisan key:generate; php artisan migrate --seed`
- Dev frontend: `npm run dev` (or `npm run build` for production)
- Run tests (Pest): `php artisan test --filter=YourTestName`
- Format: `vendor/bin/pint --dirty`

## Project-specific conventions
- Frontend pages & components: `resources/js/Pages`, `resources/js/components`.
- Use Inertia `Form` or `useForm` for forms (see `resources/js/pages/users/*`).
- Models: `app/Models` — prefer relationship methods and eager loading (see `app/Models/Project.php`).
- Factories: `database/factories` (see `database/factories/ProjectFactory.php`).

## Integration points & patterns to reference
- Routes: `routes/web.php`, `routes/dev.php` (includes quick-login `/dev/login/{id}`).
- Bootstrapping: `bootstrap/app.php`, `bootstrap/providers.php`.
- Frontend bundling errors (Vite manifest) -> run `npm run build` or `npm run dev`.

## Testing & format rules
- Tests use Pest (v3). Create tests with `php artisan make:test --pest NameTest`.
- Prefer focused tests during development: `php artisan test tests/Feature/NameTest.php`.
- Run `vendor/bin/pint --dirty` before committing.

## Real-time suggestion behavior for AI assistants
- Prefer small, local edits that mirror sibling files (naming, file layout). Example: follow `resources/js/pages/projects/groups/*` for component props and CSS classes.
- Default to Laravel idioms: use Eloquent relationships with `with()` for eager loading, Form Request classes for validation, and named routes for links.
- When proposing code, always include:
	- exact file path to edit (e.g. `app/Http/Controllers/ProjectController.php`)
	- a 1-line rationale (e.g. "avoid N+1 by eager loading 'phases' and 'milestones'")

## Safety & limits
- Do not add new top-level dependencies without approval.
- Avoid changing `config/` files unless requested.

If you'd like, I can expand any section (examples, CI steps, or more file references). Ask which area to expand.