import { useNavigate } from 'react-router-dom';
import { LoginInfo } from '../../types';
import { Login as LoginForm } from '../../components';

const Login = () => {
  const navigate = useNavigate()

  const handleLogin = async (values: LoginInfo) => {
    console.log(`Successfully logged in`, values)

    try {
        const response = await fetch(`https://sherinolivia-ttfsxqentq-uc.a.run.app/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        console.log(response)
        if (response.ok){
          const data = await response.json()
          const result = data.message
          const token = data.token
          console.log(result)
            if (data.success == true) {
              console.log("Data:", data)
              localStorage.setItem('authToken', token) 
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