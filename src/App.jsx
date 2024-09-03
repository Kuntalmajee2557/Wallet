import { useState } from 'react'
import { generateMnemonic } from "bip39";
import Solana from './component/Solana.jsx';
import Eth from './component/Eth.jsx';

function App() {
  const [mnemonic, setMnemonic] = useState("");
  return (
    <div>
      <button onClick={async function () {
        const mn = await generateMnemonic();
        setMnemonic(mn)
      }}>
        Create Seed Phrase
      </button>
      <input type="text" value={ mnemonic }></input>
      <Solana mnemonic = { mnemonic }></Solana>
      <Eth mnemonic = { mnemonic } ></Eth>
    </div>
  )
}

export default App