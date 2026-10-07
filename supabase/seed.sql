-- seed.sql
-- A few example rows, so your screens have something to show once Supabase
-- is connected. They are meaningless on purpose, like the example table.
--
-- HOW TO USE IT
-- 1. Run supabase/migrations/0001_base.sql first (README step 2).
-- 2. Sign in to your app once with Google, so you have an account.
-- 3. In Supabase, open SQL Editor and run this line to find your id:
--
--      select id, email from auth.users;
--
--    Copy your id. It looks like 3f6c1a2e-8b1d-4c7a-9e0f-1234567890ab.
-- 4. Below, replace PASTE-YOUR-USER-ID-HERE with your id. Keep the single
--    quotes around it.
-- 5. Run the insert below.
--
-- Running it twice adds the rows twice. To start again, run:
--      delete from example_items where owner_id = 'PASTE-YOUR-USER-ID-HERE';
--
-- Once you have a table of your own, copy this file's pattern for it, using
-- rows from the person you're building for (card 11).

insert into example_items (owner_id, title, note, status)
select 'PASTE-YOUR-USER-ID-HERE'::uuid, r.title, r.note, r.status
from (values
  ('Example item A', 'Open this to edit it.',            'open'),
  ('Example item B', 'Tap Delete to see it go.',         'open'),
  ('Example item C', 'This one is marked done.',         'done')
) as r (title, note, status);
