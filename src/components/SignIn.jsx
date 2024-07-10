import { TextInput, Pressable, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import theme from '../theme'
import * as yup from 'yup'
import Text from './Text'
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

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username && formik.errors.username
            ? { borderColor: 'red' }
            : null,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.password && formik.errors.password
            ? { borderColor: 'red' }
            : null,
        ]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry={true}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.buttonContainer} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate('')

  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      await signIn({ username, password })
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return <SignInForm onSubmit={onSubmit} />
}

export default SignIn
