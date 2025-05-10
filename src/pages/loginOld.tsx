import { Button, FloatingLabel, HelperText } from "flowbite-react";
import axios from "axios";
import { ChangeEvent, useState } from "react";

export default function LoginOld() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });
    const [isDisabled, setIsDisabled] = useState(true);


    const onSubmit = async () => {
        console.log(formData);
        try {
            const response = await axios.post(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
                {
                    email: formData.email,
                    password: formData.password,
                },
            );
            console.log("Login successful:", response.data);
        } catch (error) {
            console.log("Error logging in:", error);
        }
    };

    /* email: "admin@gmail.com",
                    password: "Abc!123Abc",
                    */

    const onChanges = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
        isFormValid();
    };

    const isFormValid = () => {
        const errors = {
            email: "",
            password: "",
        };

        if (!formData.email.includes("@")) {
            errors.email = "Email is invalid";
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{9,}$/;

        if (!passwordRegex.test(formData.password)) {
            errors.password = "Password must be at least 9 characters and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-";
        }

        setFormErrors(errors);
        const isAllFieldsValid =
            formErrors.email === "" && formErrors.password === "";
        setIsDisabled(!isAllFieldsValid);
    };

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <h1>Login</h1>
            <form className="flex w-1/4 flex-col gap-2">
                <FloatingLabel
                    variant="standard"
                    label="email"
                    id="email"
                    onInput={onChanges}
                    color={formErrors.email === "" ? "default" : "error"}
                />
                <HelperText className="text-left" color="failure">
                    {formErrors.email}
                </HelperText>

                <FloatingLabel
                    variant="standard"
                    label="password"
                    id="password"
                    type="password"
                    onInput={onChanges}
                    color={formErrors.password === "" ? "default" : "error"}
                />
                <HelperText className="text-left" color="failure">
                    {formErrors.password}
                </HelperText>

                <Button disabled={isDisabled} onClick={onSubmit}>
                    Submit
                </Button>
            </form>
        </div>
    );
}