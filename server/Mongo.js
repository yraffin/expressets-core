"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const typedi_1 = require("typedi");
const configuration_1 = require("../configuration");
let Mongo = class Mongo {
    db() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._db) {
                this._db = yield this.connect();
            }
            return this._db;
        });
    }
    health() {
        return __awaiter(this, void 0, void 0, function* () {
            // something like this:
            // https://github.com/dannydavidson/k8s-neo-api/blob/master/annotely-graph/apps/ops/health.js
            return true;
        });
    }
    disconnect() {
        if (!this._db) {
            return;
        }
        this._db.close();
    }
    /**
     * Connect to mongo db
     * @method
     * @returns {Promise<Db>}
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = typedi_1.Container.get(configuration_1.Mongo);
            const listServ = config.servers.split(' ');
            const url = listServ.reduce((prev, cur) => prev + cur + ',', `mongodb://${config.user}:${config.password}@`);
            const options = {
                authSource: 'admin',
                w: 'majority',
                wtimeout: 1000,
                j: true,
                readPreference: mongodb_1.ReadPreference.SECONDARY_PREFERRED,
                native_parser: false,
                autoReconnect: true,
                poolSize: 10,
                socketOptions: {
                    keepAlive: 300,
                    connectTimeoutMS: 30000,
                    socketTimeoutMS: 30000
                },
                //replicaSet: config.replica,
                ha: true,
                haInterval: 10000
            };
            if (listServ.length > 1) {
                options.replicaSet = config.replica;
            }
            const db = yield mongodb_1.MongoClient.connect(`${url.substr(0, url.length - 1)}/${config.db}`, options);
            // authenticate to db
            // await db.admin().authenticate(config.user, config.password);
            return db;
        });
    }
};
Mongo = __decorate([
    typedi_1.Service()
], Mongo);
exports.Mongo = Mongo;
//# sourceMappingURL=Mongo.js.map