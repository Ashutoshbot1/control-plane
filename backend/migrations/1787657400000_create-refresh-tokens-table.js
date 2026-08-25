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
  pgm.createTable("refresh_tokens", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: "users",
    },
    token_selector: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },
    token_hash: {
      type: "text",
      notNull: true,
    },
    expires_at: {
      type: "timestamptz",
      notNull: true,
    },
    revoked_at: {
      type: "timestamptz",
    },
    replaced_by_token_id: {
      type: "integer",
      references: "refresh_tokens",
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.addConstraint("refresh_tokens", "refresh_tokens_not_self_replaced", {
    check: "replaced_by_token_id IS NULL OR replaced_by_token_id <> id",
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("refresh_tokens");
};
