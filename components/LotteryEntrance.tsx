import React, { useEffect, useState, useCallback } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { ethers } from "ethers";
import { useNotification } from "@web3uikit/core";
import { AiOutlineBell } from "react-icons/ai";

const LotteryEntrance = () => {
  const [entranceFee, setEntranceFee] = useState<string>("0");
  const [numPlayers, setNumPlayers] = useState<string>("0");
  const [recentWinner, setRecentWinner] = useState();

  const dispatch = useNotification();

  const {
    chainId: chainIdHex,
    isWeb3Enabled,
  }: { chainId: any; isWeb3Enabled: boolean } = useMoralis();

  const chainId = parseInt(chainIdHex).toString();

  let contractAddressesList: any = contractAddresses;

  const raffleAddress =
    chainId in contractAddresses ? contractAddressesList[chainId][0] : null;

  const {
    runContractFunction: enterRaffle,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getRecentWinner",
    params: {},
  });

  const updateUI = useCallback(async (): Promise<void> => {
    const entranceFeeFromCall: any = await getEntranceFee();
    const numPlayersFromCall: any = await getNumberOfPlayers();
    const recentWinnerFromCall: any = await getRecentWinner();

    setEntranceFee(entranceFeeFromCall.toString());
    setNumPlayers(numPlayersFromCall.toString());
    setRecentWinner(recentWinnerFromCall);
  }, [getEntranceFee, getNumberOfPlayers, getRecentWinner]);

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled, getEntranceFee, updateUI]);

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction complete!",
      title: "Tx Notification",
      icon: <AiOutlineBell />,
      position: "topR",
    });
  };

  const handleSuccess = async (tx: any) => {
    await tx.wait(1);
    handleNewNotification();
    updateUI();
  };

  const handleError = (error: Error) => {
    console.error(error);
  };

  return (
    <section>
      {raffleAddress ? (
        <div className="flex flex-col items-start p-[1.5rem]">
          <button
            className="border p-[.5rem] rounded-lg mr-[1rem] cursor-pointer bg-blue-500 hover:bg-blue-700 text-white"
            onClick={async () => {
              enterRaffle({ onSuccess: handleSuccess, onError: handleError });
            }}
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching ? (
              <div className="animate-spin spinner-border h-[1rem] w-[1rem] border-b-2 rounded-full"></div>
            ) : (
              <div>Enter Raffle</div>
            )}
          </button>
          <p> Entrance Fee: {ethers.utils.formatEther(entranceFee)}ETH</p>
          <p>Number of players: {numPlayers}</p>
          <p>Recent winner: {recentWinner}</p>
        </div>
      ) : (
        <p>No contract address found</p>
      )}
    </section>
  );
};

export default LotteryEntrance;
