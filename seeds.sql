
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Legal");

INSERT INTO employee (first_name, last_name, position_id) VALUES ("Mayer", "Rothschild", 30);
INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES ("John", "Doe", 21, 2);
INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES ("Mike", "Chan", 21, 2);
INSERT INTO employee (first_name, last_name, position_id) VALUES ("Ashley", "Rodriguez", 10);
INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES ("Kevin", "Tupik", 11, 1);
INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES ("Malia", "Brown", 31, 3);
INSERT INTO employee (first_name, last_name, position_id) VALUES ("Sarah", "Lourd", 40);
INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES ("Tom", "Allen", 41, 4);
INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES ("Christian", "Eckenrode", 11, 1);
INSERT INTO employee (first_name, last_name, position_id) VALUES ("Tammer", "Galal", 20);

INSERT INTO position (id, title, salary, department_id) VALUES (10, "Lead Engineer", 150000, 1);
INSERT INTO position (id, title, salary, department_id) VALUES (11, "Software Engineer", 120000, 1);
INSERT INTO position (id, title, salary, department_id) VALUES (20, "Sales Lead", 100000, 2);
INSERT INTO position (id, title, salary, department_id) VALUES (21, "Sales Rep", 80000, 2);
INSERT INTO position (id, title, salary, department_id) VALUES (30, "CFO", 300000, 3);
INSERT INTO position (id, title, salary, department_id) VALUES (31, "Accountant", 125000, 3);
INSERT INTO position (id, title, salary, department_id) VALUES (40, "Legal Team Lead", 250000, 4);
INSERT INTO position (id, title, salary, department_id) VALUES (41, "Lawyer", 190000, 4);


------------------------------------------------------------------------------------

-- dummy DATA

-- //TABLE employee
-- (0, Mayer, Rothschild, CFO, Finance, 300000, null)
-- (1, John, Doe, Sales Rep, Sales, 80000, Tammer Galal)
-- (2, Mike, Chan, Sales Rep, Sales, 80000, Tammer Galal)
-- (3, Ashley, Rodriguez, Lead Engineer, Engineering, 150000, null)
-- (4, Kevin, Tupik, Software Engineer, Engineering, 120000, Ashley Rodriguez)
-- (5, Malia, Brown, Accountant, Finance, 125000, Hannah Rothschild)
-- (6, Sarah, Lourd, Legal Team Lead, Legal, 250000, null)
-- (7, Tom, Allen, Lawyer, Legal, 190000, Sarah Lourd)
-- (8, Christian, Eckenrode, Software Engineer, Engineering, 120000, Ashley Rodriguez)
-- (9, Tammer, Galal, Sales Lead, Sales, 100000, null)

-- TABLE department
-- 1 Engineering
-- 2 Sales
-- 3 Finance
-- 4 Legal

-- managers
-- 1 Ashley Rodriguez
-- 2 Tammer Galal
-- 3 Mayer Rothschild
-- 4 Sarah Lourd

-- TABLE position
-- 10 Lead Engineer
-- 11 Software Engineer
-- 20 Sales Lead
-- 21 Sales Rep
-- 30 CFO
-- 31 Accountant
-- 40 Legal Team Lead
-- 41 Lawyer