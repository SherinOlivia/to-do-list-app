import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect } from 'react';
import { TaskEditInfo } from "../../types";
import { EditTask as EditTaskComponent } from "../../components";
import { TaskEditContext } from "../../provider/AppProvider";

const EditTask = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { task, setTask } = useContext(TaskEditContext);
    const token = localStorage.getItem('authToken');

    const getTask = useCallback(async () => {
        try {
            const response = await fetch(`https://sherinolivia-ttfsxqentq-uc.a.run.app/task/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setTask?.(data);
                console.log("Task Data Successfully fetched:", data);
            } else {
                console.log("Error in Fetching Task Data..");
            }
        } catch (error) {
            console.error(error);
        }
    }, [id, setTask, token]);

    useEffect(() => {
        getTask();
    }, [getTask]);

    const handleEdit = async (values: TaskEditInfo) => {
        try {
            if (!task) {
                console.log("Task data not available. Please wait for it to be fetched.");
                return;
            }

            const response = await fetch(`https://sherinolivia-ttfsxqentq-uc.a.run.app/task/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
                body: JSON.stringify(values)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setTask?.(data.updatedTask);
                navigate('/task');
            } else {
                console.log(response);
                console.log("Failed to edit the task");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to Edit Task...!");
        }
    };

    return task ? <EditTaskComponent onSubmit={handleEdit} task={task} /> : null;
};

export default EditTask;
