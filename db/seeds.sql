INSERT INTO department (name)
VALUES
    ('Electronics'),
    ('Toy'),
    ('Domestics'),
    ('Seasonal'),
    ('Market'),
    ('P Fresh'),
    ('Softlines');

INSERT INTO position (id, title, salary, department_id)
VALUES
    (1, 'Manager',6.33 , 1),
    (2, 'Manager',6.33 , 2),
    (3, 'Manager',6.33 , 3),
    (4, 'Manager',6.33 , 4),
    (5, 'Manager',6.33 , 5),
    (6, 'Manager',6.33 , 6),
    (7, 'Manager',6.33 , 7),
    (8, 'Store Attendent', 4 , 1),
    (9, 'Store Attendent', 4 , 2),
    (10, 'Store Attendent', 4 , 3),
    (11, 'Store Attendent', 4 , 4),
    (12, 'Store Attendent', 4 , 5),
    (13, 'Store Attendent', 4 , 6),
    (14, 'Store Attendent', 4 , 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Semi','Harris', 1, NULL),
    ('Terrel','Jones', 2, NULL),
    ('Chandle','Jones', 3, NULL),
    ('Cooper','Kupp', 4, NULL),
    ('Aaron', 'Donald', 5, NULL),
    ('Jamar', 'Chase', 6, NULL),
    ('Deebo', 'Samuel', 7, NULL),
    ('Mac', 'Jones', 8, 1),
    ('Russel', 'Wilson', 9, 2),
    ('Kyler', 'Murray', 10, 3),
    ('Mathew', 'Stafford', 11, 4),
    ('Odall', 'Beckham', 12, 5),
    ('Joe', 'Burrow', 13, 6),
    ('George', 'Kittle', 14, 7);




-- SELECT position.*, department.name AS department_name
-- FROM position
-- LEFT JOIN department ON position.department_id = department.id;


SELECT employee.*, position.title AS role_name
FROM employee
LEFT JOIN position ON employee.role_id = position.id;

SELECT t.first_name, t.last_name,
position.title AS role_name,
m.first_name AS manager_name
FROM employee t
LEFT JOIN employee m ON m.id = t.manager_id
LEFT JOIN position ON t.role_id = position.id;