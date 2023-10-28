import { useNavigate } from 'react-router-dom';
import { RegisterInfo } from '../../types';
import { Register as RegisterForm } from '../../components';

  const Register = () => {
    const navigate = useNavigate()

      const handleRegister = async (values: RegisterInfo) => {
        console.log(`Successfully Registered..!`, values)
    
        try {
            const response = await fetch (`https://w18sh-ry.up.railway.app/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            console.log(response)
            const data = await response.json()
    
            if (response.ok){
              console.log("Register Oke")
                navigate('/login');
            } else {
                alert(data.errors)
            }
        } catch (error) {
            alert("Register Failedddd...!")
        }
    
      }

      return (
        <RegisterForm onSubmit={handleRegister} />
      )
 
    };

  export default Register