import { FastifyInstance } from "fastify";
import TaskController from "../controllers/tasksControllers"
import CSVControllers from "../controllers/CSVControllers";

export async function tasksRoutes(app: FastifyInstance) {
  app.get('tasks/', TaskController.getAllTasks)

  app.post('tasks/', TaskController.createTask)

  app.put('tasks/:id', TaskController.updateTask)

  app.delete('tasks/:id', TaskController.deleteTask)

  app.patch('tasks/:id/complete', TaskController.completeTask)

  app.get('tasks/csv', CSVControllers.exportCSVTable)

  app.post('tasks/csv', CSVControllers.importCSVTable)
}