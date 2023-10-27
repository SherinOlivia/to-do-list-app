import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
import '../../../matchMedia';
import { ColumnsType } from 'antd/es/table';
import { TaskListInfo } from '../../types';
import TaskList from '.';
import { Checkbox } from 'antd';

const columns: ColumnsType<TaskListInfo> = [
    {
      title: 'Purpose',
      dataIndex: 'purpose',
      key: 'purpose',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
      render: (Date) => Date || 'N/A',
    },
    {
      title: 'Completed',
      dataIndex: 'completed',
      key: 'completed',
      render: (_, record) => (
        <>
          <label>
            <Checkbox
              checked={record.completed}
              onChange={() => {}}
            />
          </label>
        </>
      ),
    },
  ];

describe('Test List of Task Component', () => {

    // it('Purpose Column Title Renders Correctly',async () => {
    //     render(<TaskList columns={columns} data={[]} />)
    //     const title = screen.getByText('Purpose')
    //     expect(title).toBeDefined()     
    // })

    // it('Title Column Title Renders Correctly',async () => {
    //     render(<TaskList columns={columns} data={[]} />)
    //     const title = screen.getByText('Title')
    //     expect(title).toBeDefined()     
    // })

    // it('Description Column Title Renders Correctly',async () => {
    //     render(<TaskList columns={columns} data={[]} />)
    //     const title = screen.getByText('Description')
    //     expect(title).toBeDefined()     
    // })

    // it('Due Date Column Title Renders Correctly',async () => {
    //     render(<TaskList columns={columns} data={[]} />)
    //     const title = screen.getByText('Due Date')
    //     expect(title).toBeDefined()     
    // })

    // it('Status Column Title Renders Correctly',async () => {
    //     render(<TaskList columns={columns} data={[]} />)
    //     const title = screen.getByText('Status')
    //     expect(title).toBeDefined()     
    // })

    it('Testing Header Column', () => {
        render(<TaskList columns={columns} data={[]} />)

        columns.map((column) => {
            if(column.title) {
                const title = screen.getByText(column.title.toString())
                expect(title).toBeDefined()
            }
        });
    });
})

// pnpm run test 'src/components/TaskList/TaskList.test.tsx'