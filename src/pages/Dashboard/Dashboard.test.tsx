import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppProvider, { AuthContext } from '../../provider/AppProvider';
import 'jest-localstorage-mock';
import '../../../matchMedia';
import Profile from '.';

const mockResponse = {
  username: 'testusername',
  email: 'test@gmail.com',
  name: 'testname',
  city: 'testcity',
  about_me: 'testabout_me'
};

globalThis.fetch = jest.fn().mockResolvedValue({
  json: async () =>  ({ success: true, data: {  username:'testusername', email:'test@gmail.com', name: 'testname', city: 'testcity', about_me: 'testabout_me'  }}),
  ok: true
});

describe('Testing Profile Page', () => {
  it("Test Profile's Rendered Information", async () => {
    const setUser = jest.fn();
    render(
      <BrowserRouter>
        <AppProvider>
          <AuthContext.Provider value={{ user: undefined, setUser }}>
            <Profile />
          </AuthContext.Provider>
        </AppProvider>
      </BrowserRouter>
    );

    await waitFor( () => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        `https://w18shbe.azurewebsites.net/api/users/profile`,
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
      );

      expect(setUser).toHaveBeenCalledTimes(1);
      expect(setUser).toHaveBeenCalledWith(mockResponse);
    });
  });
});

// pnpm run test 'src/pages/Profile/Profile.test.tsx'