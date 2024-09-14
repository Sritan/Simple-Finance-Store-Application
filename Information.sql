set global transaction isolation level serializable;
set global SQL_MODE = 'ANSI,TRADITIONAL';
set names utf8mb4;
set SQL_SAFE_UPDATES = 0;

set @thisDatabase = 'drone_dispatch';
drop database if exists drone_dispatch;
create database if not exists drone_dispatch;
use drone_dispatch;

-- -----------------------------------------------
-- table structures
-- -----------------------------------------------

create table users (
uname varchar(40) not null,
first_name varchar(100) not null,
last_name varchar(100) not null,
address varchar(500) not null,
birthdate date default null,
primary key (uname)
) engine = innodb;

create table customers (
uname varchar(40) not null,
rating integer not null,
credit integer not null,
primary key (uname)
) engine = innodb;

create table employees (
uname varchar(40) not null,
taxID varchar(40) not null,
service integer not null,
salary integer not null,
primary key (uname),
unique key (taxID)
) engine = innodb;

create table drone_pilots (
uname varchar(40) not null,
licenseID varchar(40) not null,
experience integer not null,
primary key (uname),
unique key (licenseID)
) engine = innodb;

create table store_workers (
uname varchar(40) not null,
primary key (uname)
) engine = innodb;

create table products (
barcode varchar(40) not null,
pname varchar(100) not null,
weight integer not null,
primary key (barcode)
) engine = innodb;

create table orders (
orderID varchar(40) not null,
sold_on date not null,
purchased_by varchar(40) not null,
carrier_store varchar(40) not null,
carrier_tag integer not null,
primary key (orderID)
) engine = innodb;

create table stores (
storeID varchar(40) not null,
sname varchar(100) not null,
revenue integer not null,
manager varchar(40) not null,
primary key (storeID)
) engine = innodb;

create table drones (
storeID varchar(40) not null,
droneTag integer not null,
capacity integer not null,
remaining_trips integer not null,
pilot varchar(40) not null,
primary key (storeID, droneTag)
) engine = innodb;

create table order_lines (
orderID varchar(40) not null,
barcode varchar(40) not null,
price integer not null,
quantity integer not null,
primary key (orderID, barcode)
) engine = innodb;

create table employed_workers (
storeID varchar(40) not null,
uname varchar(40) not null,
primary key (storeID, uname)
) engine = innodb;

-- -----------------------------------------------
-- referential structures
-- -----------------------------------------------

alter table customers add constraint fk1 foreign key (uname) references users (uname)
	on update cascade on delete cascade;
alter table employees add constraint fk2 foreign key (uname) references users (uname)
	on update cascade on delete cascade;
alter table drone_pilots add constraint fk3 foreign key (uname) references employees (uname)
	on update cascade on delete cascade;
alter table store_workers add constraint fk4 foreign key (uname) references employees (uname)
	on update cascade on delete cascade;
alter table orders add constraint fk8 foreign key (purchased_by) references customers (uname)
	on update cascade on delete cascade;
alter table orders add constraint fk9 foreign key (carrier_store, carrier_tag) references drones (storeID, droneTag)
	on update cascade on delete cascade;
alter table stores add constraint fk11 foreign key (manager) references store_workers (uname)
	on update cascade on delete cascade;
alter table drones add constraint fk5 foreign key (storeID) references stores (storeID)
	on update cascade on delete cascade;
alter table drones add constraint fk10 foreign key (pilot) references drone_pilots (uname)
	on update cascade on delete cascade;
alter table order_lines add constraint fk6 foreign key (orderID) references orders (orderID)
	on update cascade on delete cascade;
alter table order_lines add constraint fk7 foreign key (barcode) references products (barcode)
	on update cascade on delete cascade;
alter table employed_workers add constraint fk12 foreign key (storeID) references stores (storeID)
	on update cascade on delete cascade;
alter table employed_workers add constraint fk13 foreign key (uname) references store_workers (uname)
	on update cascade on delete cascade;

