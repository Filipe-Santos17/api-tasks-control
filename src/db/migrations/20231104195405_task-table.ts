import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tasks', (table) => {
    table.uuid('id').primary()
    table.string('title').notNullable()
    table.text('description')
    table.dateTime('completed_at').defaultTo(null)
    table.dateTime('created_at').defaultTo(knex.fn.now()).notNullable()
    table.dateTime('updated_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tasks')
}

