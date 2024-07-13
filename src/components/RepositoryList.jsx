import React from 'react'
import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { useState } from 'react'
import { useNavigate } from 'react-router-native'
import { useDebounce } from 'use-debounce'
import { Picker } from '@react-native-picker/picker'

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  separator: {
    height: 10,
  },
  input: {
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { ordering, setOrdering, searchKeyword, setSearchKeyword } =
      this.props
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchKeyword}
          onChangeText={setSearchKeyword}
        />
        <Selection ordering={ordering} setOrdering={setOrdering} />
      </View>
    )
  }
  render() {
    const { repositories, navigate } = this.props
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : []
    const renderItem = ({ item }) => (
      <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
        <RepositoryItem repository={item} />
      </Pressable>
    )
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        ListHeaderComponent={this.renderHeader}
      />
    )
  }
}

const Selection = ({ ordering, setOrdering }) => {
  return (
    <Picker
      selectedValue={ordering}
      onValueChange={(itemValue) => setOrdering(itemValue)}
    >
      <Picker.Item label="Latest repository" value="latest" />
      <Picker.Item label="Highest rated rating" value="highest" />
      <Picker.Item label="Lowest rated rating" value="lowest" />
    </Picker>
  )
}

const RepositoryList = () => {
  const [ordering, setOrdering] = useState('latest')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500)
  const navigate = useNavigate('')

  const getOrderVariables = (ordering) => {
    switch (ordering) {
      case 'highest':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' }
      case 'lowest':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
      case 'latest':
      default:
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' }
    }
  }

  const variables = {
    ...getOrderVariables(ordering),
    searchKeyword: debouncedSearchKeyword,
  }

  const { repositories } = useRepositories(variables)

  return (
    <RepositoryListContainer
      repositories={repositories}
      ordering={ordering}
      setOrdering={setOrdering}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      navigate={navigate}
    />
  )
}
export { RepositoryListContainer }
export default RepositoryList
