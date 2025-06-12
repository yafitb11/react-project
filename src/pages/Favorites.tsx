import axios from "axios";
import { Button, Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TRootState } from "./../store/store";
import { Tcard } from "../types/cardType";
import useAuth from "../hooks/useAuth";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const Favorites = () => {
    const [cards, setCards] = useState<Tcard[]>([]);
    const [spiner, setspiner] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false);
    const nav = useNavigate();

    const search = useSelector((state: TRootState) => state.searchSlice.searchWord)
    const { user, autoLogIn } = useAuth();

    { !user && autoLogIn(); }

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
    }, [user?._id, reload]);


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


    const unlikeCard = async (cardId: string) => {
        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["x-auth-token"] = token;
            await axios.patch(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + cardId,
            );

            const card = cards.find((card) => card._id === cardId);
            let cardsArr = [...cards];
            if (card) {
                card.likes = card?.likes.filter((like) => like !== user?._id + "");
                const cardIndex = cardsArr.findIndex((card) => card._id === cardId);
                cardsArr[cardIndex] = card;
                toast.success("Card unliked successfully");
            }
            setCards(cardsArr);
        } catch (error) {
            console.log("Error liking/unliking card:", error);
        }
        setReload((reload => !reload));
    };

    return (
        <div className="flex flex-col items-center justify-start gap-2 bg-slate-400">
            <h1 className="text-3xl m-1">My Favorites</h1>

            <div className="w-[100%] flex gap-5 flex-wrap p-5 justify-center bg-slate-600">
                {cards && filterCards()?.map((card) => (
                    <Card key={card._id} id={card._id} className="mycard" imgSrc={card.image.url}>
                        <div>
                            <h2>{card.title}</h2>
                            <h5>{card.subtitle}</h5>
                            <p>{card.description}</p>
                            <p> Phone: {card.phone} </p>
                            <p> Email: {card.email} </p>
                            {card.web && <p> Web: {card.web} </p>}
                            <p> Adress: {card.address.state}  {card.address.country} {card.address.city} {card.address.street} {card.address.houseNumber}</p>
                            <p> BizNumber: {card.bizNumber}</p>
                        </div>
                        {user && (
                            <FaHeart className={"text-red-500 cursor-pointer text-2xl ml-2 mb-1"}
                                onClick={() => unlikeCard(card._id)}></FaHeart>
                        )}
                        <Button className="ml-2 mr-2 cursor-pointer"
                            onClick={() => nav("/card/" + card._id)}>View Card</Button>
                    </Card>
                ))}
            </div>
            {spiner && (
                <Spinner color="purple" aria-label="Purple spinner example" />
            )}

        </div>
    );
};

export default Favorites;

