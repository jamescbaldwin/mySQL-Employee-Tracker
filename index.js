const mysql = require("mysql");
const inquirer = require("inquirer");
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
            'View a department',
            // 'View a position',
            // 'View an employee',
            // 'Update employee positions',
            // 'Update employee managers',
            // 'View employees by manager',
            // 'Delete department',
            // 'Delete position',
            // 'Delete employee',
            // 'View labor cost per department',
            // 'View labor cost per employee',
            // 'View labor budget per manager',
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
            case 'View a department':
                viewDepartment();
                break;
            // case 'View a position':
            //     viewPosition();
            //     break;
            // case 'View an employee':
            //     viewEmployee();
            //     break;
            // case 'Update employee positions':
            //     updatePosition();
            //     break;
            // case 'Update employee managers':
            //     updateManager();
            //     break;
            // case 'View employees by manager':
            //     viewManager();
            //     break;
            // case 'Delete department':
            //     deleteDepartment();
            //     break;
            // case 'Delete position':
            //     deletePosition();
            //     break;
            // case 'Delete employee':
            //     deleteEmployee();
            //     break;
            // case 'View labor cost per department':
            //     laborDepartment();
            //     break;
            // case 'View labor cost per employee':
            //     laborEmployee();
            //     break;
            // case 'View labor budget per manager':
            //     laborManager();
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
            if (input.trim() != "" && input.trim().length <= 30) {
                return true;
            }
            return "Invalid department name. Please limit name to 30 characters or fewer.";
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
                message: 'Enter the 2-digit positionID that most accurately reflects the department and status of the created position'
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
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        const departments = res.map(function (depQ) {
            return {
                name: depQ.name,
                value: depQ.id
            };
        });
        inquirer.prompt([
            {
                name: 'first',
                type: 'input',
                message: 'Enter first name'
            },
            {
                name: 'last',
                type: 'input',
                message: 'Enter last name'
            },
            {
                name: 'department',
                type: 'list',
                message: 'Enter the department of the new employee',
                choices: departments
            }
        ]).then(function (data) {
            const newEmployee = data;
            connection.query('SELECT *  FROM position WHERE department_id = "+newEmployee.department+"', function (err, res) {
                if (err) throw err;
                const empPosition = res.map(function (position) {
                    return {
                        name: position.title,
                        value: position.id
                    };
                });
                inquirer.prompt([
                    {
                        type: "list",
                        name: "positions",
                        message: "Select a job title for the new employee",
                        choices: empPosition
                    }
                ]).then(function (data) {
                    const newPosition = data.positions;
                    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS manager FROM employee", function(err, res) {
                        if (err) throw err;
                        const empManager = res.map(function(jeffe) {
                            return {
                                name: jeffe.manager,
                                value: jeffe.id
                            }
                        })
                        inquirer.prompt([
                            {
                                type: "list",
                                name: "manager",
                                message: "Who will be the new employees manager?",
                                choices: empManager
                            }
                        ]).then(function(data) {
                            connection.query("INSERT INTO employee SET ?",
                            {
                                first_name: newEmployee.first_name,
                                last_name: newEmployee.last_name,
                                position_id: newPosition,
                                manager_id: data.manager
                            },
                            function(err, res) {
                                if (err) throw err;
                                runCommands();
                            })
                        })
                    })
                })
            })
        })
    });
}

