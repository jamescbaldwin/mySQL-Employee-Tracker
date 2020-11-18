const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootpassword',
    database: 'employee_trackerDB'
});
connection.connect((err) => {
    if (err) throw err;
    userCommand();
});

const userCommand = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'Add a department',
            'Add a position',
            'Add an employee',
            'View a department',
            'View a position',
            'View an employee',
            'Update employee positions',
            'Update employee managers',
            'View employees by manager',
            'Delete department',
            'Delete position',
            'Delete employee',
            'View labor cost per department',
            'View labor cost per employee',
            'View labor budget per manager',
            'Exit'
        ],
    })
    .then((answer) => {
        switch (answer.action) {
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a position':
                addPosition();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'View a department':
                viewDepartment();
                break;
            case 'View a position':
                viewPosition();
                break;
            case 'View an employee':
                viewEmployee();
                break;
            case 'Update employee positions':
                updatePosition();
                break;
            case 'Update employee managers':
                updateManager();
                break;
            case 'View employees by manager':
                viewManager();
                break;
            case 'Delete department':
                deleteDepartment();
                break;
            case 'Delete position':
                deletePosition();
                break;
            case 'View labor cost per department':
                laborDepartment();
                break;
            case 'View labor cost per employee':
                laborEmployee();
                break;
            case 'View labor budget per manager':
                laborManager();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
};


