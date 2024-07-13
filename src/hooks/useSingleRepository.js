import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'

const useSingleRepository = (id) => {
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  })
  return { repository: data?.repository, loading, error }
}

export default useSingleRepository