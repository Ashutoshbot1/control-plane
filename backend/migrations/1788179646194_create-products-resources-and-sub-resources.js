/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("products", {
    id: "id",
    name: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },
    description: {
      type: "text",
    },
    launch_url: {
      type: "text",
    },
    archived_at: {
      type: "timestamptz",
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("resources", {
    id: "id",
    product_id: {
      type: "integer",
      notNull: true,
      references: "products",
    },
    name: {
      type: "varchar(255)",
      notNull: true,
    },
    description: {
      type: "text",
    },
    archived_at: {
      type: "timestamptz",
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.addConstraint("resources", "resources_product_id_name_unique", {
    unique: ["product_id", "name"],
  });

  pgm.createTable("sub_resources", {
    id: "id",
    resource_id: {
      type: "integer",
      notNull: true,
      references: "resources",
    },
    name: {
      type: "varchar(255)",
      notNull: true,
    },
    description: {
      type: "text",
    },
    archived_at: {
      type: "timestamptz",
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.addConstraint("sub_resources", "sub_resources_resource_id_name_unique", {
    unique: ["resource_id", "name"],
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("sub_resources");
  pgm.dropTable("resources");
  pgm.dropTable("products");
};
