import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW)

  const deleteReview = async ({ id }, refetch) => {
    try {
      await mutate({
        variables: {
          id,
        },
      })
      refetch()
    } catch (e) {
      console.error(e)
    }
  }

  return [deleteReview, result]
}

export default useDeleteReview
