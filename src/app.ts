import "reflect-metadata"
import "express-async-errors"
import express, { Application } from "express"
import loginRoutes from "./routes/login.routes"
import { handleErrors } from "./error"
import userRoutes from "./routes/user.routes"
import realEstateRoutes from "./routes/realEstate.routes"
import schedulesRoutes from "./routes/schedules.routes"


const app: Application = express()
app.use(express.json())

app.use('/users', userRoutes)
app.use('/login', loginRoutes)
app.use('/schedules', schedulesRoutes)
app.use('', realEstateRoutes)

app.use(handleErrors)

export default app
