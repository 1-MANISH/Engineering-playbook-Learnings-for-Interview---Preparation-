import fs from "fs"

async function readFileData(path,type){
        try {
                const data =  fs.readFileSync(path,type)
                 return JSON.parse(data)
        } catch (error) {
                throw error
        }
}

async function writeFileData(path,data){
        try {
                fs.writeFileSync(path,JSON.stringify(data))
                return true 
        } catch (error) {
                throw error
        }

}

export {readFileData,writeFileData}