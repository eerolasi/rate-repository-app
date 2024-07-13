import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native'
import { SignInContainer } from '../../components/SignIn'
import React from 'react'

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn()
      const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />)
      const username = getByTestId('usernameField')
      const password = getByTestId('passwordField')
      const submit = getByTestId('submitButton')

      fireEvent.changeText(username, 'kalle')
      fireEvent.changeText(password, 'password')
      fireEvent.press(submit)

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        })
      })
    })
  })
})
