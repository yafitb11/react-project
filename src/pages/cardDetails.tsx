import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tcard } from "../types/cardType";

const CardDetails = () => {
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

    const address = `${card?.address.state} ${card?.address.country} ${card?.address.city} ${card?.address.street} ${card?.address.houseNumber}`;

    return (
        <div className="w-[100%] flex flex-col gap-3 pt-2 items-center  bg-blue-300 dark:bg-slate-400">
            <h1 className="text-3xl m-1">Card Details:</h1>
            <div className="w-full flex justify-center bg-blue-100 dark:bg-slate-800">
                {card && <div className="w-[75%] p-5 my-4 rounded-[10px] flex flex-col bg-lightblue dark:bg-slate-500">
                    <h1 className="text-2xl text-center">{card.title}</h1>
                    <img src={card.image.url} alt={card.image.alt} className="w-1/3 max-h-96 mt-3 m-auto"></img>
                    <h3>Title: {card.title}</h3>
                    <h3>Subtitle: {card.subtitle}</h3>
                    <h3>Description: {card.description}</h3>
                    <h3>Phone: {card.phone}</h3>
                    <h3>Email: {card.email}</h3>
                    <a href={card.web} target="_blank" className="cursor-pointer">Website: {card.web}</a>
                    <h3>Adress: {address}</h3>
                    <h3> BizNumber: {card.bizNumber}</h3>
                    <div className="m-auto mt-3">
                        <h2 className="text-center mb-1">Location</h2>
                        <iframe className="w-[600px] h-[450px] border-0" allowFullScreen loading="lazy"
                            src={`https://maps.google.com/maps?q=${address}&output=embed`}
                        >
                        </iframe>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default CardDetails;
