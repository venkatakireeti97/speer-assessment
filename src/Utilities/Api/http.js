import axios from 'axios';
import {path} from './Urls';

export const searchUserAPI = async searchText => {
  return await axios
    .get(`${path.searchUsersPath}${searchText}`)
    .then(response => response);
};


export const fetchFollowingFollowers = async (userName,type) => {
    return await axios
      .get(`${path.searchUsersPath}${userName}/${type}`)
      .then(response => response);
  };
  
  