-- -----------------------------------------------
-- table data
-- -----------------------------------------------

insert into users values
('jstone5', 'Jared', 'Stone', '101 Five Finger Way', '1961-01-06'),
('sprince6', 'Sarah', 'Prince', '22 Peachtree Street', '1968-06-15'),
('awilson5', 'Aaron', 'Wilson', '220 Peachtree Street', '1963-11-11'),
('lrodriguez5', 'Lina', 'Rodriguez', '360 Corkscrew Circle', '1975-04-02'),
('tmccall5', 'Trey', 'McCall', '360 Corkscrew Circle', '1973-03-19'),
('eross10', 'Erica', 'Ross', '22 Peachtree Street', '1975-04-02'),
('hstark16', 'Harmon', 'Stark', '53 Tanker Top Lane', '1971-10-27'),
('echarles19', 'Ella', 'Charles', '22 Peachtree Street', '1974-05-06'),
('csoares8', 'Claire', 'Soares', '706 Living Stone Way', '1965-09-03'),
('agarcia7', 'Alejandro', 'Garcia', '710 Living Water Drive', '1966-10-29'),
('bsummers4', 'Brie', 'Summers', '5105 Dragon Star Circle', '1976-02-09'),
('cjordan5', 'Clark', 'Jordan', '77 Infinite Stars Road', '1966-06-05'),
('fprefontaine6', 'Ford', 'Prefontaine', '10 Hitch Hikers Lane', '1961-01-28');

insert into customers values
('jstone5', 4, 40),
('sprince6', 5, 30),
('awilson5', 2, 100),
('lrodriguez5', 4, 60),
('bsummers4', 3, 110),
('cjordan5', 3, 50);

insert into employees values
('awilson5', '111-11-1111', 9, 46000),
('lrodriguez5', '222-22-2222', 20, 58000),
('tmccall5', '333-33-3333', 29, 33000),
('eross10', '444-44-4444', 10, 61000),
('hstark16', '555-55-5555', 20, 59000),
('echarles19', '777-77-7777', 3, 27000),
('csoares8', '888-88-8888', 26, 57000),
('agarcia7', '999-99-9999', 24, 41000),
('bsummers4', '000-00-0000', 17, 35000),
('fprefontaine6', '121-21-2121', 5, 20000);

insert into store_workers values
('eross10'),
('hstark16'),
('echarles19');

insert into stores values
('pub', 'Publix', 200, 'hstark16'),
('krg', 'Kroger', 300, 'echarles19');

insert into employed_workers values
('pub', 'eross10'),
('pub', 'hstark16'),
('krg', 'eross10'),
('krg', 'echarles19');

insert into drone_pilots values
('awilson5', '314159', 41),
('lrodriguez5', '287182', 67),
('tmccall5', '181633', 10),
('agarcia7', '610623', 38),
('bsummers4', '411911', 35),
('fprefontaine6', '657483', 2);

insert into drones values
('pub', 1, 10, 3, 'awilson5'),
('pub', 2, 20, 2, 'lrodriguez5'),
('krg', 1, 15, 4, 'tmccall5'),
('pub', 9, 45, 1, 'fprefontaine6');

insert into products values
('pr_3C6A9R', 'pot roast', 6),
('ss_2D4E6L', 'shrimp salad', 3),
('hs_5E7L23M', 'hoagie sandwich', 3),
('clc_4T9U25X', 'chocolate lava cake', 5),
('ap_9T25E36L', 'antipasto platter', 4);

insert into orders values
('pub_303', '2024-05-23', 'sprince6', 'pub', 1),
('pub_305', '2024-05-22', 'sprince6', 'pub', 2),
('krg_217', '2024-05-23', 'jstone5', 'krg', 1),
('pub_306', '2024-05-22', 'awilson5', 'pub', 2);

