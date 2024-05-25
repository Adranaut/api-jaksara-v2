class AksaraHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAksaraHandler = this.postAksaraHandler.bind(this);
    this.getAksaraHandler = this.getAksaraHandler.bind(this);
    this.getAksaraByIdHandler = this.getAksaraByIdHandler.bind(this);
    this.putAksaraByIdHandler = this.putAksaraByIdHandler.bind(this);
    this.deleteAksaraByIdHandler = this.deleteAksaraByIdHandler.bind(this);
  }

  async postAksaraHandler(request, h) {
    this._validator.validateAksaraPayload(request.payload);
    const { number, label, imgUrl } = request.payload;

    const aksaraId = await this._service.addAksara({ number, label, imgUrl });

    const response = h.response({
      status: "success",
      message: "Aksara berhasil ditambahkan",
      data: {
        aksaraId,
      },
    });
    response.code(201);
    return response;
  }

  async getAksaraHandler() {
    const aksara = await this._service.getAksara();
    return {
      status: "success",
      data: {
        aksara,
      },
    };
  }

  async getAksaraByIdHandler(request, h) {
    const { id } = request.params;
    const aksara = await this._service.getAksaraById(id);
    return {
      status: "success",
      data: {
        aksara,
      },
    };
  }

  async putAksaraByIdHandler(request, h) {
    this._validator.validateAksaraPayload(request.payload);
    const { number, label, imgUrl } = request.payload;
    const { id } = request.params;

    await this._service.editAksaraById(id, { number, label, imgUrl });

    return {
      status: "success",
      message: "Aksara berhasil diperbarui",
    };
  }

  async deleteAksaraByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteAksaraById(id);

    return {
      status: "success",
      message: "Aksara berhasil dihapus",
    };
  }
}

module.exports = AksaraHandler;
