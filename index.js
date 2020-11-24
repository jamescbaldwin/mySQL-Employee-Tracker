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
            // 'Add an employee',
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
            // case 'Add an employee':
            //     addEmployee();
            //     break;
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

// function addEmployee() {
//     connection.query('SEELCT * FROM position', function(err, res) {
//         if (err) throw err;
//     inquirer.prompt([
//         {
//         name: "firstName",
//         type: "input",
//         message: "Enter first name of new employee"
//         },
//         {
//         name: "lastName",
//         type: "input",
//         message: "Enter last name of the new employee"
//         },
//         {
//         name: "positionName",
//         type: "list",
//         message: "Enter position of new employee",
//         choices: function() {
//             positionArray = [];
//             result.forEach(result => {
//                 positionArray.push(
//                     result.title
//                 );
//             })
//             return positionArray;
//             }
//           }
//         ])
//         .then(function(answer) {
//             console.log(answer);
//             const position = answer.positionName;
//             connection.query('SELECT * FROM position', function(err, res) {
//                 if (err) throw err;
//                 let filteredPosition = res.filter(function(res) {
//                     return res.title == position;
//                 })
//             let positionId = filteredPosition[0].id;
//             connection.query('SELECT * FROM employee', function(err, res) {
//                 inquirer.prompt([
//                     {
//                         name: "manager",
//                         type: "list",
//                         message: "Select manager of new employee",
//                         choices: function() {
//                             managerArray = []
//                             res.forEach(res => {
//                                 managerArray.push(res.last_name)
//                             })
//                             return managerArray;
//                         }
//                     }
//                 ]).then(function(managerAnswer) {
//                     const manager = managerAnswer.manager;
//                     connection.query('SELECT * FROM employee', function(err, res) {
//                         if (err) throw err;
//                         let filteredManager = res.filter(function(res) {
//                             return res.last_name == manager;
//                         })
//                         let managerId = filteredManager[0].id;
//                         console.log(managerAnswer);
//                         let query = "INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES (?, ?, ?, ?)";
//                         let values = [answer.firstName, answer.lastName, positionId, managerId]
//                         console.log(values);
//                         connection.query(query, values,
//                             function(err, res, fields) {
//                                 console.log(`You have successfully added ${(values[0]).toUpperCase()}`)
//                             })
//                             runCommands();
//                     })
//                 })
//              })
//            })
//         })
//      })
//     }

//                      {
//     connection.query('SELECT * FROM department', function (err, res) {
//         if (err) throw err;
//         const departments = res.map(function (depQ) {
//             return {
//                 name: depQ.name,
//                 value: depQ.id
//             };
//         });
//         inquirer.prompt([
//             {
//                 name: 'first',
//                 type: 'input',
//                 message: 'Enter first name'
//             },
//             {
//                 name: 'last',
//                 type: 'input',
//                 message: 'Enter last name'
//             },
//             {
//                 name: 'department',
//                 type: 'list',
//                 message: 'Enter the department of the new employee',
//                 choices: departments
//             }
//         ]).then(function (data) {
//             const newEmployee = data;
//             connection.query('SELECT *  FROM position WHERE department_id = "+newEmployee.department+"', function (err, res) {
//                 if (err) throw err;
//                 const empPosition = res.map(function (position) {
//                     return {
//                         name: position.title,
//                         value: positions.id
//                     };
//                 });
//                 inquirer.prompt([
//                     {
//                         type: "list",
//                         name: "positions",
//                         message: "Select a job title for the new employee",
//                         choices: empPosition
//                     }
//                 ]).then(function (data) {
//                     const newPosition = data.positions;
//                     connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS manager FROM employee", function(err, res) {
//                         if (err) throw err;
//                         const empManager = res.map(function(jeffe) {
//                             return {
//                                 name: jeffe.manager,
//                                 value: jeffe.id
//                             }
//                         })
//                         inquirer.prompt([
//                             {
//                                 type: "list",
//                                 name: "manager",
//                                 message: "Who will be the new employees manager?",
//                                 choices: empManager
//                             }
//                         ]).then(function(data) {
//                             connection.query("INSERT INTO employee SET ?",
//                             {
//                                 first_name: newEmployee.first_name,
//                                 last_name: newEmployee.last_name,
//                                 position_id: newPosition,
//                                 manager_id: data.manager
//                             },
//                             function(err, res) {
//                                 if (err) throw err;
//                                 runCommands();
//                             })
//                         })
//                     })
//                 })
//             })
//         })
//     });
// };

//employee BY department
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