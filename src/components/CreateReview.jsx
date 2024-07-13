import { View, StyleSheet, TextInput, Pressable } from 'react-native'
import { useFormik } from 'formik'
import theme from '../theme'
import * as yup from 'yup'
import Text from './Text'
import useCreateReview from '../hooks/useCreateReview'
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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100')
    .required('Rating is required'),
  text: yup.string(),
})

const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit,
  })
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.ownerName && formik.errors.ownerName
            ? { borderColor: 'red' }
            : null,
        ]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: 'red ' }}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.repositoryName && formik.errors.repositoryName
            ? { borderColor: 'red' }
            : null,
        ]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: 'red ' }}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating
            ? { borderColor: 'red' }
            : null,
        ]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: 'red ' }}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        multiline={true}
      />
      <Pressable style={styles.buttonContainer} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  )
}

const CreateReview = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate('')

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values
    try {
      const data = await createReview({
        ownerName,
        repositoryName,
        rating,
        text,
      })
      navigate(`/repository/${data.createReview.repositoryId}`)
    } catch (e) {
      console.log('error', e)
    }
  }
  return <ReviewForm onSubmit={onSubmit} />
}

export default CreateReview
