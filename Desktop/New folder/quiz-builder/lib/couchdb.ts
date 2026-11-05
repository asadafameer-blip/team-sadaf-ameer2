import nano from "nano";

const couchUrl = process.env.COUCHDB_URL || "http://S.AMEER123:S.ameer1003412@127.0.0.1:5984";
const dbName = process.env.COUCHDB_DB_NAME || "quiz_builder_db";

const couch = nano(couchUrl);
export const db = couch.use(dbName);