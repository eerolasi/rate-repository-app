import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (variables) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  })

  const repositories = data ? data.repositories : undefined
  return { repositories, loading, error }
}

export default useRepositories
