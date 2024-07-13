import { useQuery } from '@apollo/client'
import { GET_AUTHORIZED_USER } from '../graphql/queries'

const useCurrentUser = (variables) => {
  const { data, loading, ...result } = useQuery(GET_AUTHORIZED_USER, {
    variables,
    fetchPolicy: 'cache-and-network',
  })
  const user = data ? data.me : undefined
  return { user, loading, ...result }
}

export default useCurrentUser
