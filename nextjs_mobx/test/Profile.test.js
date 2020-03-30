import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Profile from './Profile'

describe('<Profile />', () => {
  it('matches snapshot', () => {
    const utils = render(<Profile username="velog" name="vlo" />)
    expect(utils.container).toMatchSnapshot()
  })
  it('shows the props correctly', () => {
    const utils = render(<Profile username="velog" name="vlo" />)
    utils.getByText('velog')
    utils.getAllByText('(vlo)')
    utils.getByText(/elo/)

    // btn 경우 변수에 담아서 fireEvent() 를 통해 테스트 할 수 있다.
  })
})
