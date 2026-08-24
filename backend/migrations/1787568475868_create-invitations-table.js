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
  pgm.createTable("invitations", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: "users",
    },
    invited_by_user_id: {
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
    accepted_at: {
      type: "timestamptz",
    },
    revoked_at: {
      type: "timestamptz",
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.addConstraint("invitations", "invitations_not_accepted_and_revoked", {
    check: "NOT (accepted_at IS NOT NULL AND revoked_at IS NOT NULL)",
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("invitations");
};
