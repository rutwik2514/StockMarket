import Register from "../../../components/Register";
import {fireEvent, render,screen,waitFor} from "@testing-library/react"
import '@testing-library/jest-dom'


//bottom up approach, first smaller test and then combining to bigger tests
describe("Integration Testing register page", ()=>{
    let email,password,confirmPassword,userName,button;
    beforeEach(()=>{
        render(<Register />)
        email = screen.getByTestId("email")
        password = screen.getByTestId("password")
        confirmPassword = screen.getByTestId("confirmPassword")
        userName = screen.getByTestId("userName")
        button = screen.getByTestId("btn"); 
    })

    test("Giving error if password and confirm password does not match", async()=>{
        fireEvent.change(email,{'target' : {'value' : "temproray@gmail.com1000"}});
        fireEvent.change(password,{'target' : {'value' : "temproray"}});
        fireEvent.change(confirmPassword,{'target' : {'value' : "temproray."}});
        fireEvent.change(userName,{'target' : {'value' : "temproray"}});
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText("Password and confirm Password does not match")).toBeInTheDocument()
        })
       
    })
    test("Giving error if user Already present", async()=>{
        fireEvent.change(email,{'target' : {'value' : "permanent@gmail.com"}});
        fireEvent.change(password,{'target' : {'value' : "temproray"}});
        fireEvent.change(confirmPassword,{'target' : {'value' : "temproray"}});
        fireEvent.change(userName,{'target' : {'value' : "temproray"}});
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText("USER ALREADY FOUND")).toBeInTheDocument()
        })
       
    })
})