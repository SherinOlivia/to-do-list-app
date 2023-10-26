import { useNavigate } from 'react-router-dom';
import { LoginInfo } from '../../types';
import { Login as LoginForm } from '../../components';

const Login = () => {
  const navigate = useNavigate()

  const handleLogin = async (values: LoginInfo) => {
    console.log(`Successfully logged in`, values)

    try {
        const response = await fetch (`https://w18sh-ry.up.railway.app/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(values)
        })
        const data = await response.json()
        console.log(data)
        console.log(data[0])
        if (response.ok){
          console.log(`Welcome ${data[0].username}..!`)
            navigate('/dashboard');
        } else {
            alert(data.errors)
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