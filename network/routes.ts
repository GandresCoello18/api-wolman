const user = require('../components/user/network-user.ts');

const routes = function (server: any) {
    server.use('/user', user);
}

module.exports = routes;