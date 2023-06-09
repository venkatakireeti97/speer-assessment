import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';


/**
 * UserInfo component
 * @description - This is a view component used to display user information. This behaves like a reusable component.
 * @param {object} userData - This contains the data of the user for which details are being shown.
 * @param {string} component - In order to have conditional rendering we send a prop "component".
 * @param {function} navigation - Sending navigation function reference.
 */


const UserInfoComponent = ({userData, component, navigation}) => {
  const {avatar_url, login, name, bio, following, followers} = userData;

  const followingFunc = () => {
    if (following > 0) {
      const data = {name, avatar_url, login, type: 'following'};
      navigation.push('List', {data});
    }
  };

  const followersFunc = () => {
    if (followers > 0) {
      const data = {name, avatar_url, login, type: 'followers'};
      navigation.push('List', {data});
    }
  };

  const navigateToDetails = () => {
    if (component == 'list') {
      navigation.push('Profile', {login: login}); //We are using . push instead of .navigate so that we can preserve the navigation as it behaves like a stack
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={component === 'list' ? 0 : 1} //Disable if not on List Component
      style={styles.container}
      onPress={navigateToDetails}>
      <Image source={{uri: avatar_url}} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{login}</Text>
        {name && <Text style={styles.name}>{name}</Text>}
        {bio && <Text style={styles.bio}>{bio}</Text>}
        {component !== 'list' ? (
          <View style={styles.statsContainer}>
            <TouchableOpacity onPress={followingFunc}>
              <Text style={styles.followCount}>{following} Following</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={followersFunc}>
              <Text style={styles.followCount}>{followers} Followers</Text>
            </TouchableOpacity>
          </View>
        ) : (
          ''
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth:0.4,
    borderRadius:10,
    padding:10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  followCount: {
    fontSize: 16,
    color: 'gray',
    marginRight: 20,
    textDecorationLine: 'underline',
  },
});

export default UserInfoComponent;
