import { useState, useEffect } from "react";

const Step1 = props => {
  const { handleStepUp } = props
  const { profile } = props
  const [email, setEmail] = useState(profile.email)
  const [password, setPassword] = useState(profile.password)
  const { handleEmailChange, handlePasswordChange } = props

  const onEmailChange = e => {
    setEmail(e.target.value)
    handleEmailChange(e.target.value)
  }

  const onPasswordChange = e => {
    setPassword(e.target.value)
    handlePasswordChange(e.target.value)
  }

  return (
      <>
        Step1
        <button onClick={handleStepUp}>next</button>

        <input type="text"
               id={"email"}
               name={"email"}
               value={email}
               onChange={onEmailChange}
        />

        <input type="text"
               id={"password"}
               name={"password"}
               value={password}
               onChange={onPasswordChange}
        />
      </>
  )
}

export default Step1;
