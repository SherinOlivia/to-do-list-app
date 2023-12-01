import { Profile as ProfileForm } from '../../components';
import { useCallback, useContext, useEffect } from 'react';
import { AuthContext } from '../../provider/AppProvider';

const Profile = () => {
  const {user, setUser } = useContext(AuthContext)
  const token = localStorage.getItem('authToken');

  const getProfile = useCallback(
    async () => {
      try {
        const response = await fetch (`https://sherinolivia-ttfsxqentq-uc.a.run.app/user/profile`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`
          }
        })

        if(response.ok){
          const data = await response.json()
          setUser?.(data)
          console.log("Profile Data Successfully fetched:", data);
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