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
  pgm.createType("access_level", ["VIEW", "EDIT"]);

  pgm.createTable("user_access_assignments", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: "users",
    },
    resource_id: {
      type: "integer",
      references: "resources",
    },
    sub_resource_id: {
      type: "integer",
      references: "sub_resources",
    },
    access_level: {
      type: "access_level",
      notNull: true,
    },
    granted_by_user_id: {
      type: "integer",
      notNull: true,
      references: "users",
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

  pgm.addConstraint(
    "user_access_assignments",
    "user_access_assignments_exactly_one_leaf",
    {
      check:
        "(resource_id IS NOT NULL AND sub_resource_id IS NULL) OR (resource_id IS NULL AND sub_resource_id IS NOT NULL)",
    },
  );

  pgm.createIndex(
    "user_access_assignments",
    ["user_id", "resource_id"],
    {
      name: "user_access_assignments_user_resource_unique",
      unique: true,
      where: "sub_resource_id IS NULL",
    },
  );

  pgm.createIndex(
    "user_access_assignments",
    ["user_id", "sub_resource_id"],
    {
      name: "user_access_assignments_user_sub_resource_unique",
      unique: true,
      where: "sub_resource_id IS NOT NULL",
    },
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("user_access_assignments");
  pgm.dropType("access_level");
};
