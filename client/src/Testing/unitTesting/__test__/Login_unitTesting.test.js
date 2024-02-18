import {fireEvent, render,screen,waitFor} from "@testing-library/react"
import Login from "../../../components/Login"
import '@testing-library/jest-dom/extend-expect';

describe("Unit Testing login Components", ()=>{
    beforeEach(() => {render(<Login />)});
    test("Email input component is rendered", ()=>{
        const email = screen.getByPlaceholderText("enter email");
        expect(email).toBeInTheDocument();
    })
    test("Password input component is rendered",()=>{
        const password = screen.getByPlaceholderText("enter password");
        expect(password).toBeInTheDocument();

    })
    test("Button is rendered",()=>{
        const button = screen.getByTestId("btn");
        expect(button).toBeInTheDocument();

    })
    test("Check password type",()=>{
        const password = screen.getByPlaceholderText("enter password");
        expect(password.type).toBe("password");
    })
    test("Empty Email Field not allowed", async()=>{
        const email = screen.getByPlaceholderText("enter email");
        const password = screen.getByPlaceholderText("enter password");
        const button = screen.getByTestId("btn");
        fireEvent.change(email,{'target' : {'value' : ""}});
        fireEvent.change(password,{'target' : {'value' : "Rutwik@25"}});
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText("Fields cannot be empty")).toBeInTheDocument()
          })

    })
    test("Empty Password field not allowed", async()=>{
        const email = screen.getByPlaceholderText("enter email");
        const password = screen.getByPlaceholderText("enter password");
        const button = screen.getByTestId("btn");
        fireEvent.change(email,{'target' : {'value' : "permanent@gmail.com"}});
        fireEvent.change(password,{'target' : {'value' : ""}});
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText("Fields cannot be empty")).toBeInTheDocument()
          })
    })
    test("Empty Password & Email field both not allowed", async()=>{
        const email = screen.getByPlaceholderText("enter email");
        const password = screen.getByPlaceholderText("enter password");
        const button = screen.getByTestId("btn");
        fireEvent.change(email,{'target' : {'value' : ""}});
        fireEvent.change(password,{'target' : {'value' : ""}});
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText("Fields cannot be empty")).toBeInTheDocument()
          })
    })
})