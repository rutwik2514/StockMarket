import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Login from "../../../components/Login"
import '@testing-library/jest-dom/extend-expect';

describe("Unit Testing login Components", () => {
    let email, password, button;
    beforeEach(() => {
        render(<Login />)
        email = screen.getByTestId("email")
        password = screen.getByTestId("password");
        button = screen.getByTestId("btn");
    });
    test("Email input component is rendered", () => {
        expect(email).toBeInTheDocument();
    })
    test("Password input component is rendered", () => {
        expect(password).toBeInTheDocument();

    })
    test("Button is rendered", () => {
        expect(button).toBeInTheDocument();

    })
    test("Check password type", () => {
        expect(password.type).toBe("password");
    })
    test("Check Email type", () => {
        expect(email.type).toBe("email");
    })
    test("Empty Email Field not allowed", async () => {
        fireEvent.change(email, { 'target': { 'value': "" } });
        fireEvent.change(password, { 'target': { 'value': "Rutwik@25" } });
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText("Fields cannot be empty")).toBeInTheDocument()
        })

    })
    test("Empty Password field not allowed", async () => {
        fireEvent.change(email, { 'target': { 'value': "permanent@gmail.com" } });
        fireEvent.change(password, { 'target': { 'value': "" } });
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText("Fields cannot be empty")).toBeInTheDocument()
        })
    })
    test("Empty Password & Email field both not allowed", async () => {
        fireEvent.change(email, { 'target': { 'value': "" } });
        fireEvent.change(password, { 'target': { 'value': "" } });
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText("Fields cannot be empty")).toBeInTheDocument()
        })
    })
})