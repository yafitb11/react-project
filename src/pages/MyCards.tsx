import axios from "axios";
import { Button, Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tcard } from "../types/cardType";
import useAuth from "../hooks/useAuth";
import { MdEdit, MdDelete } from "react-icons/md";

const MyCards = () => {
    const [cards, setCards] = useState<Tcard[]>([]);
    const [spiner, setspiner] = useState<boolean>(false)
    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
        const fetchCards = async () => {
            try {
                setspiner(true);
                const response = await axios.get(
                    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
                );

                const filterdCards = response.data.filter((card: Tcard) => {
                    return card.user_id.includes(user?._id + "");
                });
                setCards(filterdCards);

            } catch (error) {
                console.error("Error fetching cards:", error);
            } finally { setspiner(false) }
        };

        fetchCards();
    }, [user?._id]);

    const navigateToEditCardPage = () => { navigate("/edit-card") }


    return (
        <div className="flex flex-col items-center justify-start gap-2">
            <h1 className="text-2xl">Favorites Page</h1>

            {cards?.map((card) => (
                <Card key={card._id} id={card._id} className="h-[500px] w-1/4">
                    <div>
                        <h2>{card.title}</h2>
                        <h5>{card.subtitle}</h5>
                        <p>{card.description}</p>
                        <p> Phone: {card.phone} </p>
                        <p> Email: {card.email} </p>
                        <p> Web: {card.web} </p>
                        <p> Adress: {card.address.state}  {card.address.country} {card.address.city} {card.address.street} {card.address.houseNumber}</p>
                        <p> BizNumber: {card.bizNumber}</p>
                    </div>
                    <Button onClick={() => navigate("/card/" + card._id)}>View Card</Button>
                    <div>
                        <MdEdit className="cursor-pointer" onClick={navigateToEditCardPage}></MdEdit>
                        <MdDelete className="cursor-pointer"></MdDelete>
                    </div>
                </Card>
            ))}

            {spiner && (
                <Spinner color="purple" aria-label="Purple spinner example" />
            )}

        </div>
    );
};

export default MyCards;

