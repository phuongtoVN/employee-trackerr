-- Insert sample data into department table
INSERT INTO department (id, name) VALUES
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Finance');

-- Insert sample data into role table
INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Sales Manager', 5000.00, 1),
(2, 'Sales Representative', 3000.00, 1),
(3, 'Marketing Manager', 4500.00, 2),
(4, 'Marketing Specialist', 2800.00, 2),
(5, 'Finance Manager', 6000.00, 3),
(6, 'Finance Analyst', 3500.00, 3);

-- Insert sample data into employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'John', 'Doe', 1, NULL),
(2, 'Jane', 'Smith', 2, 1),
(3, 'Michael', 'Johnson', 3, NULL),
(4, 'Emily', 'Davis', 4, 3),
(5, 'David', 'Wilson', 5, NULL),
(6, 'Emma', 'Anderson', 6, 5);