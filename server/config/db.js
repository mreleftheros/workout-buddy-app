const { MongoClient, ObjectId } = require("mongodb");

const _client = new MongoClient(process.env.DB_URI);
const _dbName = "workout-buddy-app";

module.exports = {
  async connect() {
    return await _client.connect();
  },
  getCol(col) {
    return _client.db(_dbName).collection(col);
  },
  getId(id) {
    return ObjectId(id);
  },
  isValid(id) {
    return ObjectId.isValid(id);
  }
}