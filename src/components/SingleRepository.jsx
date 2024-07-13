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
  const { repository, loading, error } = useSingleRepository(id)

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : []
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default SingleRepository
