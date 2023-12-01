import { Dashboard as DashboardForm } from '../../components';
import { useCallback, useContext, useEffect } from 'react';
import { AuthContext } from '../../provider/AppProvider';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const {user, setUser } = useContext(AuthContext)
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate()
  
  const handleLogOut = async () => {
    try {
        const response = await fetch(`https://sherinolivia-ttfsxqentq-uc.a.run.app/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            }
        })
        console.log(response)
        if (response.ok){
          const data = await response.json()
            if (data.success == true) {
              localStorage.removeItem('authToken');
              console.log(`See you next time....!`)
              navigate('/login');
            } else {
              console.log(data.message); 
            } 
        } else {
          alert("Logout failed. Please check your credentials.");
        }
    } catch (error) {
        console.error(error)
        alert("Logout Failedddd...!")
    }

  }

  const getDashboard = useCallback(
    async () => {
      try {
        const response = await fetch (`https://sherinolivia-ttfsxqentq-uc.a.run.app/user/profile`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`
          }
        })
        console.log("token:", token)
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
        getDashboard()
      },
      [getDashboard])

if(user) {
  return (
    <DashboardForm name={user?.name} handleLogOut={handleLogOut} />

  );
}
 return null
};

export default Dashboard;