import React from "react";
import { ConnectButton } from "@web3uikit/web3";

const Header = () => {
  return (
    <header className="h-[7rem] flex items-center w-full justify-between shadow-md px-[3rem]">
      <h1 className="font-bold text-[2rem]">Decentralized lottery</h1>
      <ConnectButton moralisAuth={false} />
    </header>
  );
};

export default Header;