insert into order_lines values
('pub_303', 'pr_3C6A9R', 20, 1),
('pub_303', 'ap_9T25E36L', 4, 1),
('pub_305', 'clc_4T9U25X', 3, 2),
('pub_306', 'hs_5E7L23M', 3, 2),
('pub_306', 'ap_9T25E36L', 10, 1),
('krg_217', 'pr_3C6A9R', 15, 2);

-- -----------------------------------------------
-- stored procedures and views
-- -----------------------------------------------

-- add customer
delimiter // 
create procedure add_customer
	(in ip_uname varchar(40), in ip_first_name varchar(100),
	in ip_last_name varchar(100), in ip_address varchar(500),
    in ip_birthdate date, in ip_rating integer, in ip_credit integer)
sp_main: begin
declare uname_count int;
declare user_count int;

if ip_uname is null or ip_first_name is null or ip_last_name is null or ip_address is null
 or ip_rating is null or ip_credit is null then
leave sp_main;
end if;

select count(*) into user_count from users where uname = ip_uname;
select count(*) into uname_count from customers where uname = ip_uname;

if user_count = 0 then
insert into users (uname, first_name, last_name, address, birthdate) 
values (ip_uname, ip_first_name, ip_last_name, ip_address, ip_birthdate);
end if;

if uname_count = 0 then
insert into customers (uname, rating, credit) values (ip_uname, ip_rating, ip_credit);
end if;
end //
delimiter ;

-- add drone pilot
delimiter // 
create procedure add_drone_pilot
	(in ip_uname varchar(40), in ip_first_name varchar(100),
	in ip_last_name varchar(100), in ip_address varchar(500),
    in ip_birthdate date, in ip_taxID varchar(40), in ip_service integer, 
    in ip_salary integer, in ip_licenseID varchar(40),
    in ip_experience integer)
sp_main: begin
declare user_uname_count integer;
declare employee_uname_count integer;
declare taxID_uname_count integer;
declare pilot_uname_count integer;
declare pilot_license_count integer;

if ip_uname IS NULL or ip_first_name IS NULL or ip_last_name is NULL or ip_address is NULL
or ip_taxID IS NULL or ip_service is NULL or ip_salary is NULL or ip_licenseID is NULL or ip_experience IS NULL
then leave sp_main; end if;

select count(*) into user_uname_count from users where uname = ip_uname;    
select count(*) into employee_uname_count from employees where uname = ip_uname;

select count(*) into taxID_uname_count from employees where taxID = ip_taxID;
select count(*) into pilot_license_count from drone_pilots where licenseID = ip_licenseID;
select count(*) into pilot_uname_count from drone_pilots where uname = ip_uname;
if employee_uname_count > 0 or taxID_uname_count > 0 or pilot_license_count > 0 or pilot_uname_count > 0 then
leave sp_main;
end if;
    
    if user_uname_count = 0 then
insert into users (uname, first_name, last_name, address, birthdate)
        values (ip_uname, ip_first_name, ip_last_name, ip_address, ip_birthdate);
end if;
    
    if employee_uname_count = 0 then
insert into employees (uname, taxID, service, salary)
        values (ip_uname, ip_taxID, ip_service, ip_salary);
end if;
        
insert into drone_pilots (uname, licenseID, experience)
values (ip_uname, ip_licenseID, ip_experience);
end //
delimiter ;



-- add product
delimiter // 
create procedure add_product
	(in ip_barcode varchar(40), in ip_pname varchar(100),
    in ip_weight integer)
sp_main: begin
declare barcode_count INT;
if ip_barcode IS NULL or ip_barcode = '' or ip_pname = '' or
 ip_pname IS NULL or ip_weight IS NULL then leave sp_main; end if;
select count(*) into barcode_count from products where ip_barcode = barcode;
    if barcode_count = 0 then
insert into products (barcode, pname, weight) values (ip_barcode, ip_pname, ip_weight);
end if;
end //
delimiter ;

