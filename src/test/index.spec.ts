import { describe, test, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import { execSync } from "node:child_process";
import { app } from '../app'

describe('Tasks', async () => {

  beforeAll(async () => {
    await app.ready()
    console.log("Start testes")
  })

  afterAll(async () => {
    await app.close()
  })

  // With each test, it deletes the bank and creates it again
  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  test('Get All Tasks', async () => {
    await request(app.server)
      .get('/api/tasks/')
      .expect(200)
  })

  test('Create One Task', async () => {
    await request(app.server)
      .post('/api/tasks/')
      .send({
        title: 'teste',
        description: 'Teste descrição',
      })
      .expect(201)
  })

  test('Update One Task', async () => {
    await request(app.server)
      .post('/api/tasks/')
      .send({
        title: 'teste',
        description: 'Teste descrição',
      })
      .expect(201)

    const get = await request(app.server)
      .get('/api/tasks/')
      .expect(200)

    const id = JSON.parse(get.text).allTasks[0].id

    await request(app.server)
      .put(`/api/tasks/${id}`)
      .send({
        title: 'teste 2',
        description: 'Teste descrição 3',
      })
      .expect(201)
  })

  test('Delete One Task', async () => {
    await request(app.server)
      .post('/api/tasks/')
      .send({
        title: 'teste',
        description: 'Teste descrição',
      })
      .expect(201)

    const get = await request(app.server)
      .get('/api/tasks/')
      .expect(200)

    const id = JSON.parse(get.text).allTasks[0].id

    await request(app.server)
      .delete(`/api/tasks/${id}`)
      .expect(200)
  })

  test('Complete One Task', async () => {
    await request(app.server)
      .post('/api/tasks/')
      .send({
        title: 'teste',
        description: 'Teste descrição',
      })
      .expect(201)

    const get = await request(app.server)
      .get('/api/tasks/')
      .expect(200)

    const id = JSON.parse(get.text).allTasks[0].id

    await request(app.server)
      .patch(`/api/tasks/${id}/complete`)
      .expect(201)
  })
})