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

    return (
        <div>
            <h1>Card Details</h1>
            {card && <div>
                <h3>{card.title}</h3>
                <h3>{card.subtitle}</h3>
                <h3>{card.description}</h3>
                <h3>{card.phone}</h3>
                <h3>{card.email}</h3>
                <a href={card.web} target="_blank"></a>
                <img src={card.image.url} alt={card.image.alt}></img>
            </div>}
        </div>
    );
};

export default CardDetails;