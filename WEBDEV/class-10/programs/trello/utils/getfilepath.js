import path from "node:path"
import { fileURLToPath } from "url"

export function getFilePath(file=""){
        const pathname = path.resolve(fileURLToPath(import.meta.url))
        const filePath = path.join(path.dirname(pathname),file)
        return filePath
}