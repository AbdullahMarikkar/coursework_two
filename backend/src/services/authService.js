import {} from "express-session";
import {
  createUser,
  getByEmail,
  getUserByIdRepo,
} from "../repositories/userRepository.js";
import { generateHash, verify } from "../utils/bcryptUtil.js";
import createResponse from "../utils/createResponse.js";
import { createAccessToken } from "../utils/jwtUtil.js";
import { loginSchema, signupSchema } from "../utils/schemas.js";

export async function createUserService(req) {
  try {
    const parsed = signupSchema.safeParse({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });

    if (!parsed.success) {
      return createResponse(false, parsed.error.errors, 400);
    }

    req.body.password = await generateHash(req.body.password);
    const result = await createUser(req);
    return result;
  } catch (err) {
    console.error(err);
    return createResponse(false, err);
  }
}

export async function authenticateUserService(req, res) {
  const SECRET_KEY = process.env.SECRET_KEY;
  const ACCESS_TOKEN_EXPIRE_MINUTES = process.env.ACCESS_TOKEN_EXPIRE_MINUTES;
  const ALGORITHM = process.env.ALGORITHM;

  try {
    const parsed = loginSchema.safeParse({
      email: req.body.email,
      password: req.body.password,
    });

    if (!parsed.success) {
      return createResponse(false, parsed.error.errors, 400);
    }
    const result = await getByEmail(req);
    if (!result) {
      return createResponse(
        false,
        "Email or Password is Incorrect, Please Try Again"
      );
    }
    const isMatch = await verify(req.body.password, result.data.password);
    const accessToken = createAccessToken(
      {
        id: result.data.id,
        email: result.data.email,
      },
      SECRET_KEY,
      ACCESS_TOKEN_EXPIRE_MINUTES,
      ALGORITHM
    );
    if (isMatch) {
      req.session.user = {
        id: result.data.id,
        email: result.data.email,
        name: result.data.fn,
      };
      req.session.isAuthenticated = true;
      res.cookie("accessToken", accessToken, {
        secure: false, //https only or http and https
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        domain: "localhost",
        sameSite: "lax",
      });
      return createResponse(true, req.session);
    } else {
      return createResponse(false, "Email or Password is Incorrect");
    }
  } catch (err) {
    console.log("Error From Authentication Service", err);
    return createResponse(false, err);
  }
}

export async function logoutUserService(req, res) {
  try {
    req.session.destroy();
    res.clearCookie("accessToken");
    res.clearCookie("connect.sid");
    return createResponse(true, "Successfully Logged Out");
  } catch (err) {
    return createResponse(false, "Log Out Failed");
  }
}

export async function isLoggedIn(req, res) {
  if (req.session && req.session.isAuthenticated) {
    res.json({
      isAuthenticated: true,
      user: req.session.user,
    });
  } else {
    res.json({
      isAuthenticated: false,
    });
  }
}

export async function getUserDetailsById(req) {
  try {
    const id = req.params.id;
    const result = await getUserByIdRepo(id);
    return createResponse(true, result.data);
  } catch (err) {
    console.log("Error From Get User Details Service", err);
    return createResponse(false, err);
  }
}

export async function getCurrentSession(req) {
  return createResponse(true, req.session.user);
}
