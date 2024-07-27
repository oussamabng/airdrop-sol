import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

// creating a wallet
const wallet = new Keypair();

// public key of the wallet
const publicKey = new PublicKey(wallet.publicKey);

// secret key of the wallet
const secretKey = wallet.secretKey;

// balance of wallet
const getWalletBalance = async () => {
  try {
    // create a connection to solana devnet blockchain
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // get the balance with public key of the wallet
    const walletBalance = await connection.getBalance(publicKey);

    console.log(`Wallet balance is ${walletBalance / LAMPORTS_PER_SOL}`);
  } catch (error) {
    console.error(error);
    return 0;
  }
};

const airDropSol = async () => {
  try {
    // create a connection to solana devnet blockchain
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // request an airdrop of 2 SOL
    const airdropSignature = await connection.requestAirdrop(
      publicKey,
      2 * LAMPORTS_PER_SOL
    );

    // fetch latest blockhash
    const latestBlockHash = await connection.getLatestBlockhash();

    // confirm airdrop transaction
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airdropSignature,
    });
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

main();
