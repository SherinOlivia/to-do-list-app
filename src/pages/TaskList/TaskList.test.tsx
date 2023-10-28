import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import 'jest-localstorage-mock';
import '../../../matchMedia';
import TaskList from '.';

const response = {
  "data": [
    {
      id: "1",
      "userId": "3",
      "title" : "test-title",
      "due_date": "2023-10-26",
      "description": "test-description",
      "purpose": "test-purpose",
      "completed": 0,
      "isDeleted": 0
    }
  ]
}

  globalThis.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(response)
  })
  
  describe('Testing Task List Page', () => {
    it('Test Task List Page Renders correctly', async () => {
      render(
        <MemoryRouter initialEntries={['/task']}>
          <Routes>
            <Route path='/task' element={<TaskList />} />
          </Routes>

        </MemoryRouter>
      )
  
      await waitFor(async () => {
        expect(globalThis.fetch).toHaveBeenCalledWith(
          `https://w18sh-ry.up.railway.app/api/tasks`,
          expect.objectContaining({
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: "include",
          })
        );
        expect(screen.getByText('Purpose')).toBeDefined();
        expect(screen.getByText('Title')).toBeDefined();
        expect(screen.getByText('Description')).toBeDefined();
        expect(screen.getByText('Due Date')).toBeDefined();
        expect(screen.getByText('Task List')).toBeDefined();
        expect(screen.getByText('Action')).toBeDefined();
        expect(screen.getByText('Edit')).toBeDefined();
        expect(screen.getByText('Delete')).toBeDefined();
      });
    });
  });
  
// pnpm run test 'src/pages/TaskList/TaskList.test.tsx'