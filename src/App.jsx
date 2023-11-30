import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";

function App() {
  const [lenght, setLenght] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState(null);
  //useref hook
  const passwordRef = useRef();
   
   const copyPassword = useCallback(()=>{
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0,100);
    navigator.clipboard.writeText(password)
  },[password])

const generatePassword =useCallback(()=>{
  let pass="";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(number) str += "0123456789"
  if(character) str += "!@#$%^&*()_+-=[]{}|;':\",./<>?"
  for(let i=0;i<lenght;i++){
   let char=Math.floor(Math.random()*str.length)
    pass+=str.charAt(char)
  }
  setPassword(pass)

},[lenght,number,character,setPassword]);



useEffect(()=>{
  generatePassword()
},[generatePassword,lenght,character,number])
  return (
    <>
      <div
        className="card w-50 mx-auto mt-4"
        style={{ backgroundColor: "lightgrey" }}
      >
        <h1 className="text-center m-3 ">Password Generator</h1>
        <div className="d-flex justify-content-center flex-wrap m-3">
          <input type="text" value={password}   ref={passwordRef} readOnly />
          <button className="btn btn-primary" onClick={copyPassword} >Copy</button>
        </div>
        <div className="d-flex m-4">
          <div  className="m-2">
            <input
              type="range"
              onChange={(e) =>setLenght( e.target.value)}
              min={8}
              max={100}
            />
            <label htmlFor="">Lenght : {lenght}</label>
          </div>
          <div className="m-2">
            <input type="checkbox" defaultChecked={number} onChange={()=>setNumber((prev) => !prev)}/>
            <label htmlFor="">Number</label>
          </div>
          <div className="m-2">
            <input type="checkbox" defaultChecked={character} onChange={()=>setCharacter((prev)=>!prev)} />
            <label htmlFor="">character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
