import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import { registerSchema } from "../validations/register.joi";
import axios from "axios";
import { Radio, Label } from 'flowbite-react';

type FormData = {
    name: {
        first: string,
        middle: string,
        last: string,
    },
    phone: number,
    email: string,
    password: string,
    image: {
        url: string,
        alt: string,
    },
    address: {
        state: string,
        country: string,
        city: string,
        street: string,
        houseNumber: number,
        zip: number
    },
    isBusiness: boolean
};


export default function App() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        defaultValues: {
            name: {
                first: "",
                middle: "",
                last: ""
            },
            phone: 0,
            email: "",
            password: "",
            image: {
                url: "",
                alt: ""
            },
            address: {
                state: "",
                country: "",
                city: "",
                street: "",
                houseNumber: 0,
                zip: 0
            },
            isBusiness: true
        },
        mode: "onChange",
        resolver: joiResolver(registerSchema),
    });

    const submitForm = async (data: FormData) => {
        console.log("Form submitted", data);
        try {
            const response = await axios.post(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users", data);
            console.log("registered successful:", response.data);
        } catch (error) {
            console.log("Error registering:", error);
        }
    };



    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-900">

            <form onSubmit={handleSubmit(submitForm)} className="myform flex flex-col gap-4 align-middle w-[50%] ">

                <fieldset className="flex gap-3 justify-center" >
                    <legend className="mb-1" style={{ color: "#057A55" }}>name</legend>

                    <FloatingLabel
                        {...register("name.first")}
                        variant="outlined"
                        label="First Name"
                        type="text"
                        color={errors.name?.first ? "error" : "success"}

                    />
                    {errors.name?.first && (
                        <p className="text-sm text-red-500">{errors.name.first.message}</p>
                    )}
                    <FloatingLabel
                        {...register("name.middle")}
                        variant="outlined"
                        label="Middle Name"
                        type="text"
                        color={errors.name?.middle ? "error" : "success"}

                    />
                    {errors.name?.middle && (
                        <p className="text-sm text-red-500">{errors.name.middle.message}</p>
                    )}

                    <FloatingLabel
                        {...register("name.last")}
                        variant="outlined"
                        label="Last Name"
                        type="text"
                        color={errors.name?.last ? "error" : "success"}

                    />
                    {errors.name?.last && (
                        <p className="text-sm text-red-500">{errors.name.last.message}</p>
                    )}

                </fieldset>


                <FloatingLabel
                    {...register("phone")}
                    variant="outlined"
                    label="Phone"
                    type="number"
                    color={errors.phone ? "error" : "success"}
                />
                {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}

                <FloatingLabel
                    {...register("email")}
                    variant="outlined"
                    label="Email address"
                    type="email"
                    color={errors.email ? "error" : "success"}
                />
                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                )}

                <FloatingLabel
                    {...register("password")}
                    variant="outlined"
                    label="Password"
                    type="password"
                    color={errors.password ? "error" : "success"}
                />
                {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                )}

                <fieldset className="flex gap-3 justify-center">
                    <legend className="mb-1" style={{ color: "#057A55" }}>image</legend>

                    <FloatingLabel
                        {...register("image.url")}
                        variant="outlined"
                        label="url"
                        type="text"
                        color={errors.image?.url ? "error" : "success"}
                    />
                    {errors.image?.url && (
                        <p className="text-sm text-red-500">{errors.image.url.message}</p>
                    )}


                    <FloatingLabel
                        {...register("image.alt")}
                        variant="outlined"
                        label="alt"
                        type="text"
                        color={errors.image?.alt ? "error" : "success"}
                    />
                    {errors.image?.alt && (
                        <p className="text-sm text-red-500">{errors.image.alt.message}</p>
                    )}

                </fieldset>



                <fieldset className="flex gap-3 flex-wrap justify-center">
                    <legend className="mb-1" style={{ color: "#057A55" }}>address</legend>

                    <FloatingLabel
                        {...register("address.state")}
                        variant="outlined"
                        label="state"
                        type="text"
                        color={errors.address?.state ? "error" : "success"}
                    />
                    {errors.address?.state && (
                        <p className="text-sm text-red-500">{errors.address.state.message}</p>
                    )}


                    <FloatingLabel
                        {...register("address.country")}
                        variant="outlined"
                        label="country"
                        type="text"
                        color={errors.address?.country ? "error" : "success"}
                    />
                    {errors.address?.country && (
                        <p className="text-sm text-red-500">{errors.address.country.message}</p>
                    )}


                    <FloatingLabel
                        {...register("address.city")}
                        variant="outlined"
                        label="city"
                        type="text"
                        color={errors.address?.city ? "error" : "success"}
                    />
                    {errors.address?.city && (
                        <p className="text-sm text-red-500">{errors.address.city.message}</p>
                    )}


                    <FloatingLabel
                        {...register("address.street")}
                        variant="outlined"
                        label="street"
                        type="text"
                        color={errors.address?.street ? "error" : "success"}
                    />
                    {errors.address?.street && (
                        <p className="text-sm text-red-500">{errors.address.street.message}</p>
                    )}


                    <FloatingLabel
                        {...register("address.houseNumber")}
                        variant="outlined"
                        label="houseNumber"
                        type="text"
                        color={errors.address?.houseNumber ? "error" : "success"}
                    />
                    {errors.address?.houseNumber && (
                        <p className="text-sm text-red-500">{errors.address.houseNumber.message}</p>
                    )}


                    <FloatingLabel
                        {...register("address.zip")}
                        variant="outlined"
                        label="zip"
                        type="text"
                        color={errors.address?.zip ? "error" : "success"}
                    />
                    {errors.address?.zip && (
                        <p className="text-sm text-red-500">{errors.address.zip.message}</p>
                    )}

                </fieldset>

                <div className="flex gap-3 justify-center">
                    <p style={{ color: "#057A55" }}>are you a business?</p>
                    <Radio
                        id="yes"
                        value="yes"
                        {...register('isBusiness', {
                            setValueAs: (val) => val === 'yes',
                        })}
                    />
                    <Label htmlFor="option1" style={{ color: "#057A55" }}>yes</Label>


                    <Radio
                        id="no"
                        value="no"
                        {...register('isBusiness', {
                            setValueAs: (val) => val === 'yes',
                        })}
                    />
                    <Label htmlFor="option2" style={{ color: "#057A55" }}>no</Label>


                </div>


                <Button type="submit" className="w-full" disabled={!isValid}>
                    Submit
                </Button>
            </form>
        </main>
    );
}