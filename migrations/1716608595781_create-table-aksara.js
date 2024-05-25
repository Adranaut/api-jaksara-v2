/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable("aksara", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    number: {
      type: "VARCHAR(10)",
      notNull: true,
    },
    label: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    img_url: {
      type: "TEXT",
      notNull: false,
    },
    inserted_at: {
      type: "TEXT",
      notNull: true,
    },
    updated_at: {
      type: "TEXT",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("aksara");
};
