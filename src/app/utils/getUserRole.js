"use client";
import jwt from "jsonwebtoken";
import { useSession } from "next-auth/react";

const getUserRole = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const decodedToken = jwt.decode(token);
  return decodedToken?.role;
};

export default getUserRole;
