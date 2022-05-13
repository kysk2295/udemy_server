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

module.exports ={
    selectUserPosts
}