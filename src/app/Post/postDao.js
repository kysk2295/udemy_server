// 유저 게시물 조회 
async function selectUserPosts(connection, userIdx) {
    const selectUserPostsQuery =`
    select p.postIdx,
       pi.imgUrl as postImgUrl
from post as p
    join user as u on u.userIdx = p.userIdx
    join postimgurl as pi on pi.postIdx = p.postIdx and pi.status ='ACTIVE'
where p.status = 'ACTIVE' and u.userIdx =?
group by p.postIdx
order by p.postIdx desc;
    `;
    const [userPostsRows] = await connection.query(selectUserPostsQuery, userIdx);

    return userPostsRows;
}

async function selectPosts(connection, userIdx) {
    const selectPostsQuery =`
    `;
    
    const [postRows] = await connection.query(selectPostsQuery, userIdx);

    return postRows;
}
async function selectPostImgs(connection, postIdx) {
    const selectPostImgsQuery = ``;

    const [postImgRows] = await connection.query(selectPostImgsQuery, postIdx);
}


async function insertPost(connection, insertPostParams) {
    const insertPostQuery= `
    insert into Post(userIdx,content)
    values (?,?);`;

    const insertPostRow = await connection.query(insertPostQuery, insertPostParams);

    return insertPostRow;
}

async function insertPostImg(connection, insertPostImgParams) {
    const insertPostImgQuery = `
    insert into PostImgUrl(postIdx, imgUrl) 
    values (?,?);`;

    const insertPostImg = await connection.query(insertPostImgQuery, insertPostImgParams);

    return insertPostImgRow;
}

async function updatePost(connection, editPostParams){
    const updatePostQuery =`
    update Post SET content = ? 
    where postIdx = ?; `;

    const updatePostRow = await connection.query(updatePostQuery, editPostParams);

    return updatePostRow;
}

async function selectPostStatus(connection, postIdx) {
    const selectPostStatusQuery = 
    `select status from Post where postIdx =?;`;

    const [postStatusRow] = await connection.query(selectPostStatusQuery, postIdx);

    return postStatusRow;
}

async function updatePostStatus(connection, postIdx){
    const updatePostStatusQuery = 
    `update Post
    set status = 'INACTIVE'
    where postIdx= ?;`;

    const updatePostStatusRow = await connection.query(updatePostStatusQuery, postIdx);

    return updatePostStatusRow[0];
}

module.exports ={
    selectUserPosts, 
    selectPosts,
    selectPostImgs,
    insertPost,
    insertPostImg,
    updatePost,
    selectPostStatus,
    updatePostStatus
}