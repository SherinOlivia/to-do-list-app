import { Table } from "antd"
import { ColumnsType } from "antd/es/table";
import { TaskListInfo } from "../../types";

interface Props {
    data: TaskListInfo[];
    columns: ColumnsType<TaskListInfo>;
  }

const TaskList = ({ data, columns} : Props) => {
  const pagination = {
    pageSize: 5,
  }

    return (
      <>
        
        <Table columns={columns} dataSource={data} pagination={pagination} />

      </>

    )
}

export default TaskList
