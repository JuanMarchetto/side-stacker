import { web3 } from "@project-serum/anchor";

export const playGame = (program, gamePublicKey, cell, payer) => {
    if (program) {
      (async () => {
        const tx = await program.methods
          .playGame(cell)
          .accounts({
            game: gamePublicKey,
            payer,
            systemProgram: web3.SystemProgram.programId,
          })
          .rpc();
        console.log(
          `https://explorer.solana.com/tx/${tx}?cluster=custom&customUrl=http://localhost:8899`
        );
      })();
    }
  };