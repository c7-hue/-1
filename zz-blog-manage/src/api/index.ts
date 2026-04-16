import fetch from "../utils/axios"

// 是否有注册
export const isRegisterApi = (data: object) =>fetch.post('/isRegister',data)

// 用户注册/register
export const registerApi = (data: any) => fetch.post('/register',data)

// 用户登录/login
export const loginApi = (data: any) => fetch.post('/login',data)    

// 获取总览数据 overview
export const overviewApi = (data: object) => fetch.post('/overview',data)

// 获取评论 comment
export const commentApi = (data: object) => fetch.post('/comment',data)

// 将评论设为已读
export const commentIsreadApi = (data: object) => fetch.post('/commentIsread',data) 

// 删除评论
export const deleteCommentApi = (data: object) => fetch.post('/deleteComment',data)

// 获取私信 /message
export const messageApi = (data: object) => fetch.post('/message',data)

// 获取私信未读数
export const noreadMessageApi = (data: object) => fetch.post('/noreadMessage',data) 

// 删除私信
export const deleteMessageApi = (data: object) => fetch.post('/deleteMessage',data)

// 新建分组addSubset
export const addSubsetApi = (data: object) => fetch.post('/addSubset',data)

// 获取分组subset
export const subsetApi = (data: object) => fetch.post('/subset',data)

// 修改分组updateSubset
export const updateSubsetApi = (data: object) => fetch.post('/updateSubset',data)

// 删除分组 deleteSubset
export const deleteSubsetApi = (data: object) => fetch.post('/deleteSubset',data)

// 新建标签
export const addLabelApi = (data: object) => fetch.post('/addLabel',data) 

// 获取标签
export const labelApi = (data: object) => fetch.post('/getLabel',data)

// 删除标签 deleteLabel
export const deleteLabelApi = (data: object) => fetch.post('/deleteLabel',data) 

// 新建文章/图库 createArticle
export const createArticleApi = (data: object) => fetch.post('/createArticle',data)

// 上传文件upload
export const uploadFileApi = (data: object) => fetch.post('/upload',data)

// 更新文章 updateArticle
export const updateArticleApi = (data: object) => fetch.post('/updateArticle',data)

// 获取文章article
export const articleApi = (data: object) => fetch.post('/article',data) 

//获取状态数articleState
export const articleStateApi = (data: object) => fetch.post('/articleState',data)     

// 文章发布/文章撤回/changeArticleState
export const changeArticleStateApi = (data: object) => fetch.post('/changeArticleState',data)

// 文章删除/deleteArticle
export const deleteArticleApi = (data: object) => fetch.post('/deleteArticle',data)

// 获取文章详情gainArticle
export const gainArticleApi = (data: object) => fetch.post('/gainArticle',data)

// 删除文件/deleteFile
export const deleteFileApi = (data: object) => fetch.post('/deleteFile',data)
