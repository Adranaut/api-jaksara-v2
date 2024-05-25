/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable("quiz", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    question: {
      type: "TEXT",
      notNull: true,
    },
    img_url: {
      type: "TEXT",
      notNull: true,
    },
    has_img: {
      type: "BOOLEAN",
      notNull: false,
    },
    correct_answer: {
      type: "TEXT",
      notNull: true,
    },
    incorrect_answer1: {
      type: "TEXT",
      notNull: true,
    },
    incorrect_answer2: {
      type: "TEXT",
      notNull: true,
    },
    incorrect_answer3: {
      type: "TEXT",
      notNull: true,
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
  pgm.dropTable("quiz");
};
