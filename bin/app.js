#!/usr/bin/env node
import { todo, addmore } from "./function.js";
import figlet from "figlet";
import chalk from "chalk";
//---------------------------------
const welcomeText = figlet.textSync("Welcome to the Todo app!", {
    font: "Big",
});
//-----------------------------------------------------
async function main() {
    console.log(chalk.blue(welcomeText));
    await todo();
    addmore();
}
main();
