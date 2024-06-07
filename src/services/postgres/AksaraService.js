const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapAksaraToModel } = require("../../utils");

class AksaraService {
  constructor() {
    this._pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
    });
  }

  async addAksara({ number, label, imgUrl }) {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const query = {
      text: "INSERT INTO aksara VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
      values: [id, number, label, imgUrl, insertedAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Aksara gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async getAksara() {
    const result = await this._pool.query(
      "SELECT * FROM aksara ORDER BY CAST(number AS INTEGER) ASC"
    );
    return result.rows.map(mapAksaraToModel);
  }

  async getAksaraById(id) {
    const query = {
      text: "SELECT * FROM aksara WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Aksara tidak ditemukan");
    }

    return result.rows.map(mapAksaraToModel)[0];
  }

  async editAksaraById(id, { number, label, imgUrl }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: "UPDATE aksara SET number = $1, label = $2, img_url = $3, updated_at = $4 WHERE id = $5 RETURNING id",
      values: [number, label, imgUrl, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Gagal memperbarui aksara. Id tidak ditemukan");
    }
  }

  async deleteAksaraById(id) {
    const query = {
      text: "DELETE FROM aksara WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Aksara gagal dihapus. Id tidak ditemukan");
    }
  }
}

module.exports = AksaraService;
