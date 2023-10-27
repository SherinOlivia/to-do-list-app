import { Profile as ProfileForm } from '../../components';
import { useCallback, useContext, useEffect } from 'react';
import { AuthContext } from '../../provider/AppProvider';

const Profile = () => {
  const {user, setUser } = useContext(AuthContext)

  const getProfile = useCallback(
    async () => {
      try {
        const response = await fetch (`https://w18shbe.azurewebsites.net/api/users/profile`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: "include"
        })

        if(response.ok){
          const data = await response.json()
          setUser?.(data.data[0])
          console.log("Profile Data Successfully fetched:", data.data[0]);
        } else {
          console.log("Error in Fetching User Data..")
        }
    
      } catch (error) {
        console.error(error)
      }
    },[setUser])

    useEffect(
      () => {
        getProfile()
      },
      [getProfile])

if(user) {
  return (
    <ProfileForm username={user?.username} email={user?.email} name={user?.name} city={user?.city} about_me={user?.about_me} />

  );
}
 return null
};

export default Profile;