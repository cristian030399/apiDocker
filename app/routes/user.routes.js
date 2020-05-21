module.exports = function(app) {
    const user = require("../controllers/user.controller");
    const swaggerJsDoc = require("swagger-jsdoc");
    const swaggerUi = require("swagger-ui-express");

    var router = require("express").Router();

    /**
     * @swagger
     * /user:
     *    post:
     *      tags:
     *        - user 
     *      summary: Crea usuario.
     *      consumes:
     *        - application/json
     *      parameters:
     *        - in: body
     *          name: user
     *          description: Crea usuario.
     *          schema:
     *            type: object
     *            required: 
     *              - name
     *              - email
     *              - userName
     *              - password
     *            properties:
     *              name: 
     *               type: string 
     *              email:
     *                type: string
     *              userName:
     *                type: string
     *              password:
     *                type: string
     *      responses:
     *        201:
     *          description: Created
     */
    router.post('/user', user.create);

    /**
     * @swagger
     * /user:
     *      get:
     *          tags:
     *              - user
     *          summary: Retorna todos los usuarios.
     *          description: Retorna todos los usuarios
     *          produces:
     *           - application/json     *          
     *          responses:
     *              200:
     *                   description: Responde un Json con los usuarios
     */
    router.get('/user', user.findAll);

    /**
     * @swagger
     * /user/{userName} :
     *    put:
     *      tags:
     *        - user
     *      summary: Actualizar usuario.
     *      consumes:
     *        - application/json
     *      parameters:
     *        - in: body
     *          name: user
     *          description: Actualizar usuario.
     *          schema:
     *            type: object
     *            required: 
     *              - name    
     *              - email
     *              - username
     *              - password
     *            properties:
     *              name: 
     *               type: string 
     *              email:
     *                type: string
     *              userName:
     *                type: string
     *              password:
     *                type: string
     *        - in: path
     *          name: userName   
     *          required: true 
     *          description: Nombre de usuario al cual se le va a hacer la actualización
     *          type: string
     *      responses:
     *        201:
     *          description: Actualizacón
     */
    router.put("/user/:userName", user.update);

    /**
     * @swagger
     * /user/{userName} :
     *      delete:
     *          tags:
     *              - user
     *          summary: Elimina un usuario.
     *          description: Elimina un usuario
     *          produces:
     *           - application/json
     *          parameters:
     *            - in: path
     *              name: userName   
     *              required: true 
     *              description: Nombre de usuario al cual se va a eliminar.
     *              type: string
     *              responses:
     *              200:
     *                   description: REspondo una confirmación de que el usuario se eliminó
     */
    router.delete('/user/:userName', user.delete);

    router.get("/", (req, res) => {
        res.json({ message: "Bienvenido a la app register user" });
    });

    //Ruta predeterminada
    app.use('/', router);
};