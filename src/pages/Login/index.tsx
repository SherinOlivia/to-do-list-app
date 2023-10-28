import { useNavigate } from 'react-router-dom';
import { LoginInfo } from '../../types';
import { Login as LoginForm } from '../../components';

const Login = () => {
  const navigate = useNavigate()

  const handleLogin = async (values: LoginInfo) => {
    console.log(`Successfully logged in`, values)

    try {
        const response = await fetch(`https://w18sh-ry.up.railway.app/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(values)
        })
        console.log(response)
        if (response.ok){
          const data = await response.json()
          const result = JSON.stringify(data.data.message)
          console.log(result)
            if (data.success) {
              console.log(`Welcome....!`)
              navigate('/dashboard');
            } else {
              console.log(data.message); 
            } 
        } else {
          alert("Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error(error)
        alert("Login Failedddd...!")
    }

  }

  return (
    <LoginForm onSubmit={handleLogin} />

  );
};

export default Login;