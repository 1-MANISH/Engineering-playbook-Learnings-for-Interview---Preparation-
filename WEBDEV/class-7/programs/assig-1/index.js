import {Command} from "commander"
import fs from "fs"
const program = new Command()

program
        .name('count-words')
        .description('count the number of words in a file')
        .version('1.0.0')

program
        .command('count-words')
        .argument('<file>')
        .option('-w, --words', 'count words')
        .option('-c', 'count characters')
        .action((file,option)=>{

               
                const data = fs.readFileSync(file,'utf-8')
                console.log(data)

                if(option.words){
                       const words = data.split(' ')
                       console.log(words.length)
                }else{
                        const characters = data.split('')
                        console.log(characters.length)
                }
               
        })

program.parse()