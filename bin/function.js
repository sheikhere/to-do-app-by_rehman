import inquirer from "inquirer";
import chalk from "chalk";
//-------------------------------------------
export let task_list = 0;
let tasks = [];
let loop = false;
//-------------------------------------------------
export async function addtask() {
    console.log(chalk.green("✔ Task has been added"));
    task_list++;
    console.log(chalk.yellow("Total tasks:"), chalk.cyan(task_list));
}
//---------------------------------------------
export async function todo() {
    let answer = await inquirer.prompt([
        {
            type: "rawlist",
            name: "do",
            message: "Choose the task from list",
            choices: ["Add Task", "Task list", "Complete Task"],
        },
    ]);
    if (answer["do"] === "Add Task") {
        let task = await inquirer.prompt([
            {
                type: "input",
                name: "new",
                message: "Write the task you want to add",
            },
        ]);
        tasks.push(task.new);
        addtask();
        loop = true;
    }
    else if (answer["do"] === "Task list") {
        console.log(chalk.cyan("Task list:"));
        tasks.forEach((task, index) => {
            console.log(chalk.yellow(`${index + 1}. ${task}`));
        });
        loop = true;
    }
    else if (answer["do"] === "Complete Task") {
        console.log(chalk.green("✔ Marking a task as complete"));
        loop = true;
    }
}
//-----------------------------------------------
export async function addmore() {
    let confirmation = await inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Do you want to add more",
            default: false,
        },
    ]);
    if (confirmation.confirm) {
        loop = false; // Set loop to false to finish the current task
        await todo(); // Call todo to complete the current task
        console.log(chalk.green("✓ Task completed. Starting a new task..."));
        addmore(); // Start the next task
    }
    else {
        console.log(chalk.yellow("Goodbye"));
    }
}
//--------------------------------------------------
