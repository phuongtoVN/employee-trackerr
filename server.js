const inquirer = require('inquirer');
const mysql = require('mysql2');
const fs = require('fs');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'company_db',
});

const options = [
  {
    name: "option",
    message: "What would you like to do?",
    type: "list",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
  },
];

const addDepartment = {
  name: "department",
  message: "What is the name of the department?",
  type: "input",
};

const addRole = [
  {
    name: "role",
    message: "What is the name of the role?",
    type: "input",
  },
  {
    name: "salary",
    message: "What is the salary of the role?",
    type: "input",
  },
  {
    name: "department",
    message: "Which department does the role belong to?",
    type: "list",
    choices: [
      "Engineering",
      "Finance",
      "Legal",
      "Sales",
      "Service",
    ],
  },
];

const addEmployee = [
  {
    name: "first_name",
    message: "What is employee's first name?",
    type: "input",
  },
  {
    name: "last_name",
    message: "What is employee's last name",
    type: "input",
  },
  addRole[0],
  {
    name: "manager",
    message: "Who is employee's manager?",
    type: "list",
    choices: [
      "None",
      "Samy Wang",
      "Kim Nguyen",
      "Kiyoko Ayamake",
      "John White",
      "Madison Tran",
      "Minkee Sato",
    ],
  },
];

const updateEmployee = [
  {
    name: "employee",
    message: "Which employee's role do you want to update?",
    type: "list",
    choices: [],
  },
  {
    name: "role",
    message: "Which role do you want to assign the selected employee?",
    type: "input",
  },
];

function fetchEmployeeNames() {
  connection.query('SELECT first_name, last_name FROM employee', (error, results) => {
    if (error) {
      console.error('Error fetching employee names:', error);
      return;
    }

    // Extract the employee names from the query results
    const employeeNames = results.map((row) => `${row.first_name} ${row.last_name}`);

    // Update the choices array in the updateEmployee object
    updateEmployee[0].choices = employeeNames;
  });
}

function promptUser() {
  inquirer.prompt(options).then((answers) => {
    const selectedOption = answers.option;

    if (selectedOption === "View All Employees") {
      // Fetch and display all employees from the database
      connection.query('SELECT * FROM employee', (error, results) => {
        if (error) {
          console.error('Error fetching employees:', error);
          return;
        }
  
        console.table(results);
      });
    } else if (selectedOption === "Add Employee") {
      // Prompt user to add a new employee
      inquirer.prompt(addEmployee).then((employeeAnswers) => {
        // Insert the new employee into the database
        connection.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
          [
            employeeAnswers.first_name,
            employeeAnswers.last_name,
            employeeAnswers.role,
            employeeAnswers.manager === "None" ? null : employeeAnswers.manager,
          ],
          (error, results) => {
            if (error) {
              console.error('Error adding employee:', error);
              return;
            }
  
            console.log("Employee added successfully!");
          }
        );
      });
    } else if (selectedOption === "Update Employee Role") {
      // Prompt user to select an employee and the new role
      inquirer.prompt(updateEmployee).then((updateAnswers) => {
        // Update the employee's role in the database
        connection.query(
          `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`,
          [updateAnswers.role, updateAnswers.employee.split(' ')[0], updateAnswers.employee.split(' ')[1]],
          (error, results) => {
            if (error) {
              console.error('Error updating employee role:', error);
              return;
            }
  
            console.log("Employee role updated successfully!");
          }
        );
      });
    } else if (selectedOption === "Add Role") {
      // Prompt user to add a new role
      inquirer.prompt(addRole).then((roleAnswers) => {
        // Insert the new role into the database
        connection.query(
          `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
          [roleAnswers.role, roleAnswers.salary, roleAnswers.department],
          (error, results) => {
            if (error) {
              console.error('Error adding role:', error);
              return;
            }
  
            console.log("Role added successfully!");
          }
        );
      });
    } else if (selectedOption === "View All Departments") {
      // Fetch and display all departments from the database
      connection.query('SELECT * FROM department', (error, results) => {
        if (error) {
          console.error('Error fetching departments:', error);
          return;
        }
  
        console.table(results);
      });
    } else if (selectedOption === "Add Department") {
      // Prompt user to add a new department
      inquirer.prompt(addDepartment).then((departmentAnswer) => {
        // Insert the new department into the database
        connection.query(
          `INSERT INTO department (name) VALUES (?)`,
          [departmentAnswer.department],
          (error, results) => {
            if (error) {
              console.error('Error adding department:', error);
              return;
            }
  
            console.log("Department added successfully!");
  
            // Append the new department to the seeds.sql file
            const seedQuery = `INSERT INTO department (id, name) VALUES (${results.insertId}, '${departmentAnswer.department}');\n`;
            fs.appendFile('seeds.sql', seedQuery, (error) => {
              if (error) {
                console.error('Error updating seeds.sql:', error);
                return;
              }
  
              console.log("seeds.sql updated successfully!");
            });
          }
        );
      });
    } else if (selectedOption === "Quit") {
      // End the connection and exit the program
      connection.end();
      process.exit();
    }
  });
}

fetchEmployeeNames();

// Call the promptUser function to start the prompt
promptUser();
