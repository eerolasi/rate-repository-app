import React from 'react'
import { View, TextInput, Pressable, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import theme from '../theme'
import * as yup from 'yup'
import Text from './Text'
import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  buttonContainer: {
    backgroundColor: theme.colors.primary,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
})

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Minimum length is ${min}')
    .max(30, 'Maximum length is ${length}')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Minimum length is ${min}')
    .max(30, 'Maximum length is ${length}')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), 'Passwords does not match'])
    .required('Password confirmation is required'),
})

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit,
  })
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={formik.handleChange('password')}
        secureTextEntry={true}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password confirmation"
        onChangeText={formik.handleChange('passwordConfirm')}
        secureTextEntry={true}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={{ color: 'red' }}>{formik.errors.passwordConfirm}</Text>
      )}
      <Pressable style={styles.buttonContainer} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  )
}

const SignUp = () => {
  const [signUp] = useSignUp()
  const [signIn] = useSignIn()
  const navigate = useNavigate('')
  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      await signUp({ username, password })
      await signIn({ username, password })
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }
  return <SignUpForm onSubmit={onSubmit} />
}
export default SignUp
