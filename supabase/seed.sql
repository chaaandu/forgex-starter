-- seed.sql
-- Sample products for three kinds of business: a home baker, a kirana and a
-- pharmacy. Prices are in rupees and are examples. Change them to match the
-- owner you're building for.
--
-- HOW TO USE IT
-- 1. Sign in to your app once and create your shop.
-- 2. In Supabase, open SQL Editor and run this line to find your shop id:
--
--      select id, name, created_at from shops;
--
--    Copy the id of your shop. It looks like 3f6c1a2e-8b1d-4c7a-9e0f-1234567890ab.
-- 3. Pick ONE block below: the home baker, the kirana or the pharmacy.
-- 4. In that block, replace PASTE-YOUR-SHOP-ID-HERE with your shop id.
--    Keep the single quotes around it.
-- 5. Select only that block and click Run.
--
-- Running a block twice adds the products twice. To start again, run:
--      delete from products where shop_id = 'PASTE-YOUR-SHOP-ID-HERE';
-- (Old orders keep their item names and prices, so they're safe.)


-- ---------------------------------------------------------------------------
-- Home baker
-- ---------------------------------------------------------------------------
insert into products (shop_id, name, price, unit)
select 'PASTE-YOUR-SHOP-ID-HERE'::uuid, p.name, p.price, p.unit
from (values
  ('Chocolate truffle cake',   1200, '1 kg'),
  ('Eggless vanilla cake',      450, '500 g'),
  ('Pineapple cake',            550, '500 g'),
  ('Red velvet cupcakes',       480, 'box of 6'),
  ('Brownies',                  360, 'box of 6'),
  ('Choco chip cookies',        280, '250 g'),
  ('Banana walnut loaf',        380, '1 loaf'),
  ('Plum cake',                 550, '500 g'),
  ('Custom photo cake',        1600, '1 kg'),
  ('Whole wheat bread',          90, '400 g loaf')
) as p (name, price, unit);


-- ---------------------------------------------------------------------------
-- Kirana
-- ---------------------------------------------------------------------------
insert into products (shop_id, name, price, unit)
select 'PASTE-YOUR-SHOP-ID-HERE'::uuid, p.name, p.price, p.unit
from (values
  ('Wheat atta',               245, '5 kg'),
  ('Sona masoori rice',        340, '5 kg'),
  ('Toor dal',                 165, '1 kg'),
  ('Sugar',                     48, '1 kg'),
  ('Sunflower oil',            155, '1 litre'),
  ('Toned milk',                28, '500 ml'),
  ('Curd',                      35, '400 g'),
  ('Eggs',                      84, '12'),
  ('Iodised salt',              28, '1 kg'),
  ('Tea powder',               140, '250 g'),
  ('Maggi noodles',             56, 'pack of 4'),
  ('Parle-G biscuits',          10, '1 packet'),
  ('Onions',                    40, '1 kg'),
  ('Bathing soap',             160, 'pack of 4')
) as p (name, price, unit);


-- ---------------------------------------------------------------------------
-- Pharmacy
-- ---------------------------------------------------------------------------
-- Over-the-counter items only. Medicines that need a prescription need one
-- in your app too: don't take those orders without it.
insert into products (shop_id, name, price, unit)
select 'PASTE-YOUR-SHOP-ID-HERE'::uuid, p.name, p.price, p.unit
from (values
  ('Paracetamol 650 mg',        34, 'strip of 15'),
  ('Cetirizine 10 mg',          20, 'strip of 10'),
  ('ORS sachet',                22, '1 sachet'),
  ('Antacid tablets',           30, 'strip of 15'),
  ('Vapour rub',               155, '50 ml'),
  ('Cough syrup',              120, '100 ml'),
  ('Antiseptic liquid',         95, '125 ml'),
  ('Adhesive bandages',         50, 'pack of 20'),
  ('Pain relief spray',        185, '55 g'),
  ('Digital thermometer',      250, '1 piece'),
  ('Hand sanitiser',            60, '100 ml'),
  ('Cotton roll',               45, '100 g')
) as p (name, price, unit);
