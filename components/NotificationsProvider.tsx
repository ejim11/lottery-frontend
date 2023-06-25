"use client";
import React from "react";
import { NotificationProvider } from "@web3uikit/core";

const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <NotificationProvider>{children}</NotificationProvider>;
};

export default NotificationsProvider;
