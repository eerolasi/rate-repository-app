import React from 'react'
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import { Link } from 'react-router-native'
import { useQuery } from '@apollo/client'
import { GET_AUTHORIZED_USER } from '../graphql/queries'
import useSignOut from '../hooks/useSignOut'
import { useNavigate } from 'react-router-native'

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
  const { data } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
  })
  const signOut = useSignOut()
  const navigate = useNavigate('')

  const handleSignOut = async () => {
    await signOut()
    navigate('/signin')
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Link to="/">
          <Text style={styles.heading}>Repositories</Text>
        </Link>
        {data?.me ? (
          <Pressable onPress={handleSignOut}>
            <Text style={styles.heading}>Sign out</Text>
          </Pressable>
        ) : (
          <Link to="/signin">
            <Text style={styles.heading}>Sign in</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
