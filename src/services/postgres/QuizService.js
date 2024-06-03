const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapQuizToModel } = require("../../utils");

class QuizService {
  constructor() {
    this._pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
    });
  }

  async addQuiz({
    question,
    imgUrl,
    correctAnswer,
    incorrectAnswer1,
    incorrectAnswer2,
    incorrectAnswer3,
  }) {
    const id = nanoid(16);

    let hasImg;
    if (!imgUrl) {
      hasImg = false;
    } else {
      hasImg = true;
    }

    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const query = {
      text: "INSERT INTO quiz VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id",
      values: [
        id,
        question,
        imgUrl,
        hasImg,
        correctAnswer,
        incorrectAnswer1,
        incorrectAnswer2,
        incorrectAnswer3,
        insertedAt,
        updatedAt,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Soal kuis gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async getQuiz() {
    const result = await this._pool.query("SELECT * FROM quiz");
    return result.rows.map(mapQuizToModel);
  }

  async getQuizById(id) {
    const query = {
      text: "SELECT * FROM quiz WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Soal kuis tidak ditemukan");
    }

    return result.rows.map(mapQuizToModel)[0];
  }

  async editQuizById(
    id,
    {
      question,
      imgUrl,
      correctAnswer,
      incorrectAnswer1,
      incorrectAnswer2,
      incorrectAnswer3,
    }
  ) {
    let hasImg;
    if (!imgUrl) {
      hasImg = false;
    } else {
      hasImg = true;
    }
    const updatedAt = new Date().toISOString();
    const query = {
      text: "UPDATE quiz SET question = $1, img_url = $2, has_img = $3, correct_answer = $4, incorrect_answer1 = $5, incorrect_answer2 = $6, incorrect_answer3 = $7, updated_at = $8 WHERE id = $9 RETURNING id",
      values: [
        question,
        imgUrl,
        hasImg,
        correctAnswer,
        incorrectAnswer1,
        incorrectAnswer2,
        incorrectAnswer3,
        updatedAt,
        id,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError(
        "Gagal memperbarui soal kuis. Id tidak ditemukan"
      );
    }
  }

  async deleteQuizById(id) {
    const query = {
      text: "DELETE FROM quiz WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Soal kuis gagal dihapus. Id tidak ditemukan");
    }
  }

  async getTenQuizRandom() {
    const result = await this._pool.query(
      "SELECT * FROM quiz ORDER BY RANDOM() LIMIT 5"
    );
    return result.rows.map(mapQuizToModel);
  }
}

module.exports = QuizService;
