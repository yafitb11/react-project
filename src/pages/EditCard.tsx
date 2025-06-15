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
import useAuth from "../hooks/useAuth";

export default function EditCard() {
    const { user, autoLogIn } = useAuth();
    { !user && autoLogIn(); }
    const [card, setCard] = useState<Tcard>();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCardDetails = async () => {
            try {
                const response = await axios.get(
                    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
                );

                setCard(response.data);
            } catch (error) {
                console.error("Error fetching card details:", error);
            }
        };
        fetchCardDetails();
    }, [id]);

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

            if (response.status === 200) {
                toast.success("editing was successful", { autoClose: 2000, });
                navigate('/my-cards');
            }

        } catch (error) {
            console.log("Error registering:", error);
            toast.error("something went wrong", { autoClose: 2000, });
        }
    };


    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-white py-4 dark:bg-slate-600">

            <form onSubmit={handleSubmit(submitForm)} className="myform">
                <h1 className="text-2xl font-bold text-gray-800">Edit Card Details</h1>

                <FloatingLabel
                    {...register("title")}
                    variant="outlined"
                    label="title"
                    type="text"
                    color={errors.title ? "error" : "success"}
                />
                {errors.title && (<p>{errors.title.message}</p>)}

                <FloatingLabel
                    {...register("subtitle")}
                    variant="outlined"
                    label="subtitle"
                    type="text"
                    color={errors.subtitle ? "error" : "success"}
                />
                {errors.subtitle && (<p>{errors.subtitle.message}</p>)}

                <div className="relative w-full" id="textAreaDiv">
                    <textarea   {...register("description")} id="tdescription" placeholder=" "
                        rows={3} style={{ backgroundColor: "lightblue" }}
                        className={`peer block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border ${errors.description ? "!border-red-600 dark:!border-red-500" : "border-green-600 dark:border-green-500"} appearance-none focus:outline-none focus:ring-0  ${errors.description ? "focus:!border-red-600 dark:!focus:border-red-500" : "focus:border-green-600 dark:border-green-500"}`}
                    />
                    <label htmlFor="tdescription" className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors.description ? "text-red-600 dark:text-red-500" : "text-green-600 dark:text-green-500"}`}> description </label>
                    {errors.description && (<p className="mt-1">{errors.description.message}</p>)}
                </div>

                <FloatingLabel
                    {...register("phone")}
                    variant="outlined"
                    label="Phone"
                    type="number"
                    color={errors.phone ? "error" : "success"}
                />
                {errors.phone && (<p>{errors.phone.message}</p>)}

                <FloatingLabel
                    {...register("email")}
                    variant="outlined"
                    label="Email address"
                    type="email"
                    color={errors.email ? "error" : "success"}
                />
                {errors.email && (<p>{errors.email.message}</p>)}

                <FloatingLabel
                    {...register("web")}
                    variant="outlined"
                    label="web"
                    type="text"
                    color={errors.web ? "error" : "success"}
                />
                {errors.web && (<p>{errors.web.message}</p>)}

                <fieldset className="flex gap-3 justify-center">
                    <legend className="mb-1" style={{ color: "#057A55" }}>image</legend>
                    <div>
                        <FloatingLabel
                            {...register("image.url")}
                            variant="outlined"
                            label="url"
                            type="text"
                            color={errors.image?.url ? "error" : "success"}
                        />
                        {errors.image?.url && (<p>{errors.image.url.message}</p>)}
                    </div>
                    <div>
                        <FloatingLabel
                            {...register("image.alt")}
                            variant="outlined"
                            label="alt"
                            type="text"
                            color={errors.image?.alt ? "error" : "success"}
                        />
                        {errors.image?.alt && (<p>{errors.image.alt.message}</p>)}
                    </div>
                </fieldset>

                <fieldset className="flex gap-3 flex-wrap justify-center">
                    <legend className="mb-1" style={{ color: "#057A55" }}>address</legend>
                    <div>
                        <FloatingLabel
                            {...register("address.state")}
                            variant="outlined"
                            label="state"
                            type="text"
                            color={errors.address?.state ? "error" : "success"}
                        />
                        {errors.address?.state && (<p>{errors.address.state.message}</p>)}
                    </div>
                    <div>
                        <FloatingLabel
                            {...register("address.country")}
                            variant="outlined"
                            label="country"
                            type="text"
                            color={errors.address?.country ? "error" : "success"}
                        />
                        {errors.address?.country && (<p>{errors.address.country.message}</p>)}
                    </div>
                    <div>
                        <FloatingLabel
                            {...register("address.city")}
                            variant="outlined"
                            label="city"
                            type="text"
                            color={errors.address?.city ? "error" : "success"}
                        />
                        {errors.address?.city && (<p>{errors.address.city.message}</p>)}
                    </div>
                    <div>
                        <FloatingLabel
                            {...register("address.street")}
                            variant="outlined"
                            label="street"
                            type="text"
                            color={errors.address?.street ? "error" : "success"}
                        />
                        {errors.address?.street && (<p>{errors.address.street.message}</p>)}
                    </div>
                    <div>
                        <FloatingLabel
                            {...register("address.houseNumber")}
                            variant="outlined"
                            label="houseNumber"
                            type="number"
                            color={errors.address?.houseNumber ? "error" : "success"}
                        />
                        {errors.address?.houseNumber && (<p>{errors.address.houseNumber.message}</p>)}
                    </div>
                    <div>
                        <FloatingLabel
                            {...register("address.zip")}
                            variant="outlined"
                            label="zip"
                            type="number"
                            color={errors.address?.zip ? "error" : "success"}
                        />
                        {errors.address?.zip && (<p>{errors.address.zip.message}</p>)}
                    </div>
                </fieldset>

                <Button type="submit" className="w-full" disabled={!isValid}>
                    Submit
                </Button>
            </form>
        </main>
    );
}
