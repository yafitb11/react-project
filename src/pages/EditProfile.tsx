import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import { editUserSchema } from "../validations/editUser.joi";
import axios from "axios";
import { FormData } from "../types/formData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";

export default function EditProfile() {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid },
    } = useForm<FormData>({
        defaultValues: {
            name: {
                first: user?.name.first,
                middle: user?.name.middle,
                last: user?.name.last,
            },
            phone: user?.phone,
            image: {
                url: user?.image.url,
                alt: user?.image.alt,
            },
            address: {
                state: user?.address.state,
                country: user?.address.country,
                city: user?.address.city,
                street: user?.address.street,
                houseNumber: user?.address.houseNumber,
                zip: user?.address.zip,
            },

        },
        mode: "onChange",
        resolver: joiResolver(editUserSchema),
    });

    const submitForm = async (data: FormData) => {
        const token = localStorage.getItem("token");
        if (token) {
            const parsedToken = jwtDecode(token) as { _id: string; };

            axios.defaults.headers.common["x-auth-token"] = token;
            try {
                const response = await axios.put(
                    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + parsedToken._id, data);

                if (response.status === 200) {
                    dispatch(userActions.login(response.data));
                    toast.success("editing was successful", { autoClose: 2000, });
                    navigate('/profile');
                }

            } catch (error) {
                console.log("Error registering:", error);
                toast.error("something went wrong", { autoClose: 2000, });
            }
        }
    }


    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-900">

            <form onSubmit={handleSubmit(submitForm)} className="myform w-[50%] ">

                <h1 className="text-2xl font-bold text-gray-800">Edit your details</h1>

                <fieldset className="flex gap-3 justify-center" >
                    <legend className="mb-1" style={{ color: "#057A55" }}>Name</legend>

                    <FloatingLabel {...register("name.first")} variant="outlined" label="First Name" type="text" color={errors.name?.first ? "error" : "success"} />
                    {errors.name?.first && (
                        <p className="text-sm text-red-500">{errors.name.first.message}</p>
                    )}

                    <FloatingLabel {...register("name.middle")} variant="outlined" label="Middle Name" type="text" color={errors.name?.middle ? "error" : "success"} />
                    {errors.name?.middle && (
                        <p className="text-sm text-red-500">{errors.name.middle.message}</p>
                    )}

                    <FloatingLabel {...register("name.last")} variant="outlined" label="Last Name"
                        type="text" color={errors.name?.last ? "error" : "success"} />
                    {errors.name?.last && (
                        <p className="text-sm text-red-500">{errors.name.last.message}</p>
                    )}

                </fieldset>


                <FloatingLabel  {...register("phone")} variant="outlined" label="Phone"
                    type="number" color={errors.phone ? "error" : "success"}
                />
                {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}


                <fieldset className="flex gap-3 justify-center">
                    <legend className="mb-1" style={{ color: "#057A55" }}>Image</legend>

                    <FloatingLabel {...register("image.url")} variant="outlined" label="url"
                        type="text" color={errors.image?.url ? "error" : "success"} />
                    {errors.image?.url && (
                        <p className="text-sm text-red-500">{errors.image.url.message}</p>
                    )}


                    <FloatingLabel  {...register("image.alt")} variant="outlined" label="alt"
                        type="text" color={errors.image?.alt ? "error" : "success"} />
                    {errors.image?.alt && (
                        <p className="text-sm text-red-500">{errors.image.alt.message}</p>
                    )}

                </fieldset>



                <fieldset className="flex gap-3 flex-wrap justify-center">
                    <legend className="mb-1" style={{ color: "#057A55" }}>Address</legend>

                    <FloatingLabel   {...register("address.state")} variant="outlined" label="state"
                        type="text" color={errors.address?.state ? "error" : "success"} />
                    {errors.address?.state && (
                        <p className="text-sm text-red-500">{errors.address.state.message}</p>
                    )}


                    <FloatingLabel {...register("address.country")} variant="outlined" label="country"
                        type="text" color={errors.address?.country ? "error" : "success"} />
                    {errors.address?.country && (
                        <p className="text-sm text-red-500">{errors.address.country.message}</p>
                    )}


                    <FloatingLabel  {...register("address.city")} variant="outlined" label="city"
                        type="text" color={errors.address?.city ? "error" : "success"}
                    />
                    {errors.address?.city && (
                        <p className="text-sm text-red-500">{errors.address.city.message}</p>
                    )}


                    <FloatingLabel   {...register("address.street")} variant="outlined" label="street"
                        type="text" color={errors.address?.street ? "error" : "success"} />
                    {errors.address?.street && (
                        <p className="text-sm text-red-500">{errors.address.street.message}</p>
                    )}


                    <FloatingLabel {...register("address.houseNumber")} variant="outlined" label="houseNumber" type="text"
                        color={errors.address?.houseNumber ? "error" : "success"} />
                    {errors.address?.houseNumber && (
                        <p className="text-sm text-red-500">{errors.address.houseNumber.message}</p>
                    )}


                    <FloatingLabel {...register("address.zip")} variant="outlined" label="zip"
                        type="text" color={errors.address?.zip ? "error" : "success"} />
                    {errors.address?.zip && (
                        <p className="text-sm text-red-500">{errors.address.zip.message}</p>
                    )}

                </fieldset>


                <Button type="submit" className="w-full" disabled={!isValid}>
                    Submit
                </Button>
            </form>
        </main>);
}