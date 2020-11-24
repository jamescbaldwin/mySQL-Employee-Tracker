const mysql = require("mysql");
const inquirer = require("inquirer");
// let conTab = require("console-table");
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootpassword', //insert personal mySQL password
    database: 'employee_trackerDB'
});
connection.connect((err) => {
    if (err) throw err;
    runCommands();
});


const runCommands = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all positions',
            'View all employees',
            'Add a department',
            'Add a position',
            'Add an employee',
            'View employees by department',
            'View employees by manager',
            'Search a position',
            // 'Update employee positions',
            'Exit'
        ],
    })
    .then((answer) => {
        switch (answer.action) {
            case 'View all departments':
                allDepartments();
                break;
            case 'View all positions':
                allPositions();
                break;
            case 'View all employees':
                allEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a position':
                addPosition();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'View employees by department':
                employeeBYdepartment();
                break;
            case 'View employees by manager':
                    employeeBYmanager();
                    break;
            case 'Search a position':
                searchPosition();
                break;
            // case 'Update employee positions':
            //     updatePosition();
            //     break;
            case 'Exit':
                console.log("Thank you for your interest in our mySQL Employee Tracker! Happy Coding!")
                connection.end();
                break;
        }
    });
};

function allDepartments() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        runCommands();
    });
};

function allPositions() {
    connection.query("SELECT * FROM position", function(err, res) {
        if (err) throw err;
        console.table(res);
        runCommands();
    });
};

function allEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        runCommands();
    });
};

function addDepartment() {
    inquirer.prompt({
        name: 'department',
        type: 'input',
        message: 'Enter the name of the new department:',
        validate: async function confirmStringInput(input) {
            if (input.trim() != "" && input.trim().length <= 25) {
                return true;
            }
            return "Invalid department name. Please limit name to 25 characters or fewer.";
        },
    }).then((answer) => { 
        const query = `INSERT INTO department (name) VALUES (?)`
        connection.query(query, [answer.department], (err, res) => {
            if (err) throw err;
            console.log("New department was successfully created!")
        runCommands();
    });
  });
};

function addPosition() {
    connection.query('SELECT * FROM department', function (err, res) {
        const departmentList = res.map(function (dept) {
            return {
                name: dept.name,
                value: dept.id
            };
        });
        inquirer.prompt([
            {
                name: 'position',
                type: 'input',
                message: 'Enter the title of the new position'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the salary of the new position'
            },
            {
                name: 'department',
                type: 'list',
                message: 'Choose the department of the new position',
                choices: departmentList
            },
            {
                name: 'id',
                type: 'input',
                message: 'Enter the 2-digit positionID that most accurately reflects the department and status of the created position (13-19 for new engineering positions, 22-29 for new sales positions, 32-39 for new finance positions, 42-49 for new legal positions)'
            }
        ]).then((answer) => { 
        connection.query(
            'INSERT INTO position SET ?',
        {
            id: answer.id,
            title: answer.position,
            salary: answer.salary,
            department_id: answer.department,
        },
        function (err, res) {
            if (err) throw err;
            runCommands();
        }
      );
    });
  });
};

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter first name of new employee'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter last name of new employee'
        },
        {
            type: 'list',
            name: 'posID',
            message: 'Choose position_id of new employee',
            choices: 
               [{value: 10, name: 'Lead Engineer', short: '10-Lead Engineer'}, 
                {value: 11, name: 'Software Engineer', short: '11-Software Engineer'},
                {value: 20, name: 'Sales Lead', short: '20-Sales Lead'}, 
                {value: 21, name: 'Sales Rep', short: '21-Sales Rep'},
                {value: 30, name: 'CFO', short: '30-CFO'}, 
                {value: 31, name: 'Accountant', short: '31-Accountant'},
                {value: 40, name: 'Legal Team Lead', short: '40-Legal Team Lead'}, 
                {value: 41, name: 'Lawyer', short: '41-Lawyer'}]
        },
        {
            type: 'list',
            name: 'manID',
            message: 'Choose manager_id of new employee',
            choices: [
            {value: 1, name: 'Ashley Rodriguez', short: '1-Ashley Rodriguez'}, 
            {value: 2, name: 'Tammer Galal', short: '2-Tammer Galal'},
            {value: 3, name: 'Mayer Rothschild', short: '3-Mayer Rothschild'}, 
            {value: 4, name: 'Sarah Lourd', short: '4-Sarah Lourd'}]
        }
    ]).then((answers) => {
        connection.query(
            'INSERT INTO employee SET ?', 
        {
            first_name: answers.firstName,
            last_name: answers.lastName,
            position_id: answers.posID,
            manager_id: answers.manID
        },
        function (err, res) {
            if (err) throw err;
            runCommands();
        }
        );
    })
}

