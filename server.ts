import app from "./src/app"
import config from "./src/config"
import { initDB } from "./db/initializeDB"




const main = () => {
  initDB()
  app.listen(config.port, () => {
    console.log(` App listening on port ${config.port}`)
  })
}
main()