-- add drone
delimiter // 
create procedure add_drone
	(in ip_storeID varchar(40), in ip_droneTag integer,
    in ip_capacity integer, in ip_remaining_trips integer,
    in ip_pilot varchar(40))
sp_main: begin
declare pilot_drones INT;
    declare pilot_count INT;
    declare store_count INT;
    declare tag_count INT;
    
	if ip_storeID is null or ip_droneTag is null or ip_capacity is null or 
    ip_remaining_trips is null
    or ip_pilot is null then leave sp_main; end if;
    
    select count(*) into pilot_drones from drones where pilot = ip_pilot;
    select count(*) into pilot_count from drone_pilots where uname = ip_pilot;
    
    select count(*) into store_count from stores where storeID = ip_storeID;
    select count(*) into tag_count from drones where droneTag = ip_droneTag and storeID = ip_storeID;
    
    if tag_count = 0 and store_count = 1 and pilot_drones = 0 and pilot_count = 1 then
insert into drones (storeID, droneTag, capacity, remaining_trips, pilot) 
        values (ip_storeID, ip_droneTag, ip_capacity, ip_remaining_trips, ip_pilot);
end if;

end //
delimiter ;

-- increase customer credits
delimiter // 
create procedure increase_customer_credits
	(in ip_uname varchar(40), in ip_money integer)
sp_main: begin
	    if ip_uname is null or ip_money is null then leave sp_main; end if;
    if ip_money >= 0
	then UPDATE customers SET credit = credit + ip_money where uname = ip_uname;
    end if;

end //
delimiter ;

-- swap drone control
delimiter // 
create procedure swap_drone_control
	(in ip_incoming_pilot varchar(40), in ip_outgoing_pilot varchar(40))
sp_main: begin
	    if ip_incoming_pilot is null or ip_outgoing_pilot is null then leave sp_main; end if;
    
    if exists (select uname from drone_pilots where uname = ip_incoming_pilot) and 
    not exists (select pilot from drones where pilot = ip_incoming_pilot) and
    exists (select pilot from drones where pilot = ip_outgoing_pilot) then 
    UPDATE drones SET pilot = ip_incoming_pilot where pilot = ip_outgoing_pilot; end if;

end //
delimiter ;



-- repair and refuel a drone
delimiter // 
create procedure repair_refuel_drone
	(in ip_drone_store varchar(40), in ip_drone_tag integer,
    in ip_refueled_trips integer)
sp_main: begin
	    if ip_drone_store is null or ip_drone_tag is null or ip_refueled_trips is null then leave sp_main; end if;
    if ip_refueled_trips >= 0
    then UPDATE drones SET remaining_trips = remaining_trips + ip_refueled_trips
    where storeID = ip_drone_store and droneTag = ip_drone_tag; end if;

end //
delimiter ;

-- begin order
delimiter // 
create procedure begin_order
	(in ip_orderID varchar(40), in ip_sold_on date,
    in ip_purchased_by varchar(40), in ip_carrier_store varchar(40),
    in ip_carrier_tag integer, in ip_barcode varchar(40),
    in ip_price integer, in ip_quantity integer)
sp_main: begin
	if ip_orderID is null or ip_sold_on is null or ip_purchased_by is null or ip_carrier_store is null or ip_carrier_tag is null
    or ip_barcode is null or ip_price is null or ip_quantity is null or ip_price < 0 or ip_quantity <= 0 then leave sp_main; end if;
    
    if not exists (select storeID, droneTag from drones where ip_carrier_store = storeID and ip_carrier_tag = droneTag) or
    not exists (select uname from customers where ip_purchased_by = uname) or
    not exists (select barcode from products where ip_barcode = barcode) or exists (select orderID 
    from orders where orderID = ip_orderID) then leave sp_main; end if;
    
	if (SELECT total_weight_allowed - current_weight
    FROM drone_traffic_control
    WHERE drone_serves_store = ip_carrier_store AND drone_tag = ip_carrier_tag) 
    < ((select weight from products where ip_barcode = barcode) * ip_quantity) then leave sp_main; end if;

    
    if (select (current_credit - credit_already_allocated) from customer_credit_check where ip_purchased_by = customer_name) 
    < (ip_price * ip_quantity) then leave sp_main; end if;
    
    INSERT into orders VALUES (ip_orderID, ip_sold_on, ip_purchased_by, ip_carrier_store, ip_carrier_tag);
    INSERT into order_lines VALUES (ip_orderID, ip_barcode, ip_price, ip_quantity);

