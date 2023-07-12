const inquirer = require('inquirer');

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

const add_department = [
    {
        name: "department",
        message: "What is the name of the department?",
        type: "input",
    }
]

const add_role = [
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
        message: "Which department does sthe role belong to?",
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
const add_employee = [
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
    add_role,
    {
        name: "manager",
        message: "Who is employee?'s manager", 
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

]





