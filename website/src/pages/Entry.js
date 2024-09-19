import React, {useState} from 'react'
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

function Entry() {

    const [entryState, setEntryState] = useState(false);

    if(entryState)
        return <LogIn changeToSignUp={() => setEntryState(false)}
     />

  return (
    <SignUp changeToLogIn={() => setEntryState(true)}
     />
  )
}

export default Entry