end //
delimiter ;

-- add order line
delimiter // 
create procedure add_order_line
	(in ip_orderID varchar(40), in ip_barcode varchar(40),
    in ip_price integer, in ip_quantity integer)
sp_main: begin
	-- place your solution here
    declare productweight int;
    declare dronecap int;
    declare cust_name varchar(40);
    declare cstore varchar(40);
    declare ctag int;
    if ip_orderID is null or ip_barcode is null or ip_price is null or ip_quantity is null then
    leave sp_main;
    end if;
    if (select count(*) from orders where orderID = ip_orderID) < 1 then
    leave sp_main;
    end if;
    if (select count(*) from products where barcode = ip_barcode) < 1 then
    leave sp_main;
    end if;
    if (select count(*) from order_lines where orderID = ip_orderID and barcode = ip_barcode) >= 1 then
    leave sp_main;
    end if;
    if ip_price < 0 or ip_quantity <= 0 then 
    leave sp_main;
    end if;
	select purchased_by into cust_name from orders where orderID = ip_orderID;
    
    select carrier_store into cstore from orders where orderID = ip_orderID;
    
    select carrier_tag into ctag from orders where orderID = ip_orderID;
    
	SELECT total_weight_allowed - current_weight INTO dronecap
    FROM drone_traffic_control
    WHERE drone_serves_store = cstore AND drone_tag = ctag;
    
    select weight into productweight from products where barcode = ip_barcode;
    if dronecap < productweight*ip_quantity then
        leave sp_main;
    end if;

    
    if (select (current_credit - credit_already_allocated) from customer_credit_check where cust_name = customer_name) < (ip_price * ip_quantity) then leave sp_main; end if;

    insert into order_lines (orderID, barcode, price, quantity) values(ip_orderID, ip_barcode, ip_price, ip_quantity);
end //
delimiter ;


-- deliver order
delimiter // 
create procedure deliver_order
	(in ip_orderID varchar(40))
sp_main: begin
    declare cost int;
    declare customer_ID varchar(40);
    declare store_ID varchar(40);
    declare pilot_uname varchar(40);
	if (select count(*) FROM orders WHERE orderID = ip_orderID) = 0 
    OR (SELECT remaining_trips FROM drones JOIN orders 
    on (storeID, droneTag)= (carrier_store, carrier_tag) where orderid = ip_orderID) = 0 
    then leave sp_main; end if;
    
    SELECT sum(price * quantity) into cost
	FROM order_lines
	WHERE orderID = ip_orderID
	GROUP BY orderID;
    
    SELECT purchased_by into customer_ID
    FROM orders
    WHERE orderID = ip_orderID;
    
    UPDATE customers set credit = credit - cost WHERE uname = customer_ID;
    
    SELECT carrier_store into store_ID FROM orders WHERE orderID = ip_orderID;
    
    UPDATE stores set revenue = revenue + cost WHERE storeID = store_ID;
    
    UPDATE drones SET remaining_trips = remaining_trips - 1 
    WHERE storeID = store_ID AND droneTag = (SELECT carrier_tag FROM orders WHERE orderID = ip_orderID);
    
    SELECT pilot INTO pilot_uname FROM orders JOIN drones on (carrier_store, carrier_tag) 
    = (storeID, droneTag) WHERE orderID = ip_orderID;
    UPDATE drone_pilots SET experience = experience + 1 WHERE uname = pilot_uname;
    
    if cost > 25 and (select rating from customers where uname = customer_ID) < 5
    then UPDATE customers set rating = rating + 1 WHERE uname = customer_ID; end if;
    
    DELETE FROM orders WHERE orderID = ip_orderID;
    DELETE FROM order_lines WHERE orderID = ip_orderID;

