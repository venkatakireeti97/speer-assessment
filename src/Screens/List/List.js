import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Alert} from 'react-native';
import EN from '../../Constants/String';
import {fetchFollowingFollowers} from '../../Utilities/Api/http';
import UserInfoComponent from '../../Components/UserInfo';
import SkeletonLoader from '../../Components/SkeletonLoader';

/**
 * ListScreen
 * @description - This is a Parent Component which is navigated in order to fetch and display the followers and following list of the particular user.
 * @param {object} route - This contains the navigation props in particular the username as login.
 * @param {function} navigation - Sending navigation function reference.
 */


const ListScreen = ({route, navigation}) => {
  const {data} = route.params;
  const {avatar_url = '', name = '', login = '', type} = data;

  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  const init = async () => {
    try {
      //From username (login) we fetch the followers/following information for that user
      let response = await fetchFollowingFollowers(login, type);
      if (response.status === 200) {
        setListData(response.data);
        setLoading(false);
      }
    } catch (err) {
      Alert.alert(EN.T_HOME_API_ERROR);
      navigation.goBack();
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.currentUserContainer}>
        <Image style={styles.currentUserAvatar} source={{uri: avatar_url}} />
        <View>
          <Text style={styles.currentUsername}>{login}</Text>
          {data.name && <Text style={styles.currentName}>{name}</Text>}
        </View>
      </View>
      <Text style={styles.title}>
        {type === 'following'
          ? EN.T_DETAILS_FOLLOWING_LIST
          : EN.T_DETAILS_FOLLOWERS_LIST}
      </Text>
      {loading ? (
        <SkeletonLoader></SkeletonLoader>
      ) : (
        <FlatList
          data={listData}
          onRefresh={init}
          refreshing={loading}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <UserInfoComponent
              userData={item}
              navigation={navigation}
              component="list"
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  currentUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentUserAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  currentUsername: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  currentName: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ListScreen;
