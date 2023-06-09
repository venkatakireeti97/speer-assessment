import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Text,
} from 'react-native';
import EN from '../../Constants/String';
import {searchUserAPI} from '../../Utilities/Api/http';
import NotFoundComponent from '../../Components/NotFound';
import UserInfoComponent from '../../Components/UserInfo';
import SkeletonLoader from '../../Components/SkeletonLoader';


/**
 * HomeScreen
 * @description - This is a Parent Component which has the search functionality and is used to get the root user.
 * @param {object} route - This contains the navigation props in particular the username as login.
 * @param {function} navigation - Sending navigation function reference.
 */


const HomeScreen = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const debounceRef = useRef(null);

  //Added Debounce to Preserve api calls during search
  const handleSearch = text => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (!text.length) {
        setUserData(null);
        return;
      }
      setLoading(true);
      setError(false);
      try {
        const userResponse = await searchUserAPI(text);
        const {data, status} = userResponse;

        if (status === 200) {
          setUserData(data); //Setting User Data On Homescreen
          setLoading(false);
        }
      } catch (e) {
        if (e.response.status === 404) {
          setLoading(false); //Not Found Block
          setUserData(null);
          setError(true);
        } else {
          setLoading(false);
          Alert.alert(EN.T_HOME_API_ERROR);
        }
      }
    }, 400);
  };

  useEffect(() => {
    return () => {
      clearTimeout(debounceRef.current); //Clearing Debounce Ref
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.homeText}>{EN.T_HOME_PLACEHOLDER}</Text>
      <TextInput
        style={styles.input}
        placeholder={EN.T_HOME_SEARCH_PLACEHOLDER}
        onChangeText={handleSearch}
      />
      {loading ? (
        <SkeletonLoader />
      ) : error ? (
        <NotFoundComponent />
      ) : userData ? (
        <UserInfoComponent
          userData={userData}
          component="home"
          navigation={navigation}
        />
      ) : (
        ''
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  homeText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default HomeScreen;
