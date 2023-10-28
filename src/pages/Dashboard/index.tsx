import { Dashboard as DashboardForm } from '../../components';
import { useCallback, useContext, useEffect } from 'react';
import { AuthContext } from '../../provider/AppProvider';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const {user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const handleLogOut = async () => {
    try {
        const response = await fetch(`http://localhost:6060/api/users/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        console.log(response)
        if (response.ok){
          const data = await response.json()
            if (data.success) {
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
        const response = await fetch (`https://w18sh-ry.up.railway.app/api/users/profile`, {
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
        getDashboard()
      },
      [getDashboard])

if(user) {
  return (
    <DashboardForm username={user?.username} handleLogOut={handleLogOut} />

  );
}
 return null
};

export default Dashboard;