end //
delimiter ;


-- cancel an order
delimiter // 
create procedure cancel_order
	(in ip_orderID varchar(40))
sp_main: begin
	-- place your solution here
    DECLARE c_uname VARCHAR(40) DEFAULT NULL;
    SELECT purchased_by INTO c_uname FROM orders WHERE orderID = ip_orderID;
    IF c_uname IS NULL then 
		LEAVE sp_main;
	END IF;
	UPDATE customers SET rating = GREATEST(rating - 1, 1) WHERE uname = c_uname;
	DELETE FROM order_lines WHERE orderID = ip_orderID;
	DELETE FROM orders WHERE orderID = ip_orderID;
end //
delimiter ;

-- display persons distribution across roles
create or replace view role_distribution (category, total) as
-- replace this select query with your solution
select
  'users' as category,
  count(*) as total
from users
union all
select
  'customers' as category,
  count(*) as total
from customers
union all
select
  'employees' as category,
  count(*) as total
from employees
union all
select
  'customer_employer_overlap' as category,
  count(*) as total
from users
where uname in (
  select uname from customers
) and uname in (
  select uname from employees
)
union all
select
  'drone_pilots' as category,
  count(*) as total
from drone_pilots
union all
select
  'store_workers' as category,
  count(*) as total
from store_workers
union all
select
  'other_employee_roles' as category,
  count(*) as total
from employees
where uname not in (
  select uname from drone_pilots
) and uname not in (
  select uname from store_workers
);



-- display customer status and current credit and spending activity
create or replace view customer_credit_check (customer_name, rating, current_credit,
	credit_already_allocated) as
SELECT uname, rating, credit, COALESCE(SUM(a.credit_already_allocated), 0) FROM 
(SELECT 
    uname, rating, credit , 
    price * quantity AS credit_already_allocated FROM 
    customers 
LEFT JOIN 
    orders ON customers.uname = orders.purchased_by 
LEFT JOIN 
    order_lines ON orders.orderID = order_lines.orderID) as a
GROUP BY uname;


-- display drone status and current activity
create or replace view drone_traffic_control (drone_serves_store, drone_tag, pilot,
	total_weight_allowed, current_weight, deliveries_allowed, deliveries_in_progress) as
-- replace this select query with your solution
select
    d.storeID as drone_serves_store,
    d.droneTag,
    dp.uname as pilot,
    d.capacity as total_weight_allowed,
    ifnull(sum(p.weight * ol.quantity), 0) as current_weight,
    d.remaining_trips as deliveries_allowed,
    count(distinct o.orderID) as deliveries_in_progress
from
    drones d
join
    drone_pilots dp on d.pilot = dp.uname
left join
    orders o on d.storeID = o.carrier_store and d.droneTag = o.carrier_tag
left join
    order_lines ol on o.orderID = ol.orderID
left join
    products p on ol.barcode = p.barcode
group by
    d.storeID, d.droneTag;




-- display product status and current activity including most popular products
create or replace view most_popular_products (barcode, product_name, weight, lowest_price,
	highest_price, lowest_quantity, highest_quantity, total_quantity) as
SELECT
    p.barcode, p.pname AS product_name, p.weight,
    MIN(ol.price) AS lowest_price, MAX(ol.price) AS highest_price,COALESCE(MIN(ol.quantity),0) AS lowest_quantity,
    COALESCE(MAX(ol.quantity),0) AS highest_quantity, COALESCE(SUM(ol.quantity),0) AS total_quantity
FROM products p
LEFT JOIN order_lines ol ON p.barcode = ol.barcode
GROUP BY p.barcode;



