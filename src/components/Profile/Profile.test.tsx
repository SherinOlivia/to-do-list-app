import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '../../../matchMedia';
import Profile from '.';

const user = {
    username: 'testusername',
    email: 'test@gmail.com',
    name: 'testname',
    city: 'testcity',
    about_me: 'testabout_me'
}

describe('Test Profile Page Component', () => {
    it('Profile Title Renders Correctly',async () => {
        render(<BrowserRouter> <Profile username={user.username} email={user.email} name={user.name} city={user.city} about_me={user.about_me} /> </BrowserRouter>)
        const title = screen.getByText('Profile Page')
        expect(title).toBeDefined()       
    })

    it('Username Title Renders Correctly',async () => {
        render(<BrowserRouter> <Profile username={user.username} email={user.email} name={user.name} city={user.city} about_me={user.about_me} /> </BrowserRouter>)
        const title = screen.getByText('Username:')
        expect(title).toBeDefined()     
    })
    
    it('Email Title Renders Correctly',async () => {
        render(<BrowserRouter> <Profile username={user.username} email={user.email} name={user.name} city={user.city} about_me={user.about_me} /> </BrowserRouter>)
        const title = screen.getByText('Email:')
        expect(title).toBeDefined()     
    })
    
    it('Name Title Renders Correctly',async () => {
        render(<BrowserRouter> <Profile username={user.username} email={user.email} name={user.name} city={user.city} about_me={user.about_me} /> </BrowserRouter>)
        const title = screen.getByText('Name:')
        expect(title).toBeDefined()     
    })
        
    it('City Title Renders Correctly',async () => {
        render(<BrowserRouter> <Profile username={user.username} email={user.email} name={user.name} city={user.city} about_me={user.about_me} /> </BrowserRouter>)
        const title = screen.getByText('City:')
        expect(title).toBeDefined()     
    })    
    it('About Me Title Renders Correctly',async () => {
        render(<BrowserRouter> <Profile username={user.username} email={user.email} name={user.name} city={user.city} about_me={user.about_me} /> </BrowserRouter>)
        const title = screen.getByText('About Me:')
        expect(title).toBeDefined()     
    })

    it('Return Link Works Correctly', async () => {
        const { getByText } = render(<BrowserRouter><Profile username={user.username} email={user.email} name={user.name} city={user.city} about_me={user.about_me} /></BrowserRouter>);
        const returnLink = getByText('Return') as HTMLLinkElement

        fireEvent.click(returnLink);
        
        await waitFor(() => {
            expect(returnLink).toBeDefined();
        });
    });
})

// pnpm run test 'src/components/Profile/Profile.test.tsx'