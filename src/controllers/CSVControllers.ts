import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../db/database";
import fs from "node:fs/promises";

export default {
  async importCSVTable(req: FastifyRequest, rep: FastifyReply) {
    const file = await req.file()

    if (!file) {
      return rep.status(403).send({ msg: 'File not found' })
    }

    const filename = file.filename.split('.')

    if (filename[filename.length - 1] !== 'csv') {
      return rep.status(400).send({ msg: 'File is not a CSV' })
    }

    //await promisify(file.file, fs.writeFile(`./uploads/${file.filename}`,""))
  },

  async exportCSVTable(req: FastifyRequest, rep: FastifyReply) {
    const allTasks = await db('tasks').select()

    const databasePath = new URL('../tasks.csv', import.meta.url)

    const textLines: string[] = []

    textLines.push('title, description, completed_at\n')

    allTasks.map(async (task) => {
      textLines.push(`${task.title}, ${task.description}, ${task.completed_at ? `completed_at: ${task.completed_at}` : 'incompleted'}\n`)
    })

    await fs.writeFile(databasePath, textLines)

    const fileStream = await fs.readFile(databasePath)

    rep.status(200).type('text/csv').send(fileStream)

    fs.rm(databasePath)
  }
}