const QuizHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "quiz",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const quizHandler = new QuizHandler(service, validator);
    server.route(routes(quizHandler));
  },
};
