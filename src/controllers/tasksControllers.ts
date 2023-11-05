import { FastifyRequest, FastifyReply } from "fastify"
import { db } from "../db/database"
import { randomUUID } from "node:crypto"
import { z } from "zod"
import { formatedDateNow } from "../utils"

export default {
  async getAllTasks() {
    const allTasks = await db('tasks').select()

    return { allTasks }
  },

  async createTask(req: FastifyRequest, rep: FastifyReply) {
    const BodySchema = z.object({
      title: z.string(),
      description: z.string(),
    })

    // Validando os tipos de cada dado a partir do schema
    const dataValidation = BodySchema.safeParse(req.body)

    if (!dataValidation.success) {
      return rep.status(403).send({ msg: 'Incomplete data, please provide the title and description' })
    }

    const { title, description } = dataValidation.data

    await db('tasks').insert({
      id: randomUUID(),
      title,
      description,
    })

    rep.status(201).send()
  },

  async updateTask(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as { id: string };

    if (!id) {
      return rep.status(403).send({ msg: 'Missing Id' })
    }

    const BodySchema = z.object({
      title: z.string(),
      description: z.string(),
    })

    // Validating the types of each data from the schema
    const dataValidation = BodySchema.safeParse(req.body)

    if (!dataValidation.success) {
      return rep.status(403).send({ msg: 'Incomplete data, please provide the title and description' })
    }

    const { title, description } = dataValidation.data

    const taskUp = await db('tasks').where('id', id).first()

    if (!taskUp) {
      return rep.status(404).send({ msg: 'Task not found' })
    }

    await db('tasks')
      .where('id', id)
      .update({
        title,
        description,
      })

    rep.status(201).send()
  },

  async deleteTask(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as { id: string };

    if (!id) {
      return rep.status(403).send({ msg: 'Missing Id' })
    }

    const task = await db('tasks').where('id', id).first()

    if (!task) {
      return rep.status(404).send({ msg: 'Task not found' })
    }

    await db('tasks')
      .where('id', id)
      .delete()

    rep.status(200).send()
  },

  async completeTask(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as { id: string };

    if (!id) {
      return rep.status(403).send({ msg: 'Missing Id' })
    }

    const task = await db('tasks').where('id', id).first()

    if (!task) {
      return rep.status(404).send({ msg: 'Task not found' })
    }

    await db('tasks')
      .where('id', id)
      .update({
        completed_at: formatedDateNow()
      })

    rep.status(201).send()
  },
}