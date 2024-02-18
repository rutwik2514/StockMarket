import {fireEvent, render,screen,waitFor} from "@testing-library/react"
import Login from "../../../components/Login"
import '@testing-library/jest-dom/extend-expect';

describe("Intergration Testing : login", ()=>{
    beforeEach(() => {render(<Login />)});

    test("Giving error on wrong password",async()=>{
        const email = screen.getByPlaceholderText("enter email");
        const password = screen.getByPlaceholderText("enter password");
        const button = screen.getByTestId("btn");
        fireEvent.change(email,{'target' : {'value' : "permanent@gmail.com"}});
        fireEvent.change(password,{'target' : {'value' : "wrongPassword"}});
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText("INCORRECT PASSWORD")).toBeInTheDocument()
          })

    })


    test("Giving error if email not registered",async()=>{
        const email = screen.getByPlaceholderText("enter email");
        const password = screen.getByPlaceholderText("enter password");
        const button = screen.getByTestId("btn");
        fireEvent.change(email,{'target' : {'value' : "permanent@gdsamail.com"}});
        fireEvent.change(password,{'target' : {'value' : "Rutwik@25"}});
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText("USER NOT FOUND")).toBeInTheDocument()
          })


    })

    
    test("Should be able to login if password and email matches",async()=>{
        const email = screen.getByPlaceholderText("enter email");
        const password = screen.getByPlaceholderText("enter password");
        const button = screen.getByTestId("btn");
        fireEvent.change(email,{'target' : {'value' : "permanent@gmail.com"}});
        fireEvent.change(password,{'target' : {'value' : "Rutwik@25"}});
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText("Login Successful, please wait while we redirect")).toBeInTheDocument()
          })
    })
})