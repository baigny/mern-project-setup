import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MERN Project API",
            version: "1.0.0",
            description: "API documentation for the MERN Project",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local Development server",
            },
        ],
    },
    //scan all routes for documentation
    apis: ["./src/routes/**/*.js"], // Path to the API routes for documentation
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
