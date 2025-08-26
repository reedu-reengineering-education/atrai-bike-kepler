# ATRAI Data Platform Kepler

This repository contains the Kepler.gl-based frontend for the ATRAI Data Platform.

## Getting Started

1. **Supabase Setup**  
   Create a Supabase project to store your map data.

2. **Database Table**  
   In Supabase, create a table named `maps` with the following columns:

- `title` (type: text)
- `config` (type: json)
- `dataset` (type: json)
- `created_at` (type: timestamp with time zone, default: `now()`)
- `user_id` (type: uuid)

Now set a foreign key constraint on the `user_id` column to reference the `id` column in the `users` table.

3. **Policies**

   In Supabase, set the following policies:

   DELETE

   Enable delete for users based on user_id
   Applied to: public role

   INSERT

   Enable insert for authenticated users only
   Applied to: authenticated role

   UPDATE

   Enable update for authenticated users only
   Applied to: authenticated role

   SELECT

   Enable users to view their own data only
   Applied to: authenticated role
