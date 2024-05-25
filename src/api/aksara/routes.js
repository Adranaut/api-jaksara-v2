const routes = (handler) => [
  {
    method: "POST",
    path: "/aksara",
    handler: handler.postAksaraHandler,
  },
  {
    method: "GET",
    path: "/aksara",
    handler: handler.getAksaraHandler,
  },
  {
    method: "GET",
    path: "/aksara/{id}",
    handler: handler.getAksaraByIdHandler,
  },
  {
    method: "PUT",
    path: "/aksara/{id}",
    handler: handler.putAksaraByIdHandler,
  },
  {
    method: "DELETE",
    path: "/aksara/{id}",
    handler: handler.deleteAksaraByIdHandler,
  },
];

module.exports = routes;
