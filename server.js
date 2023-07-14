const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
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
            "Quit"
        ]
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
            "Service"
        ]
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
        message: "What is employee?'s last name", 
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
            "Minkee Sato"
        ]
    },

];

const updateEmployee = [
    {
        name: "employee",
        message: "Which employee's role do you want to update?",
        type: "list",
        choices: []
    },
    {
        name: "role", 
        message: "Which role do you want to assign the selected employee?"
    }
]


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
      
    });
  }

fetchEmployeeNames();

