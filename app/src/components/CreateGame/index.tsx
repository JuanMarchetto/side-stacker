import { FC, useEffect, useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import * as web3 from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { useProgram } from "../../utils/useProgram";

export const CreateGame: FC = ({}) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { program } = useProgram({ connection, wallet });
  const [player2, setPlayer2] = useState("");
  const [name, setName] = useState("");
  const handleClick = () => {
    if (program) {
      (async () => {
        const player2Key = new PublicKey(player2);
        const [gamePublicKey] = web3.PublicKey.findProgramAddressSync(
          [Buffer.from("game"), Buffer.from(name)],
          program.programId
        );

        const tx = await program.methods
          .createGame(name, [wallet.publicKey, player2Key])
          .accounts({
            game: gamePublicKey,
            payer: wallet?.publicKey,
            systemProgram: web3.SystemProgram.programId,
          })
          .rpc();
        console.log(
          `https://explorer.solana.com/tx/${tx}?cluster=custom&customUrl=http://localhost:8899`
        );
      })();
    }
  };
  return (
    <div className="flex flex-col p-5">
      {!wallet ? (
        <h1 className="text-white">Connect your wallet!</h1>
      ) : (
        <>
          <input
            placeholder="Gave your game a name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-5 mb-5"
          />
          <input
            placeholder="Copy your friends wallet here"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="p-5 mb-5"
          />
          <button
            type="button"
            onClick={player2 && handleClick}
            className="bg-purple-700 text-white font-extrabold p-2 px-4 rounded-lg"
          >
            Create Game!
          </button>
        </>
      )}
    </div>
  );
};
