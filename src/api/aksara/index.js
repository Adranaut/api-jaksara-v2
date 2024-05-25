const AksaraHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "aksara",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const aksaraHandler = new AksaraHandler(service, validator);
    server.route(routes(aksaraHandler));
  },
};
