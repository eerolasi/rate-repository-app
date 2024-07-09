import React from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import { Link } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    padding: 15,
  },
  heading: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    marginRight: 10,
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Link to="/">
          <Text style={styles.heading}>Repositories</Text>
        </Link>

        <Link to="/signin">
          <Text style={styles.heading}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  )
}

export default AppBar
