import React, { useState } from 'react'
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
function Solana({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);
    return (
        <div>
            <button onClick={async function () {
                const seed = await mnemonicToSeed(mnemonic);
                const path = `m/44'/501'/${currentIndex}'/0'`;
                const derivedSeed = derivePath(path, seed).key;
                const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
                const keypair = Keypair.fromSecretKey(secret);
                setCurrentIndex(currentIndex + 1);
                setPublicKeys([...publicKeys, keypair.publicKey]);
            }}>
                Add Solana Wallet
            </button>
            {publicKeys.map(p => <div>
                {p.toBase58()}
            </div>)}
        </div>
    )
}

export default Solana



// https://gist.github.com/Kuntalmajee2557/774e70cc668c7b51a294944de43f79fe