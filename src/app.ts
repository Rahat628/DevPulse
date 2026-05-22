import express, { type Application } from "express"
import authRouter from "./modules/auth/auth.route";
import issuesRouter from "./modules/issues/issues.route";
import cors from "cors"

const app: Application = express();

app.use(express.json())
app.use(cors())

// Routes

app.use('/api/auth', authRouter)

app.use('/api/issues',issuesRouter)

export default app
