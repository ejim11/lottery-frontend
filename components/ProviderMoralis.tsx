"use client";
import React from "react";
import { MoralisProvider } from "react-moralis";

const ProviderMoralis: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MoralisProvider initializeOnMount={false}>{children}</MoralisProvider>
  );
};

export default ProviderMoralis;
