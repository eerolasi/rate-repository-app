import React from 'react'
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import { Link } from 'react-router-native'
import useSignOut from '../hooks/useSignOut'
import { useNavigate } from 'react-router-native'
import useCurrentUser from '../hooks/useCurrentUser'
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    padding: 15,
  },
  links: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    marginRight: 10,
  },
})

const AppBar = () => {
  const currentUser = useCurrentUser()
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
          <Text style={styles.links}>Repositories</Text>
        </Link>
        {currentUser?.user ? (
          <View style={{ flexDirection: 'row' }}>
            <Link to="/createreview">
              <Text style={styles.links}>Create a review</Text>
            </Link>
            <Link to="/myreviews">
              <Text style={styles.links}>My reviews</Text>
            </Link>
            <Pressable onPress={handleSignOut}>
              <Text style={styles.links}>Sign out</Text>
            </Pressable>
          </View>
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <Link to="/signin">
              <Text style={styles.links}>Sign in</Text>
            </Link>
            <Link to="/signup">
              <Text style={styles.links}>Sign up</Text>
            </Link>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
