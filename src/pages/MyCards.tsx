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
    const nav = useNavigate();

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




    return (
        <div className="flex flex-col items-center justify-start gap-2">
            <h1 className="text-2xl">Favorites Page</h1>

            {cards?.map((card) => (
                <Card key={card._id} id={card._id} className="h-[500px] w-1/4">
                    <h2>{card.title}</h2>
                    <p>{card.description}</p>
                    <Button onClick={() => nav("/card/" + card._id)}>view and edit</Button>
                    <div>
                        <MdEdit></MdEdit>
                        <MdDelete></MdDelete>
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

