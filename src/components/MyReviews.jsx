import { FlatList, StyleSheet, View } from 'react-native'
import useCurrentUser from '../hooks/useCurrentUser'
import ReviewItem from './ReviewItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const MyReviews = () => {
  const { user, refetch } = useCurrentUser({ includeReviews: true })
  const reviewNodes = user ? user.reviews.edges.map((edge) => edge.node) : []
  const renderItem = ({ item }) => (
    <ReviewItem review={item} refetch={refetch} />
  )

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      renderItem={renderItem}
    />
  )
}

export default MyReviews
