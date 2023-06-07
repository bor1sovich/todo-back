const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");
const { initDB } = require("./db");

fastify.register(cors, {

});

fastify.register(require("./api/todos"), { prefix: "/todos" });

fastify.listen({ port: 8080 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});

initDB();
