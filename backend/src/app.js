import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();

//Body Parsers 

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

//Health Check Route
app.get("/health",(req,res)=>{
    res.json({status:"success", message:"Server is running fine"})
})

export default app;
