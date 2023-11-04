import fastify from "fastify";
import { tasksRoutes } from "./routes/taskRoutes";

export const app = fastify()

app.register(tasksRoutes, {
  prefix: 'api/'
})
