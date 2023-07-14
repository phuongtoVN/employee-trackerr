# Employee Tracker

This command-line application allows business owners to view and manage departments, roles, and employees in their company. It provides functionalities to organize and plan the business effectively.

## Installation

To use the Employee Tracker application, follow these steps:

1. Clone the repository to your local machine.
2. Open the terminal and navigate to the project's directory.
3. Install the required dependencies by running the command:
npm install

markdown
Copy code
4. Configure the database connection in the `server.js` file by providing the appropriate values for `host`, `user`, `password`, and `database` variables.
5. Set up the database schema and seed data by executing the SQL commands provided in the `schema.sql` and `seeds.sql` files respectively.

## Usage

Once the installation steps are complete, you can run the application by using the following command in the terminal:

node server.js

sql
Copy code

The application will present you with a menu of options:

- View All Departments
- View All Roles
- View All Employees
- Add a Department
- Add a Role
- Add an Employee
- Update an Employee Role
- Quit

You can use the arrow keys to navigate through the options and press Enter to select an option.

## Features

### View All Departments

Selecting this option will display a formatted table showing the department names and department IDs.

### View All Roles

Selecting this option will display a formatted table showing the job title, role ID, the department that role belongs to, and the salary for that role.

### View All Employees

Selecting this option will display a formatted table showing employee data, including employee IDs, first names, last names, job titles, departments, salaries, and managers that the employees report to.

### Add a Department

Selecting this option will prompt you to enter the name of the department. Once entered, the department will be added to the database.

### Add a Role

Selecting this option will prompt you to enter the name, salary, and department for the role. Once entered, the role will be added to the database.

### Add an Employee

Selecting this option will prompt you to enter the employee's first name, last name, role, and manager. Once entered, the employee will be added to the database.

### Update an Employee Role

Selecting this option will prompt you to select an employee to update and their new role. Once entered, the employee's role will be updated in the database.

## Contributing

Contributions to the Employee Tracker application are welcome! If you find any issues or have suggestions for improvement, please feel free to contribute by creating a pull request.

## License

This project is licensed under the [MIT](LICENSE) license.
