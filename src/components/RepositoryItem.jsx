import { View, Image, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
    marginBottom: 10,
  },

  rowContainerFirst: {
    flexDirection: 'row',
  },

  logo: {
    width: 50,
    height: 50,
  },

  columnContainerFirst: {
    paddingLeft: 15,
  },

  languageContainer: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },

  columnContainerSecond: {
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center',
  },

  rowContainerSecond: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textItemBold: {
    marginBottom: 5,
    fontWeight: theme.fontWeights.bold,
  },
})

const RepositoryItem = ({ repository }) => {
  const formatCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k'
    }
    return count
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowContainerFirst}>
        <Image
          style={styles.logo}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.columnContainerFirst}>
          <Text fontSize="subheading" style={styles.textItemBold}>
            {repository.fullName}
          </Text>
          <Text color="textSecondary">{repository.description}</Text>
          <View style={styles.languageContainer}>
            <Text style={{ color: 'white' }}>{repository.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.rowContainerSecond}>
        <View style={styles.columnContainerSecond}>
          <Text style={styles.textItemBold}>
            {formatCount(repository.stargazersCount)}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.columnContainerSecond}>
          <Text style={styles.textItemBold}>
            {formatCount(repository.forksCount)}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.columnContainerSecond}>
          <Text style={styles.textItemBold}>{repository.reviewCount}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.columnContainerSecond}>
          <Text style={styles.textItemBold}>{repository.ratingAverage}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem
