const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class AksaraService {
  constructor() {
    this._aksara = [];
  }

  addAksara({ number, label, imgUrl }) {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newAksara = {
      id,
      number,
      label,
      imgUrl,
      insertedAt,
      updatedAt,
    };

    this._aksara.push(newAksara);

    const isSuccess =
      this._aksara.filter((aksara) => aksara.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError("Aksara gagal ditambahkan");
    }

    return id;
  }

  getAksara() {
    return this._aksara;
  }

  getAksaraById(id) {
    const aksara = this._aksara.filter((a) => a.id === id)[0];
    if (!aksara) {
      throw new NotFoundError("Aksara tidak ditemukan");
    }
    return aksara;
  }

  editAksaraById(id, { number, label, imgUrl }) {
    const index = this._aksara.findIndex((aksara) => aksara.id === id);

    if (index === -1) {
      throw new NotFoundError("Gagal memperbarui Aksara. Id tidak ditemukan");
    }

    const updatedAt = new Date().toISOString();

    this._aksara[index] = {
      ...this._aksara[index],
      number,
      label,
      imgUrl,
      updatedAt,
    };
  }

  deleteAksaraById(id) {
    const index = this._aksara.findIndex((aksara) => aksara.id === id);
    if (index === -1) {
      throw new NotFoundError("Aksara gagal dihapus. Id tidak ditemukan");
    }
    this._aksara.splice(index, 1);
  }
}

module.exports = AksaraService;
