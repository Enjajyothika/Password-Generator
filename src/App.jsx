import { useState,useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const[length,setlength]=useState(8);
  const[password,setpassword]=useState('');
  const [charallowed, setcharallowed] = useState(false);
  const [numberallowed,setnumberallowed] = useState(false);
 const [copied, setCopied] = useState(false);


  const passwordgenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklmnopqrstuxwxzy"
    if(numberallowed) str+='1234567890'
    if(charallowed) str+='!@#$%^&*()_+'
    for(let i=0; i<length;i++){
      const char=Math.floor(Math.random(str)*str.length )
      pass+=str.charAt(char)
    }
    setpassword(pass)
  },[numberallowed,charallowed,length])

  
  useEffect(()=>{
    passwordgenerator()
  },[numberallowed,charallowed,length])
   
  const copytoclipboard=()=>{
    window.navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(()=>setCopied(false),400);
  }

  return(
     <>
    <div>
      <h1>Password-generator</h1>
      <input type='text' placeholder='password' value={password}></input>
      <button id='copy' onClick={copytoclipboard} >copy</button><br></br>
      {copied && <span style={{ marginLeft: '10px', color: 'whitesmoke' }}>Copied!</span>}
    </div>
    <div>
      <br></br>
      <label htmlFor='length'>Length: {length}</label>
      <input type='checkbox' defaultChecked={numberallowed} onChange={()=>{setnumberallowed((prev)=>!prev)}}></input>
      <label htmlFor="number">Number</label>
      <input type='checkbox' defaultChecked={charallowed} onChange={()=>{setcharallowed((prev)=>!prev)}}></input>
      <label htmlFor="number">Character</label>
      <br></br>
      <input type='range' min={8} max={30} value={length} onChange={(e)=>setlength(e.target.value)}></input>
      
    </div>
    </>
  );
  
}

export default App
