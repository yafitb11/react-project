import axios from "axios";
import { Button, Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TRootState } from "./../store/store";
import { Tcard } from "../types/cardType";
import useAuth from "../hooks/useAuth";

const Favorites = () => {
    const [cards, setCards] = useState<Tcard[]>([]);
    const [spiner, setspiner] = useState<boolean>(false)
    const nav = useNavigate();

    const search = useSelector((state: TRootState) => state.searchSlice.searchWord)

    const { user } = useAuth();

    useEffect(() => {
        const fetchCards = async () => {
            try {
                setspiner(true);
                const response = await axios.get(
                    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
                );

                const likedCards = response.data.filter((item: Tcard) => {
                    return item.likes.includes(user?._id + "");
                });
                setCards(likedCards);

            } catch (error) {
                console.error("Error fetching cards:", error);
            } finally { setspiner(false) }
        };

        fetchCards();
    }, [user?._id]);


    const filterCards = () => {
        if (cards) {
            return cards.filter(
                (card) =>
                    card.title.toLowerCase().includes(search.toLowerCase()) ||
                    card.subtitle.toLowerCase().includes(search.toLowerCase()),
            );
        }
        return cards;
    }



    return (
        <div className="flex flex-col items-center justify-start gap-2">
            <h1 className="text-2xl">Favorites Page</h1>

            {cards && filterCards()?.map((card) => (
                <Card key={card._id} id={card._id} className="h-[500px] w-1/4">
                    <h2>{card.title}</h2>
                    <p>{card.description}</p>
                    <Button onClick={() => nav("/card/" + card._id)}>Click</Button>
                </Card>
            ))}

            {spiner && (
                <Spinner color="purple" aria-label="Purple spinner example" />
            )}

        </div>
    );
};

export default Favorites;

