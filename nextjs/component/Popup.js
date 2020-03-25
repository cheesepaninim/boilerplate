import { useState, useEffect } from "react"
import Header from "./popup/Header"
import Step1 from "./popup/Step1"
import Step2 from "./popup/Step2"

const Popup = props => {
  const { handleClose } = props

  const [step, setStep] = useState(1)
  const stepUp = _ => setStep(prev => ++prev)
  const stepDown = _ => setStep(prev => --prev)

  // -> props check
  // -> validation check module
  // -> state 처리 후 -> redux 로 변환 예정
  const [profile, setProfile] = useState({
    email: '',
    password: '',
    skill: []
  })

  const handleEmailChange = email => setProfile({ ...profile, email })
  const handlePasswordChange = password => setProfile({ ...profile, password })
  const handleSkillChange = skill => setProfile({ ...profile, skill })

  return (
    <>
      <Header handleClose={handleClose} />

      {(_ => {
        switch (step) {
          case 1:
            return <Step1
                handleStepUp={stepUp}
                profile={profile}
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
            />
          case 2:
            return <Step2
                handleStepDown={stepDown}
                profile={profile}
                handleSkillChange={handleSkillChange}
            />
          default:
            return <Step1 />
        }
      })()}
    </>
  )
}

export default Popup
