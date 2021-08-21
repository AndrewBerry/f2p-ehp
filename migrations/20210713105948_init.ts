import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("stats", (table) => {
      table.increments("stats_id");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.boolean("is_latest").defaultTo(true);

      table.string("ign", 12).notNullable();
      table.enum("acc_type", ["uim", "hcim", "im", "reg"]);

      table.integer("total_level").defaultTo(0);
      table.integer("total_exp").defaultTo(0);
      table.integer("total_ehp").defaultTo(0);
      table.integer("total_rank").defaultTo(0);
    })
    .createTable("update_requests", (table) => {
      table.string("ign", 12).primary();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    }).raw(`
      CREATE VIEW ranks AS
        SELECT
          ign,
          DENSE_RANK() OVER (ORDER BY total_ehp DESC) AS total_rank
        FROM stats
        WHERE
          is_latest IS TRUE;
    `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .raw("DROP VIEW ranks")
    .dropTable("stats")
    .dropTable("update_requests");
}
