import { useNavigate } from "react-router-dom"
import { CreateTaskInfo } from "../../types";
import { CreateTask as CreateTaskComponent } from "../../components";


const CreateTask = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('authToken');

    const handleCreate = async (values: CreateTaskInfo) => {
      
        try {
            const response = await fetch (`https://sherinolivia-ttfsxqentq-uc.a.run.app/task/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
                body: JSON.stringify(values)
            })
            if (response.ok) {
                console.log(response)
                const data = await response.json()
                console.log(data)
                navigate('/task');  
            } else {
                console.log(response)
                console.log("Failed to create new task")
                return
            }
   
        } catch (error) {
            console.error(error)
            alert("Failed to Create New Task...!")
        }  
      }

    return (
        <CreateTaskComponent onSubmit={handleCreate} />
    )    
}

export default CreateTask