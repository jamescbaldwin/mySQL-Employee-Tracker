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
    runCommands();
});

const runCommands = () => {
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
            case 'Delete employee':
                deleteEmployee();
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

const addDepartment = () => {
    inquirer.prompt({
        name: 'department',
        type: 'input',
        message: 'Enter the name of the new department'
    }).then((answer) => { 
        connection.query(
            'INSERT INTO department SET ?',
        {
            id: 'INT PRIMARY KEY',
            name: answer.department
        },
        (err) => {
        if (err) throw err;
        console.log(`${answer.department} was added to the TABLE department`);
        runCommands();
    });
  });
};

const addPosition = () => {
    inquirer.prompt(
    {
        name: 'position',
        type: 'input',
        message: 'Enter the name of the new position'
    },
    {
        name: 'salary',
        type: 'input',
        message: 'Enter the salary of the new position'
    },
    {
        name: 'department',
        type: 'input',
        message: 'Enter the department_id of the new position'
    }).then((answer) => { 
        connection.query(
            'INSERT INTO department SET ?',
        {
            id: 'INT PRIMARY KEY',
            title: answer.position,
            salary: answer.salary,
            department_id: answer.department
        },
        (err) => {
        if (err) throw err;
        console.log(`${answer.position} was added to the TABLE position`);
        runCommands();
    });
  });
};

const addEmployee = () => {
    inquirer.prompt(
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
        name: 'position',
        type: 'input',
        message: 'Enter position_id of new employee'
    },
    {
        name: 'manager',
        type: 'input',
        message: 'Enter manager_id of new employee'
    })
    .then((answer) => { 
        connection.query(
            'INSERT INTO employee SET ?',
        {
            id: 'INT PRIMARY KEY',
            first_name: answer.first,
            last_name: answer.last,
            position_id: answer.position,
            manager_id: answer.manager
        },
        (err) => {
        if (err) throw err;
        console.log(`${answer.first} was added to the TABLE employee`);
        runCommands();
    });
  });
};

const viewDepartment = () => {
    const query = 'SELECT...';
    connection.query(query, (query, res) => {
        if (err) throw err;
        res.map((r) => console.log(r.artist));
        runCommands();
    })
};

const viewPosition = () => {
    const query = 'SELECT * FROM ... ';
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.map((r) => console.log(r.artist));
        runCommands();
    });
};

const viewEmployee = () => {
    const query = 'SELECT...';
    connection.query(query, (query, res) => {
        if (err) throw err;
        res.map((r) => console.log(r.artist));
        runCommands();
    })
};

const updatePosition = () => {
    const query = 'SELECT * FROM ... ';
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.map((r) => console.log(r.artist));
        runCommands();
    });
};

const updateManager = () => {
    const query = 'SELECT...';
    connection.query(query, (query, res) => {
        if (err) throw err;
        res.map((r) => console.log(r.artist));
        runCommands();
    })
};

const viewManager = () => {
    const query = 'SELECT * FROM ... ';
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.map((r) => console.log(r.artist));
        runCommands();
    });
};

const deleteDepartment = () => {
    const query = 'SELECT...';
    connection.query(query, (query, res) => {
        if (err) throw err;
        res.map((r) => console.log(r.artist));
        runCommands();
    })
};

const deletePosition = () => {
    const query = 'SELECT * FROM ... ';
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.map((r) => console.log(r.artist));
        runCommands();
    });
};

const deleteEmployee = () => {
    const query = 'SELECT * FROM ... ';
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.map((r) => console.log(r.artist));
        runCommands();
    });
};

const laborDepartment = () => {
    const query = 'SELECT...';
    connection.query(query, (query, res) => {
        if (err) throw err;
        res.map((r) => console.log(r.artist));
        runCommands();
    })
};

const laborEmployee = () => {
    const query = 'SELECT * FROM ... ';
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.map((r) => console.log(r.artist));
        runCommands();
    });
};

const laborManager = () => {
    const query = 'SELECT...';
    connection.query(query, (query, res) => {
        if (err) throw err;
        res.map((r) => console.log(r.artist));
        runCommands();
    })
};

const addDepartment = () => {
    const query = 'SELECT * FROM ... ';
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.map((r) => console.log(r.artist));
        runCommands();
    });
};



