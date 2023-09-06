import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../Auth/Login'; // Your login component
import { useLogin } from './useLogin'; // Your login hook

jest.mock('./useLogin'); // Mock the hook implementation

test('Login form submits successfully', async () => {
  // Mock the useLogin hook's return values
  useLogin.mockReturnValue({
    login: jest.fn(), // Mocked login function
    isLoading: false,
  });

  render(<Login />);

  // Fill in the form fields
console.log(screen.findAllByPlaceholderText('Email'))

  fireEvent?.change(screen.findAllByPlaceholderText('Email'), {
    target: { value: 'social.numan@gmail.com' },
  });
  fireEvent.change(screen.getByLabelText('Password'), {
    target: { value: 'Admin.123!' },
  });

  fireEvent.click(screen.getByText('Sign in'));

  // Assert that the login function was called
  expect(useLogin().login).toHaveBeenCalledWith(
    { email: 'social.numan@gmail.com', password: 'Admin.123!' },
    expect.any(Object) // Mocked options object
  );
});