-- display drone pilot status and current activity including experience
create or replace view drone_pilot_roster (pilot, licenseID, drone_serves_store,
	drone_tag, successful_deliveries, pending_deliveries) as
SELECT dp.uname AS pilot, dp.licenseID AS licenseID, d.storeID AS drone_serves_store, d.droneTag AS drone_tag,
dp.experience as successful_deliveries, COUNT(o.orderID) AS pending_deliveries
FROM drone_pilots AS dp
LEFT JOIN drones d ON dp.uname = d.pilot
LEFT JOIN orders o ON d.storeID = o.carrier_store AND d.droneTag = o.carrier_tag
GROUP BY dp.uname, dp.licenseID, d.storeID, d.droneTag;


-- display store revenue and activity
create or replace view store_sales_overview (store_id, sname, manager, revenue,
	incoming_revenue, incoming_orders) as
select
    s.storeID,
    s.sname,
    s.manager as manager,
    s.revenue,
    ifnull(sum(ol.price * ol.quantity), 0) as incoming_revenue,
    count(distinct o.orderID) as incoming_orders
from
    stores s
left join
    orders o on s.storeID = o.carrier_store
left join
    order_lines ol on o.orderID = ol.orderID
group by
    s.storeID;


-- display the current orders that are being placed/in progress
create or replace view orders_in_progress (orderID, cost, num_products, payload,
	contents) as
select
    o.orderID,
    sum(ol.price * ol.quantity) as cost,
    count(distinct ol.barcode) as num_products,
    sum(p.weight * ol.quantity) as payload,
    group_concat(p.pname order by p.pname separator ',') as contents -- Note the order by and removal of quantities in the concat
from
    orders o
join
    order_lines ol on o.orderID = ol.orderID
join
    products p on ol.barcode = p.barcode
group by
    o.orderID;



-- remove customer
delimiter // 
create procedure remove_customer
	(in ip_uname varchar(40))
sp_main: begin
	-- place your solution here
	DECLARE has_orders INT;
    DECLARE is_employee INT;
    SELECT COUNT(*) INTO has_orders FROM orders WHERE purchased_by = ip_uname;
    SELECT COUNT(*) INTO is_employee FROM employees WHERE uname = ip_uname;
    IF has_orders = 0 THEN
        DELETE FROM customers WHERE uname = ip_uname;
    END IF;
    IF is_employee = 0 THEN
		DELETE FROM users where uname = ip_uname;
	END IF;
end //
delimiter ;

-- remove drone pilot
delimiter // 
create procedure remove_drone_pilot
	(in ip_uname varchar(40))
sp_main: begin
    if exists (SELECT droneTag FROM drones JOIN drone_pilots 
    ON drones.pilot = drone_pilots.uname WHERE uname = ip_uname)
    then leave sp_main; end if;
    DELETE FROM drone_pilots WHERE uname = ip_uname;
    DELETE FROM employees WHERE uname = ip_uname;
    
    if not exists (SELECT uname FROM customers WHERE uname = ip_uname) then DELETE FROM users 
    WHERE uname = ip_uname; end if;
end //
delimiter ;

-- remove product
delimiter // 
create procedure remove_product
	(in ip_barcode varchar(40))
sp_main: begin
if (select orderID from order_lines WHERE barcode = ip_barcode) is not null then leave sp_main; end if;
    	DELETE FROM products WHERE barcode = ip_barcode;
end //
delimiter ;

-- remove drone
delimiter // 
create procedure remove_drone
	(in ip_storeID varchar(40), in ip_droneTag integer)
sp_main: begin
if (SELECT count(*) FROM orders JOIN drones on (carrier_store, carrier_tag) = (storeID, droneTag) WHERE storeID =
    	ip_storeID and droneTag = ip_droneTag) != 0 then leave sp_main; end if;
    	DELETE FROM drones WHERE storeID = ip_storeID and droneTag = ip_droneTag;

end //
delimiter ;