function viewDepartment() {
    const query = `SELECT department.name AS department, position.title, employee.id, employee.first_name, employee.last_name
    FROM employee
    LEFT JOIN position ON (position.id = employee.position_id)
    LEFT JOIN department ON (department.id = position.department_id)
    ORDER BY department.name;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE BY DEPARTMENT');
        console.log('\n');
        console.table(res);
        runCommands();
    });
};
//     inquirer.prompt({
//         name: 'department',
//         type: 'list',
//         message: 'Which department would you like to search?',
//         choices: ["Engineering", "Sales", "Finance", "Legal"]
//     })
//     .then((answer) => {
//         const query = 'SELECT * FROM department WHERE ?';
//         connection.query(query, {name: answer.department}, (err, res) => {
//         if (err) throw err;
//         res.map((r) => 
//             console.log(`id: ${r.id} || name: ${r.name}`)
//             );
//         runCommands();
//     });
//   });
// };

// function viewPosition = () => {
//     inquirer.prompt({
//         name: 'position',
//         type: 'list',
//         message: 'Which position would you like to search?',
//         choices: ['Lead Engineer', 'Software Engineer', 'Sales Lead', 'Sales Rep', 'CFO', 'Accountant', 'Legal Team Lead', 'Lawyer']
//     }).then((answer) => { 
//     const query = 'SELECT * FROM position WHERE ?';
//     connection.query(query, {title: answer.position}, (err, res) => {
//         if (err) throw err;
//         res.map((r) => 
//         console.log(`id: ${r.id} || title: ${r.title} || salary: ${r.salary} || department_id: ${r.department_id}`)
//         );
//         runCommands();
//     });
//   });
// };

// function viewEmployee = () => {
//     inquirer.prompt({
//         name: 'employee',
//         type: 'input',
//         message: 'Which employee (surname) would you like to search?'
//     }).then((answer) => { 
//     const query = 'SELECT * FROM employee WHERE ?';
//     connection.query(query, {last_name: answer.employee}, (err, res) => {
//         if (err) throw err;
//         res.map((r) => 
//         console.log(`id: ${r.id} || first_name: ${r.first_name} || last_name: ${r.last_name} || position_id: ${r.position_id} || manager_id: ${r.manager_id}`)
//         );
//         runCommands();
//     });
//   });
// };

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

// function updateManager = () => {
//     inquirer.prompt(
//         {
//         name: 'employee',
//         type: 'list',
//         message: 'Which employees position would you like to update (surname)?',
//         choices: [emp1, emp2, emp3, emp4, ...]
//         },
//         {
//         name: 'manager',
//         type: 'input',
//         message: 'Enter the new manager for this employee (First + Last)'
//         }
//     ).then((answer) => { 
//     const query = 'UPDATE employee SET WHERE ?';
//     connection.query(query, {last_name: answer.employee}, (err, res) => {
//         if (err) throw err;
//         res.map((r) => 
//         console.log(`id: ${r.id} || first_name: ${r.first_name} || last_name: ${r.last_name} || position_id: ${answer.position} || manager_id: ${answer.manager}`)
//         );
//         runCommands();
//     });
//   });
// };

// function viewManager() {
//     const query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, position.title
//     FROM employee
//     LEFT JOIN employee manager on manager.id = employee.manager_id
//     INNER JOIN position ON (position.id = employee.position_id && employee.manager_id != 'NULL)
//     INNER JOIN department ON (department.id = position.department_id)
//     ORDER BY manager;`;
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('VIEW EMPLOYEE BY MANAGER');
//         console.log('\n');
//         console.table(res);
//         // res.map((r) => console.log(r.artist));
//         runCommands();
//     });
// };

// function deleteDepartment = () => {
//     const query = 'SELECT...';
//     connection.query(query, (query, res) => {
//         if (err) throw err;
//         res.map((r) => console.log(r.artist));
//         runCommands();
//     })
// };

// function deletePosition = () => {
//     const query = 'SELECT * FROM ... ';
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         res.map((r) => console.log(r.artist));
//         runCommands();
//     });
// };

// function deleteEmployee = () => {
//     const query = 'SELECT * FROM ... ';
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         res.map((r) => console.log(r.artist));
//         runCommands();
//     });
// };

// function laborDepartment = () => {
//     const query = 'SELECT...';
//     connection.query(query, (query, res) => {
//         if (err) throw err;
//         res.map((r) => console.log(r.artist));
//         runCommands();
//     })
// };

// function laborEmployee = () => {
//     const query = 'SELECT * FROM ... ';
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         res.map((r) => console.log(r.artist));
//         runCommands();
//     });
// };

// function laborManager = () => {
//     const query = 'SELECT...';
//     connection.query(query, (query, res) => {
//         if (err) throw err;
//         res.map((r) => console.log(r.artist));
//         runCommands();
//     })
// };

// function addDepartment = () => {
//     const query = 'SELECT * FROM ... ';
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         res.map((r) => console.log(r.artist));
//         runCommands();
//     });
// };