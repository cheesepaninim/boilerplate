import { useState, useEffect } from "react";

const Step2 = props => {
  const { handleStepDown } = props
  const { profile } = props
  const { handleSkillChange } = props
  const [skill, setSkill] = useState(profile.skill)

  const listChange = e => {
    e.preventDefault()
    setSkill(skill => [...skill, ''])
    handleSkillChange(skill)
  }

  const itemChange = (val, idx) => {
    const newSkill = skill.map((item, i) => idx === i ? val : item)
    setSkill(newSkill)
    handleSkillChange(newSkill)
  }

  return (
      <>
        Step2
        <button onClick={handleStepDown}>prev</button>

        <button onClick={listChange}>add</button>
        {skill.map((item, idx) => <Item key={idx}
                                        idx={idx}
                                        item={item}
                                        handleItemChange={itemChange}/>
        )}
      </>
  )
}

const Item = props => {
  const { handleItemChange } = props
  const { idx, item } = props

  return (
    <div>
      <input type="text"
             id={idx}
             value={item}
             onChange={e => handleItemChange(e.target.value, idx)}
      />
    </div>
  )
}

export default Step2;
