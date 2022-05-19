const baseResponse = require("../../../config/baseResponseStatus");
const {pool} = require('../../../config/database');
const postDao = require('./postDao');
const {response, errResponse} = require("../../../config/response");
const postProvider = require('./postProvider');
const res = require("express/lib/response");


exports.createPosts = async function(userIdx, content, postImgUrls) {
    const connection = await pool.getConnection(async (conn) =>conn);
    try{
        
        const insertPostParams = [userIdx, content];
        const postResult = await postDao.insertPost(connection, insertPostParams);

        //생성된 post의 idx
        const postIdx = postResult[0].insertId;

        for (postImgUrl of postImgUrls){
            const insertPostImgParams =[postIdx, postImgUrl];
            const postImgResult = await postDao.insertPostImg(connection, insertPostImgParams);
        }
        return response(baseResponse.SUCCESS, {addedPost: postIdx})
    }catch(err){
        console.log('APP - careatePost Service Error\n: ${err.message}');

    }finally{
        //db 해제
        connection.release();
    }

    return res.send(createPostResponse);
}

/*
게시물 수정 api 
*/ 

exports.editPost = async function(postIdx, content){
    const connection = await pool.getConnection(async (conn) => conn);

    try{
        const editPostParams =[content, postIdx];
        consteditPostResult = await postDao.updatePost(connection, editPostParams);

        return response(baseResponse.SUCCESS);
    }catch(err){
        console.log('App - editPost service error \n :${err.message}');

        return errResponse(baseResponse.DB_ERROR);
        
    }finally{
        connection.release();
    }

    const editPostsResponse = await postService.editPost(postIdx, content);

    return res.send(editPostsResponse);
}

exports.editPostStatus = async function(postIdx){
    const connection = await pool.getConnection(async (conn)=>conn);
    try{
        const postStatusResult = await postProvider.checkPostStatus(postIdx);
        if(postStatusResult =='INACTIVE'){
            return errResponse(baseResponse.POST_STATUS_INACTIVE);
        }
        const editPostStatusResult = await connection.query(selectPostStatusQuery, postIdx);

        return response(baseResponse.SUCCESS);

    }catch(err){
        console.log('App - editPostStatus Service error\n: ${err.message}');

        return errResponse(baseResponse.DB_ERROR);
    }finally {
        connection.release();
    }
}