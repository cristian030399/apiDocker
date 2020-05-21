const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Conexion con la base de datos exitosa");
    })
    .catch(err => {
        console.log("No se pudo establecer conexion con la base de datos", err);
        process.exit();
    });



require("./app/routes/user.routes")(app);


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "User API",
            description: "User API",
            contact: {
                name: "Cristian Vargas"
            },
            servers: ["http://localhost:8081"]
        }
    },
    apis: ["./app/routes/user.routes.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});