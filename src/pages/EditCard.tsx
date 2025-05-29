import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import { newCardSchema } from "../validations/newCard.joi";
import axios from "axios";
import { Tcard } from "../types/cardType";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditCard() {
    const [card, setCard] = useState<Tcard>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchCardDetails = async () => {
            try {
                const response = await axios.get(
                    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
                );
                console.log(response.data);

                setCard(response.data);
            } catch (error) {
                console.error("Error fetching card details:", error);
            }
        };

        fetchCardDetails();
    }, [id]);

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<Tcard>({
        mode: "onChange", resolver: joiResolver(newCardSchema),
    });

    useEffect(() => {
        if (card) {
            reset({
                title: card.title,
                subtitle: card.subtitle,
                description: card.description,
                phone: card.phone,
                email: card.email,
                web: card.web,
                image: {
                    url: card.image.url,
                    alt: card.image.alt,
                },
                address: {
                    state: card.address.state,
                    country: card.address.country,
                    city: card.address.city,
                    street: card.address.street,
                    houseNumber: card.address.houseNumber,
                    zip: card.address.zip,
                },
            });
        }
    }, [card, reset]);


    const submitForm = async (data: Tcard) => {
        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["x-auth-token"] = token;
            const response = await axios.put(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card?._id}`, data);
            console.log("card edited successfuly:", response.data);

            if (response.status === 200) {
                toast.success("editing was successful", { autoClose: 2000, });
                navigate('/my-cards');
            }

        } catch (error) {
            console.log("Error registering:", error);
        }
    };


    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-900">

            <form onSubmit={handleSubmit(submitForm)} className="myform flex flex-col gap-4 align-middle w-[50%] ">
                <h1 className="text-2xl font-bold text-gray-800">Edit Card Details</h1>

                <FloatingLabel
                    {...register("title")}
                    variant="outlined"
                    label="title"
                    type="text"
                    color={errors.title ? "error" : "success"}

                />
                {errors.title && (
                    <p className="text-sm text-red-500">{errors.title.message}</p>
                )}


                <FloatingLabel
                    {...register("subtitle")}
                    variant="outlined"
                    label="subtitle"
                    type="text"
                    color={errors.subtitle ? "error" : "success"}

                />
                {errors.subtitle && (
                    <p className="text-sm text-red-500">{errors.subtitle.message}</p>
                )}

                <div className="relative w-full" id="textAreaDiv">
                    <textarea   {...register("description")} id="tdescription" placeholder=" "
                        rows={3} style={{ backgroundColor: "lightblue" }}
                        className={`peer block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border ${errors.description ? "border-red-500" : "border-green-600"
                            } appearance-none focus:outline-none focus:ring-0 focus:border-green-600`}
                    />
                    <label htmlFor="tdescription" className="absolute text-sm text-green-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"> description </label>
                    {errors.description && (
                        <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>

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
                    {...register("web")}
                    variant="outlined"
                    label="web"
                    type="text"
                    color={errors.web ? "error" : "success"}
                />
                {errors.web && (
                    <p className="text-sm text-red-500">{errors.web.message}</p>
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
                        type="number"
                        color={errors.address?.houseNumber ? "error" : "success"}
                    />
                    {errors.address?.houseNumber && (
                        <p className="text-sm text-red-500">{errors.address.houseNumber.message}</p>
                    )}


                    <FloatingLabel
                        {...register("address.zip")}
                        variant="outlined"
                        label="zip"
                        type="number"
                        color={errors.address?.zip ? "error" : "success"}
                    />
                    {errors.address?.zip && (
                        <p className="text-sm text-red-500">{errors.address.zip.message}</p>
                    )}

                </fieldset>


                <Button type="submit" className="w-full" disabled={!isValid}>
                    Submit
                </Button>
            </form>
        </main>
    );
}
