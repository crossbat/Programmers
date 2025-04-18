import React from "react";
import { IconBaseProps } from "react-icons";
import { FaSignInAlt, FaRegUser } from "react-icons/fa";

type IconType = (props: IconBaseProps) => React.ReactNode

export const LogInRef = FaSignInAlt as IconType;
export const RegUserRef = FaRegUser as IconType;
