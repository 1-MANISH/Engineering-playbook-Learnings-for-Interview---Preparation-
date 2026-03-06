
// external packages
// import chalk from "chalk"

// console.log(chalk.blue('Hello World!'))
// console.log(chalk.green('Hello World!'))
// console.log(chalk.yellow('Hello World!')) 

// internal packages
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(filename)


const filepath = path.join(__dirname,"./input.txt")
const data = fs.readFileSync(filepath,"utf-8")
console.log(data)