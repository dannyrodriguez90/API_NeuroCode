import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Gestor de Opniones Academicas API", 
            version: "3.0.0",
            description: "API para gestionar las opiniones academicas de los estudiantes",
            contact:{
                name: "Danny Rodriguez",
                email: "drodriguez-2020522@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://localhost:3001/neuroCode/v1"
            }
        ]
    },
    apis:[
        "./src/curso/curso.routes.js",
        "./src/publicaciones/publicacion.routes.js",
        "./src/comentarios/comentario.routes.js",
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}