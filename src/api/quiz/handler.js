class QuizHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postQuizHandler = this.postQuizHandler.bind(this);
    this.getQuizHandler = this.getQuizHandler.bind(this);
    this.getQuizByIdHandler = this.getQuizByIdHandler.bind(this);
    this.putQuizByIdHandler = this.putQuizByIdHandler.bind(this);
    this.deleteQuizByIdHandler = this.deleteQuizByIdHandler.bind(this);
    this.getTenQuizRandomHandler = this.getTenQuizRandomHandler.bind(this);
  }

  async postQuizHandler(request, h) {
    this._validator.validateQuizPayload(request.payload);
    const {
      question,
      imgUrl,
      correctAnswer,
      incorrectAnswer1,
      incorrectAnswer2,
      incorrectAnswer3,
    } = request.payload;

    const quizId = await this._service.addQuiz({
      question,
      imgUrl,
      correctAnswer,
      incorrectAnswer1,
      incorrectAnswer2,
      incorrectAnswer3,
    });

    const response = h.response({
      status: "success",
      message: "Soal kuis berhasil ditambahkan",
      data: {
        quizId,
      },
    });
    response.code(201);
    return response;
  }

  async getQuizHandler() {
    const quiz = await this._service.getQuiz();
    return {
      status: "success",
      data: {
        quiz,
      },
    };
  }

  async getQuizByIdHandler(request, h) {
    const { id } = request.params;
    const quiz = await this._service.getQuizById(id);
    return {
      status: "success",
      data: {
        quiz,
      },
    };
  }

  async putQuizByIdHandler(request, h) {
    this._validator.validateQuizPayload(request.payload);
    const {
      question,
      imgUrl,
      correctAnswer,
      incorrectAnswer1,
      incorrectAnswer2,
      incorrectAnswer3,
    } = request.payload;
    const { id } = request.params;

    await this._service.editQuizById(id, {
      question,
      imgUrl,
      correctAnswer,
      incorrectAnswer1,
      incorrectAnswer2,
      incorrectAnswer3,
    });

    return {
      status: "success",
      message: "Soal kuis berhasil diperbarui",
    };
  }

  async deleteQuizByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteQuizById(id);

    return {
      status: "success",
      message: "Soal kuis berhasil dihapus",
    };
  }

  async getTenQuizRandomHandler() {
    const quiz = await this._service.getTenQuizRandom();
    return {
      status: "success",
      data: {
        quiz,
      },
    };
  }
}

module.exports = QuizHandler;
