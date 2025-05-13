import { createBlogSchema } from "../utils/schemas.js";
import createResponse from "../utils/createResponse.js";
import {
  createBlogRepo,
  deleteBlogByIdRepo,
  getBlogByIdRepo,
  getBlogsByUserIdRepo,
  updateBlogRepo,
  searchBlogPostsRepo,
  getLastInsertedBlogId,
} from "../repositories/blogRepository.js";

export async function createBlogService(req) {
  try {
    const parsed = createBlogSchema.safeParse({
      country: req.body.country,
      title: req.body.title,
      content: req.body.content,
    });

    if (!parsed.success) {
      return createResponse(false, parsed.error.errors, 400);
    }

    const userId = req.session.user.id;

    const blog = await createBlogRepo(req.body, userId);
    const lastInsertedBlog = await getLastInsertedBlogId();
    return createResponse(true, lastInsertedBlog);
  } catch (err) {
    console.error(err);
    return createResponse(false, err);
  }
}

export async function getBlogsByUserIdService(req) {
  try {
    const blogs = await getBlogsByUserIdRepo(req.params.id);
    return createResponse(true, blogs);
  } catch (err) {
    console.error(err);
    return createResponse(false, err);
  }
}

export async function updateBlogService(req) {
  try {
    const blog = await getBlogByIdRepo(req.params.id);
    Object.assign(blog, req.body);
    await updateBlogRepo(blog);
    return createResponse(true, blog);
  } catch (err) {
    console.error(err);
    return createResponse(false, err);
  }
}

export async function deleteBlogService(req) {
  try {
    const deletedBlog = await deleteBlogByIdRepo(req.params.id);
    return createResponse(true, deletedBlog);
  } catch (err) {
    console.error(err);
    return createResponse(false, err);
  }
}

export async function searchBlogPostsService(req) {
  try {
    if (req.query.country) {
      const blogs = await searchBlogPostsRepo(req.query.country);
      return createResponse(true, blogs);
    } else if (req.query.username) {
      const blogs = await searchBlogPostsRepo(req.query.username);
      return createResponse(true, blogs);
    }
  } catch (err) {
    console.error(err);
    return createResponse(false, err);
  }
}

export async function getBlogById(req) {
  try {
    const blog = await getBlogByIdRepo(req.params.id);
    return createResponse(true, blog);
  } catch (err) {
    console.error(err);
    return createResponse(false, err);
  }
}
