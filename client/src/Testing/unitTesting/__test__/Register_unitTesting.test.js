import Register from "../../../components/Register";
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'

describe("Unit testing register page", () => {
    let email,password,confirmPassword,userName,button;
    beforeEach(() => {
        render(<Register />);
        email = screen.getByTestId("email")
        password = screen.getByTestId("password")
        confirmPassword = screen.getByTestId("confirmPassword")
        userName = screen.getByTestId("userName")
        button = screen.getByTestId("btn");

    })
    test("Email component renders", () => {
        expect(email).toBeInTheDocument();

    })
    test("Password component renders", () => {
        expect(password).toBeInTheDocument();
    })
    test("Confirm Password component renders", () => {
        expect(confirmPassword).toBeInTheDocument();
    })
    test("Username component renders", () => {
        expect(userName).toBeInTheDocument();
    })
    test("Email Type to be email ", () => {
        expect(email.type).toBe("email");
    })
    test("Password Type to be password ", () => {
        expect(password.type).toBe("password");
    })
    test("confirm Password Type ", () => {
        expect(confirmPassword.type).toBe("password");
    })
    test("Empty email not allowed", async () => {
        fireEvent.change(email, { 'target': { 'value': "" } });
        fireEvent.change(password, { 'target': { 'value': "temproray" } });
        fireEvent.change(confirmPassword, { 'target': { 'value': "temproray" } });
        fireEvent.change(userName, { 'target': { 'value': "temproray" } });
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText("Fields cannot be empty")).toBeInTheDocument()
        })
    })
    test("Empty password not allowed", async () => {
        fireEvent.change(email, { 'target': { 'value': "temproray@gmail.com" } });
        fireEvent.change(password, { 'target': { 'value': "" } });
        fireEvent.change(confirmPassword, { 'target': { 'value': "temproray" } });
        fireEvent.change(userName, { 'target': { 'value': "temproray" } });
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText("Fields cannot be empty")).toBeInTheDocument()
        })
    })
    test("Empty confirm password not allowed", async () => {
        fireEvent.change(email, { 'target': { 'value': "temprorary@gmail.com" } });
        fireEvent.change(password, { 'target': { 'value': "temproary" } });
        fireEvent.change(confirmPassword, { 'target': { 'value': "" } });
        fireEvent.change(userName, { 'target': { 'value': "temproray" } });
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText("Fields cannot be empty")).toBeInTheDocument()
        })
    })
    test("Empty userName not allowed", async () => {
        fireEvent.change(email, { 'target': { 'value': "temproray@gmail.com" } });
        fireEvent.change(password, { 'target': { 'value': "temproray" } });
        fireEvent.change(confirmPassword, { 'target': { 'value': "temproray" } });
        fireEvent.change(userName, { 'target': { 'value': "" } });
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText("Fields cannot be empty")).toBeInTheDocument()
        })
    })
})
