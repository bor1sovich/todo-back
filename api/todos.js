const { sequelize } = require("../db");
const todo = require("../db/models/todo.model");

async function routes(fastify, options) {
  fastify.get("/", async (_, res) => {
    try {
      const todoList = await todo.findAll({
        order: sequelize.col('id')
      });
      res.code(200).send({ todoList});
    } catch (error) {
      res.code(500).send({ error: error.message });
    }
  });

  fastify.get("/:id", async (req, res) => {
    try {
      const ToDo = await todo.findByPk(req.params.id);
      if (ToDo === null) {
        res.code(404).send({ message: "Not found!" });
      } else {
        res.code(200).send({ ToDo });
      }
    } catch (error) {
      res.code(500).send({ error: error.message });
    }
  });

  fastify.post("/", async (req, res) => {
    try {
      await todo.create({
        title: req.body.title,
        description: req.body.description,
      });
      res.code(200).send({ message: "new todo was created" });
    } catch (error) {
      res.code(500).send({ error: error.message });
    }
  });

  //PATCH todo by id
  fastify.patch("/:id", async (req, res) => {
    try {
      const ToDo = await todo.findByPk(req.params.id);
      if (ToDo === null) {
        res.code(404).send({ message: "Not found!" });
      } else {
        await ToDo.update({
          title: req.body.title,
          description: req.body.description,
        });
        res.code(200).send({ message: "todo was updated" });
      }
    } catch (error) {
      res.code(500).send({ error: error.message });
    }
  });

  fastify.delete("/:id", async (req, res) => {
    try {
      const ToDo = await todo.findByPk(req.params.id);
      if (ToDo === null) {
        res.code(404).send({ message: "Not found!" });
      } else {
        await ToDo.destroy();
        res.code(200).send({ message: "todo was deleted" });
      }
    } catch (error) {
      res.code(500).send({ error: error.message });
    }
  });

  fastify.delete("/", async (_, res) => {
    try {
      await todo.destroy({
        where: {},
      });
      res.code(200).send({ message: "all todos were deleted" });
    } catch (error) {
      res.code(500).send({ error: error.message });
    }
  });
}

module.exports = routes;
