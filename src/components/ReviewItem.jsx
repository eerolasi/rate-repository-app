import React from 'react'
import { View, StyleSheet, Pressable, Alert } from 'react-native'
import Text from './Text'
import theme from '../theme'
import { format } from 'date-fns'
import useDeleteReview from '../hooks/useDeleteReview'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
  separator: {
    height: 10,
  },
  rowContainerFirst: {
    flexDirection: 'row',
  },
  columnContainer: {
    paddingLeft: 15,
    paddingRight: 50,
  },
  textItemBold: {
    marginBottom: 5,
    fontWeight: theme.fontWeights.bold,
  },
  textItemSecondary: {
    marginBottom: 5,
    color: theme.colors.textSecondary,
  },
  rateContainer: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.primary,
  },
  rateText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#DC143C',
    marginLeft: 5,
  },
  repositoryButton: {
    backgroundColor: theme.colors.primary,
    marginRight: 5,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
})

const ReviewItem = ({ review, refetch }) => {
  const [deleteReview] = useDeleteReview()
  const navigate = useNavigate('')

  const handleDeleteReview = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteReview({ id: review.id }, refetch)
            } catch (e) {
              console.error(e)
            }
          },
        },
      ]
    )
  }

  const handleNavigate = () => {
    navigate(`/repository/${review.repository.id}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowContainerFirst}>
        <View style={styles.rateContainer}>
          <Text style={styles.rateText}>{review.rating}</Text>
        </View>
        <View style={styles.columnContainer}>
          <Text fontSize="subheading" style={styles.textItemBold}>
            {review.user ? review.user.username : review.repository.fullName}
          </Text>
          <Text style={styles.textItemSecondary}>
            {format(new Date(review.createdAt), 'dd.MM.yyy')}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {review.repository ? (
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.repositoryButton]}
            onPress={handleNavigate}
          >
            <Text style={styles.buttonText}>View repository</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.deleteButton]}
            onPress={handleDeleteReview}
          >
            <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  )
}

export default ReviewItem
