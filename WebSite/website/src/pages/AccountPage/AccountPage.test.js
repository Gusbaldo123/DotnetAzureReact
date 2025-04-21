import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import AccountPage from "./AccountPage";
import UserManager from "../../utils/UserManager";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const original = jest.requireActual('react-router-dom');
    return {
        ...original,
        useNavigate: () => mockNavigate,
        Link: ({ to, children, ...rest }) => (
            <a href={typeof to === 'string' ? to : to.pathname} {...rest}>
                {children}
            </a>
        ),
    };
});

jest.mock('../../utils/UserManager.js', () => ({
    getLocalUser: jest.fn(),
    setLocalUser: jest.fn(),
}));

describe('AccountPage', () => {
    test('Redirects to /login if no user is found', () => {
        jest.spyOn(UserManager, 'getLocalUser').mockReturnValue(null);
    
        render(
            <MemoryRouter initialEntries={['/account']}>
                <AccountPage />
            </MemoryRouter>
        );
    
        expect(mockNavigate).toHaveBeenCalledWith("/login?form=signIn");
    });
})