const {pool} = require('../../../config/database');
const postDao = require('./postDao');

exports.retrieveUserPosts = async function(userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userPostsResult = await postDao.selectUserPosts(connection, userIdx);

    connection.release();

    return userPostsResult;

}