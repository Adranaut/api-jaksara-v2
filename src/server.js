require("dotenv").config();

const Hapi = require("@hapi/hapi");
const aksara = require("./api/aksara");
const quiz = require("./api/quiz");
const AksaraService = require("./services/postgres/AksaraService");
const QuizService = require("./services/postgres/QuizService");
const AksaraValidator = require("./validator/aksara");
const QuizValidator = require("./validator/quiz");
const ClientError = require("./exceptions/ClientError");

const init = async () => {
  const aksaraService = new AksaraService();
  const quizService = new QuizService();
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register([
    {
      plugin: aksara,
      options: {
        service: aksaraService,
        validator: AksaraValidator,
      },
    },
    {
      plugin: quiz,
      options: {
        service: quizService,
        validator: QuizValidator,
      },
    },
  ]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
