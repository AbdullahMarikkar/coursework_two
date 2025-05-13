import {
  checkFollowStatusRepo,
  deleteCommentRepo,
  followRepo,
  addCommentRepo,
  getCommentsForBlogRepo,
  getDisLikeCountRepo,
  getFollowerCountRepo,
  getFollowersListRepo,
  getFollowingCountRepo,
  getFollowingListRepo,
  getLikeCountRepo,
  getLikeStateRepo,
  likeInsertForBlogRepo,
  likeUpdateForBlogRepo,
  unfollowRepo,
  getDashBoardContentRepo,
} from "../repositories/interactionRepository.js";
import createResponse from "../utils/createResponse.js";

export async function followUser(req) {
  try {
    const followingId = req.params.id;
    const userId = req.session.user.id;

    let result = await checkFollowStatusRepo(userId, followingId);

    if (!result) {
      result = await followRepo(userId, followingId);
    } else {
      result = await unfollowRepo(userId, followingId);
    }
    return createResponse(true, result);
  } catch (err) {
    console.error(err);
    return createResponse(false, err);
  }
}

export async function getFollowersService(req) {
  try {
    const id = req.params.id;
    const count = await getFollowerCountRepo(id);
    const followerList = await getFollowersListRepo(id);

    return createResponse(true, { count: count, followers: followerList });
  } catch (err) {
    console.error(err);
    return createResponse(false, err);
  }
}

export async function getFollowingService(req) {
  try {
    const id = req.params.id;
    const count = await getFollowingCountRepo(id);
    const followingList = await getFollowingListRepo(id);

    return createResponse(true, { count: count, following: followingList });
  } catch (err) {
    console.error(err);
    return createResponse(false, err);
  }
}

export async function addCommentService(req) {
  try {
    const blogId = req.params.id;
    const comment = req.body.comment;
    const result = await addCommentRepo(comment, blogId);
    return createResponse(true, result);
  } catch (err) {
    console.error(err);
    return createResponse(false, err);
  }
}

export async function deleteCommentService(req) {
  try {
    const commentId = req.params.id;
    const result = await deleteCommentRepo(commentId);
    return createResponse(true, result);
  } catch (err) {
    console.error(err);
    return createResponse(false, err);
  }
}

export async function getAllCommentsService(req) {
  try {
    const blogId = req.params.id;
    const comments = await getCommentsForBlogRepo(blogId);
    return createResponse(true, comments);
  } catch (err) {
    console.error(err);
    return createResponse(false, err);
  }
}

export async function likeService(req) {
  try {
    const blogId = req.params.id;
    const like = req.body.like;
    const userId = req.session.user.id;
    let result = await getLikeStateRepo(blogId, userId);
    if (result) {
      result = await likeUpdateForBlogRepo(like, result.id);
    } else {
      result = await likeInsertForBlogRepo(like, blogId, userId);
    }
    return createResponse(true, result);
  } catch (err) {
    console.error(err);
    return createResponse(false, err);
  }
}

export async function getLikeStateService(req) {
  try {
    const blogId = req.params.id;
    const userId = req.session.user.id;
    const result = await getLikeStateRepo(blogId, userId);
    return createResponse(true, result);
  } catch (err) {
    console.error("Get Like State Service", err);
    return createResponse(false, err);
  }
}

export async function getLikeAndDislikeCountService(req) {
  try {
    const blogId = req.params.id;
    const likeCount = await getLikeCountRepo(blogId);
    const dislikeCount = await getDisLikeCountRepo(blogId);
    return createResponse(true, {
      likes: likeCount.likes,
      dislikes: dislikeCount.dislikes,
    });
  } catch (err) {
    console.error(err);
    return createResponse(false, err);
  }
}

export async function getDashboardContentService(req) {
  // TODO : Get Blog Posts sorted by date and likes and send it with user information and likes
  try {
    const start = req.params.start;
    const result = await getDashBoardContentRepo(start);
    return createResponse(true, result);
  } catch (err) {
    console.error(err);
    return createResponse(false, err);
  }
}
