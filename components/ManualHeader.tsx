"use client";
import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

const Header = () => {
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (isWeb3Enabled) return;

    if (typeof window !== undefined) {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
  }, [isWeb3Enabled, enableWeb3]);

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("No Account Found");
      }
    });
  }, [Moralis, deactivateWeb3]);

  const connect = async () => {
    enableWeb3();
    if (typeof window !== undefined) {
      window.localStorage.setItem("connected", "injected");
    }
  };

  return (
    <header className="h-[7rem] shadow-sm flex items-center px-[3rem]">
      {account ? (
        <div className="px-[2rem] py-[1rem] border rounded-lg ml-auto">
          Connected to {account.slice(0, 6)}..{account.slice(-4)}
        </div>
      ) : (
        <button
          className="px-[2rem] py-[1rem] border rounded-lg ml-auto"
          onClick={connect}
          disabled={isWeb3EnableLoading}
        >
          connect
        </button>
      )}
    </header>
  );
};

export default Header;
