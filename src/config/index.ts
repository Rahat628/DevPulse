import dotenv from "dotenv"
import path from "path/win32"

dotenv.config({path: path.join(process.cwd(),".env")})

const config = {
    port : process.env.PORT
}

export default config;