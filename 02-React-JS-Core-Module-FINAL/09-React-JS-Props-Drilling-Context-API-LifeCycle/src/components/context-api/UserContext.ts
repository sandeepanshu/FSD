import React from "react";
import type { UserInfo } from "../props-drilling/UserInfo";

const UserContext = React.createContext<UserInfo | null>(null);

export default UserContext;
