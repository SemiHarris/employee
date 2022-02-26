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

INSET INTO employee (first_name, last_name, role_id)




SELECT position.*, department.name AS department_name
FROM position
LEFT JOIN department ON position.department_id = department.id;