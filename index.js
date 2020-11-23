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
            // 'Add a department',
            // 'Add a position',
            // 'Add an employee',
            // 'View a department',
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
            // case 'Add a department':
            //     addDepartment();
            //     break;
            // case 'Add a position':
            //     addPosition();
            //     break;
            // case 'Add an employee':
            //     addEmployee();
            //     break;
            // case 'View a department':
            //     viewDepartment();
            //     break;
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

const allDepartments = () => {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        runCommands();
    });
};

const allPositions = () => {
    connection.query("SELECT * FROM position", function(err, res) {
        if (err) throw err;
        console.table(res);
        runCommands();
    });
};

const allEmployees = () => {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        runCommands();
    });
};

// const addDepartment = () => {
//     inquirer.prompt({
//         name: 'department',
//         type: 'input',
//         message: 'Enter the name of the new department:',
//         validate: async function confirmStringInput(input) {
//             if (input.trim() != "" && input.trim().length <= 30) {
//                 return true;
//             }
//             return "Invalid department name. Please limit name to 30 characters or fewer.";
//         },
//     }).then((answer) => { 
//         const query = `INSERT INTO department (name) VALUES (?)`
//         connection.query(query, [answer.department], (err, res) => {
//             if (err) throw err;
//             console.log("New department was successfully created!")
//         runCommands();
//     });
//   });
// };

// const addPosition = () => {
//     inquirer.prompt(
//     {
//         name: 'position',
//         type: 'input',
//         message: 'Enter the name of the new position'
//     },
//     {
//         name: 'salary',
//         type: 'input',
//         message: 'Enter the salary of the new position'
//     },
//     {
//         name: 'department',
//         type: 'input',
//         message: 'Enter the department_id of the new position'
//     }).then((answer) => { 
//         connection.query(
//             'INSERT INTO department SET ?',
//         {
//             id: 'INT PRIMARY KEY',
//             title: answer.position,
//             salary: answer.salary,
//             department_id: answer.department
//         },
//         (err) => {
//         if (err) throw err;
//         console.log(`${answer.position} was added to the TABLE position`);
//         runCommands();
//     });
//   });
// };

// const addEmployee = () => {
//     inquirer.prompt(
//     {
//         name: 'first',
//         type: 'input',
//         message: 'Enter first name'
//     },
//     {
//         name: 'last',
//         type: 'input',
//         message: 'Enter last name'
//     },
//     {
//         name: 'position',
//         type: 'input',
//         message: 'Enter position_id of new employee'
//     },
//     {
//         name: 'manager',
//         type: 'input',
//         message: 'Enter manager_id of new employee'
//     })
//     .then((answer) => { 
//         connection.query(
//             'INSERT INTO employee SET ?',
//         {
//             first_name: answer.first,
//             last_name: answer.last,
//             position_id: answer.position,
//             manager_id: answer.manager
//         },
//         (err) => {
//         if (err) throw err;
//         console.log(`${answer.first} was added to the TABLE employee`);
//         runCommands();
//     });
//   });
// };

// const viewDepartment = () => {
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

// const viewPosition = () => {
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

// const viewEmployee = () => {
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

// const updatePosition = () => {
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

// const updateManager = () => {
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

// const viewManager = () => {
//     const query = 'SELECT * FROM ... ';
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         res.map((r) => console.log(r.artist));
//         runCommands();
//     });
// };

// const deleteDepartment = () => {
//     const query = 'SELECT...';
//     connection.query(query, (query, res) => {
//         if (err) throw err;
//         res.map((r) => console.log(r.artist));
//         runCommands();
//     })
// };

// const deletePosition = () => {
//     const query = 'SELECT * FROM ... ';
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         res.map((r) => console.log(r.artist));
//         runCommands();
//     });
// };

// const deleteEmployee = () => {
//     const query = 'SELECT * FROM ... ';
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         res.map((r) => console.log(r.artist));
//         runCommands();
//     });
// };

// const laborDepartment = () => {
//     const query = 'SELECT...';
//     connection.query(query, (query, res) => {
//         if (err) throw err;
//         res.map((r) => console.log(r.artist));
//         runCommands();
//     })
// };

// const laborEmployee = () => {
//     const query = 'SELECT * FROM ... ';
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         res.map((r) => console.log(r.artist));
//         runCommands();
//     });
// };

// const laborManager = () => {
//     const query = 'SELECT...';
//     connection.query(query, (query, res) => {
//         if (err) throw err;
//         res.map((r) => console.log(r.artist));
//         runCommands();
//     })
// };

// const addDepartment = () => {
//     const query = 'SELECT * FROM ... ';
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         res.map((r) => console.log(r.artist));
//         runCommands();
//     });
// };




