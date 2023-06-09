import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {searchUserAPI} from '../../Utilities/Api/http';
import UserInfoComponent from '../../Components/UserInfo';
import SkeletonLoader from '../../Components/SkeletonLoader';


/**
 * ProfileScreen
 * @description - This is a Parent Component which is navigated in order to fetch and display the profile of user.
 * @param {object} route - This contains the navigation props in particular the username as login.
 * @param {function} navigation - Sending navigation function reference.
 */


const ProfileScreen = ({route, navigation}) => {
  const {login} = route.params;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const userResponse = await searchUserAPI(login);
        const {data, status} = userResponse;

        if (status === 200) {
          console.log('The data', data);
          setUserData(data);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        Alert.alert(EN.T_HOME_API_ERROR);
      }
    }
    init();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <SkeletonLoader></SkeletonLoader>
      ) : (
        <UserInfoComponent
          userData={userData}
          navigation={navigation}
          component="profile"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal:10
  },
});

export default ProfileScreen;
