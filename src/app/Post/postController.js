const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const postService = require('./postService');
const postProvider = require('./postProvider');
const { pool } = require("../../../config/database");

/* 
API No. 3.1 
*/

exports.getPosts = async function(req,res) {
    
    const userIdx = req.query.userIdx;

    //validation
    if(!userIdx) {
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    } 
    if (userIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
    }

    const postListResult = await postProvider.retrievePostLists(userIdx);

    return res.send(response(baseResponse.SUCCESS, postListResult));
    
    
}

/*
    API No. 3.2
    API Name: 게시물 생성 API
    [POST] / posts
*/

exports.postPosts =  async function(req,res) {

    const { userIdx, content, postImgUrls} = req.body;

    if(!userIdx){
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));

    }else if(postImgUrls.length<=0){
        return res.send(errResponse(baseResponse.POST_POSTIMGURLS_EMPTY));
    }

    if(userIdx <= 0){
        return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));

    }else if(postImgUrls.length<=0){
        return res.send(errResponse(baseResponse.POST_CONTENT_LENGTH));
    }

    const createPostRespnse = await postService.createPost(
        userIdx,
        content,
        postImgUrls,
    )
}


/*
    API No. 3.3
    API Name: 게시물 수정 API 
    [PATCH] /posts/:postIdx
*/ 

exports.patchPost = async function(req, res){

    const postIdx = req.params.postIdx;
    const {content} = req.body;

    if(!postIdx){
        return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
    }else if(!content){
        return res.send(errResponse(baseResponse.POST_CONTENT_EMPTY));
    }

    if(postIdx <= 0){
        return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
    }else if(content.length > 450){
        return res.send(errResponse(baseResponse.POST_CONTENT_EMPTY));
    }


    const editPostsResponse = await postService.editPost(postIdx, content);
}

/*
    API No 3.4
    API Name: 게시물 삭제 API 
 */

exports.patchPostStatus = async function(req,res){
    /*
    Path variable postIdx
     */

    const postIdx = req.params.postIdx;

    if(!postIdx){
        return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
    }
    else if(postIdx<=0){
        return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
    }

    const editPostStatusResponse = await postService.editPostStatus(postIdx);

    return res.send(editPostStatusResponse);
}