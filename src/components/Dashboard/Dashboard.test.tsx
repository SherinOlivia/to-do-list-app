import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '../../../matchMedia';
import Dashboard from '.';

const user = {
    username: 'testname',
}

describe('Test Dashboard Page Component', () => {
    const mockProps = jest.fn();
    it('Dashboard Title Renders Correctly',async () => {
        render(<BrowserRouter> <Dashboard username={user.username} handleLogOut={mockProps} /> </BrowserRouter>)
        const title = screen.getByText('Dashboard')
        expect(title).toBeDefined()       
    })
        
    it('Profile Button Renders Correctly',async () => {
        render(<BrowserRouter> <Dashboard username={user.username} handleLogOut={mockProps} /> </BrowserRouter>)
        const title = screen.getByText('Profile') as HTMLButtonElement
        expect(title).toBeDefined()       
    })

    it('Tasks List Button Renders Correctly',async () => {
        render(<BrowserRouter> <Dashboard username={user.username} handleLogOut={mockProps} />  </BrowserRouter>)
        const title = screen.getByText('Task List') as HTMLButtonElement
        expect(title).toBeDefined()       
    })

    it('Logout Button Renders Correctly',async () => {
        render(<BrowserRouter> <Dashboard username={user.username} handleLogOut={mockProps} />  </BrowserRouter>)
        const title = screen.getByText('Log Out') as HTMLButtonElement
        expect(title).toBeDefined()       
    })

})

// pnpm run test 'src/components/Dashboard/Dashboard.test.tsx'