-- Replace with your actual auth user id before running.
with me as (
  select '00000000-0000-0000-0000-000000000000'::uuid as user_id
),
insert_properties as (
  insert into public.properties (user_id, name, address_line_1, city, state, zip)
  select me.user_id, x.name, x.address_line_1, x.city, x.state, x.zip
  from me,
  (values
    ('West Lawn 3-Flat', '2018 W 63rd St', 'Chicago', 'IL', '60636'),
    ('Bryn Mawr Duplex', '1215 W Bryn Mawr Ave', 'Chicago', 'IL', '60660')
  ) x(name, address_line_1, city, state, zip)
  returning id, user_id, name
),
insert_units as (
  insert into public.units (user_id, property_id, unit_label, bedrooms, bathrooms, status, current_rent, market_rent)
  select p.user_id, p.id, u.unit_label, u.bedrooms, u.bathrooms, u.status::unit_status, u.current_rent, u.market_rent
  from insert_properties p
  join lateral (
    values
      ('West Lawn 3-Flat','1F',2,1,'Occupied',1400,1500),
      ('West Lawn 3-Flat','2F',2,1,'Occupied',1450,1550),
      ('West Lawn 3-Flat','Garden',1,1,'Vacant',1200,1300),
      ('Bryn Mawr Duplex','A',2,2,'Occupied',1800,1900),
      ('Bryn Mawr Duplex','B',2,2,'Turnover',0,1850)
  ) u(property_name, unit_label, bedrooms, bathrooms, status, current_rent, market_rent) on p.name = u.property_name
  returning id, property_id, user_id, unit_label
)
insert into public.vacancies (user_id, unit_id, date_vacated, asking_rent, status, notes)
select iu.user_id, iu.id, current_date - 12, 1850, 'Cleaning', 'Floor scrub scheduled'
from insert_units iu where iu.unit_label = 'B';