function employeeBYdepartment() {
    inquirer.prompt({
        name: 'department',
        type: 'list',
        message: 'Which department would you like to search?',
        choices: ['Engineering', 'Sales', 'Finance', 'Legal']
    }).then((answers) => {
        switch (answers.department) {
            case 'Engineering':
                return connection.query('SELECT employee.first_name, employee.last_name, position.title FROM employee LEFT JOIN position ON employee.position_id = position.id WHERE position_id BETWEEN 10 AND 19', (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    runCommands();
                });
            case 'Sales':
                return connection.query('SELECT employee.first_name, employee.last_name, position.title FROM employee LEFT JOIN position ON employee.position_id = position.id WHERE position_id BETWEEN 20 AND 29', (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    runCommands();
                });
            case 'Finance':
                return connection.query('SELECT employee.first_name, employee.last_name, position.title FROM employee LEFT JOIN position ON employee.position_id = position.id WHERE position_id BETWEEN 30 AND 39', (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    runCommands();
                });
            case 'Legal':
                return connection.query('SELECT employee.first_name, employee.last_name, position.title FROM employee LEFT JOIN position ON employee.position_id = position.id WHERE position_id BETWEEN 40 AND 49', (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    runCommands();
                });
        }
    })
};

function employeeBYmanager() {
    inquirer.prompt({
        name: 'manager',
        type: 'list',
        message: 'Which department manager would you like to search',
        choices: ['Ashley Rodriguez', 'Tammer Galal', 'Mayer Rothschild', 'Sarah Lourd']
    }).then((answers) => {
        switch (answers.manager) {
            case 'Ashley Rodriguez':
                return connection.query('SELECT employee.first_name, employee.last_name, position.title, position.salary FROM employee LEFT JOIN position ON employee.position_id = position.id WHERE employee.manager_id = 1', (err, res) => {
                    console.table(res);
                    runCommands();
                });
            case 'Tammer Galal':
                return connection.query('SELECT employee.first_name, employee.last_name, position.title, position.salary FROM employee LEFT JOIN position ON employee.position_id = position.id WHERE employee.manager_id = 2', (err, res) => {
                    console.table(res);
                    runCommands();
                });
            case 'Mayer Rothschild':
                return connection.query('SELECT employee.first_name, employee.last_name, position.title, position.salary FROM employee LEFT JOIN position ON employee.position_id = position.id WHERE employee.manager_id = 3', (err, res) => {
                    console.table(res);
                    runCommands();
                });
            case 'Sarah Lourd':
                return connection.query('SELECT employee.first_name, employee.last_name, position.title, position.salary FROM employee LEFT JOIN position ON employee.position_id = position.id WHERE employee.manager_id = 4', (err, res) => {
                    console.table(res);
                    runCommands();
                });
        }
    })
}
//brief data on each position
function searchPosition() {
    inquirer.prompt({
        name: 'position',
        type: 'list',
        message: 'Which position would you like to search?',
        choices: ['Lead Engineer', 'Software Engineer', 'Sales Lead', 'Sales Rep', 'CFO', 'Accountant', 'Legal Team Lead', 'Lawyer']
    }).then((answer) => { 
    const query = 'SELECT * FROM position WHERE ?';
    connection.query(query, {title: answer.position}, (err, res) => {
        if (err) throw err;
        res.map((r) => 
        console.log("\n", "\n", `id: ${r.id} || title: ${r.title} || salary: ${r.salary} || department_id: ${r.department_id}`, "\n", "\n")
        );
        runCommands();
    });
  });
};

// function updatePosition = () => {
//     inquirer.prompt(
//         {
//         name: 'employee',
//         type: 'list',
//         message: 'Which employees position would you like to update (surname)?',
//         choices: [emp1, emp2, emp3, emp4,]
//         },
//         {
//         name: 'position',
//         type: 'input',
//         message: 'Enter the new position for this employee'
//         }
//     ).then((answer) => { 
//     const query = 'UPDATE employee SET WHERE ?';
//     connection.query(query, {last_name: answer.employee}, (err, res) => {
//         if (err) throw err;
//         res.map((r) => 
//         console.log(`id: ${r.id} || first_name: ${r.first_name} || last_name: ${r.last_name} || position_id: ${answer.position} || manager_id: ${r.manager_id}`)
//         );
//         runCommands();
//     });
//   });
// };