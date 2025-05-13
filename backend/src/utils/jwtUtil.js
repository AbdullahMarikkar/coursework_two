import jwt from "jsonwebtoken";
import { getUserByIdRepo } from "../repositories/userRepository.js";
import createResponse from "./createResponse.js";

export function createAccessToken(data, secretKey, expireTime, algorithm) {
  return jwt.sign(data, secretKey, { expiresIn: expireTime, algorithm });
}

export async function verifyAccessToken(token, secretKey) {
  try {
    const verifiedToken = jwt.verify(token, secretKey);
    if (verifiedToken) {
      // Get User id and fetch user from database to check if the user exist, if so then return verified
      const userResult = await getUserByIdRepo(verifiedToken.id);
      if (!userResult.success) {
        throw Error(
          "Error From verify access token Service, User is not Available, Unauthorized Error"
        );
      }
      return true;
    } else {
      throw Error("User is not Valid");
    }
  } catch (err) {
    console.error("Error from Verify Token Util : ", err);
    return createResponse(false, err);
  }
}
