import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import authRoutes from "./routes/api/auth.js";
import {notFound, errorHandler} from "./middlewares/errors.js";

const app = express();

//Body Parsers 

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);

//Health Check Route
app.get("/health",(req,res)=>{
    res.json({status:"success", message:"Server is running fine"})
})

app.use(notFound);
app.use(errorHandler);


//Health Check Swagger
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the server
 *     responses:
 *       200:
 *         description: Server is running fine
 */


export default app;
