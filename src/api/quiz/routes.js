const routes = (handler) => [
  {
    method: "POST",
    path: "/quiz",
    handler: handler.postQuizHandler,
  },
  {
    method: "GET",
    path: "/quiz",
    handler: handler.getQuizHandler,
  },
  {
    method: "GET",
    path: "/quiz/{id}",
    handler: handler.getQuizByIdHandler,
  },
  {
    method: "PUT",
    path: "/quiz/{id}",
    handler: handler.putQuizByIdHandler,
  },
  {
    method: "DELETE",
    path: "/quiz/{id}",
    handler: handler.deleteQuizByIdHandler,
  },
  {
    method: "GET",
    path: "/quiz/random",
    handler: handler.getTenQuizRandomHandler,
  },
];

module.exports = routes;
