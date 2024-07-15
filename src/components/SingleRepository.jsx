import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import Text from './Text'
import { useParams } from 'react-router-native'
import useSingleRepository from '../hooks/useSingleRepository'
import RepositoryItem from './RepositoryItem'
import ReviewItem from './ReviewItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <RepositoryItem repository={repository} showGithubButton={true} />
    </View>
  )
}

const SingleRepository = () => {
  const { id } = useParams()
  const { repository, fetchMore, loading } = useSingleRepository({
    id,
    first: 5,
  })

  if (loading) return <Text>Loading...</Text>

  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : []

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

export default SingleRepository
