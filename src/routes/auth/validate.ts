export const validateEmail = (email: string): string => {
  if (email === '') {
    return 'Email is required'
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    return 'Invalid email format'
  } else {
    return ''
  }
}

export const validateEmailForRegister = async (email: string) => {
  const basicError = validateEmail(email)
  if (basicError) return basicError

  const response = await fetch('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })

  const { isEmailTaken } = await response.json()
  if (isEmailTaken) return 'Email is already taken'

  return ''
}

export const validatePassword = (password: string): string => {
  return password === '' ? 'Password is required' : ''
}

export const validateFullname = (fullName: string): string => {
  if (fullName === '') {
    return 'Full Name is required'
  } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
    return 'Full Name can only contain letters and spaces'
  } else if (fullName.length < 3) {
    return 'Full Name must be at least 3 characters long'
  } else {
    return ''
  }
}

export const validateConfirmPassword = (
  confirmPassword: string,
  password: string,
): string => {
  if (password === '') {
    return 'Password is required'
  } else if (confirmPassword === '') {
    return 'Confirm password is required'
  } else if (confirmPassword !== password) {
    return 'Passwords do not match'
  } else {
    return ''
  }
}
