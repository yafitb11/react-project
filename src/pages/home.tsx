import axios from "axios";
import { Button, Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TRootState } from "../store/store";
import { Tcard } from "../types/cardType";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { Pagination } from "flowbite-react";

const Home = () => {
    const [cards, setCards] = useState<Tcard[]>([]);
    const nav = useNavigate();
    const [spiner, setspiner] = useState<boolean>(false);
    const [curPage, setCurPage] = useState<number>(1);

    const search = useSelector((state: TRootState) => state.searchSlice.searchWord);
    const { user, autoLogIn } = useAuth();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCards = async () => {
            try {
                setspiner(true)
                const response = await axios.get(
                    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
                );
                setCards(response.data);
            } catch (error) {
                console.error("Error fetching cards:", error);
            } finally { setspiner(false) }
        };

        fetchCards();
    }, []);

    { !user && autoLogIn(); }

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

    const likeOrUnlikeCard = async (cardId: string) => {
        try {

            axios.defaults.headers.common["x-auth-token"] = token;
            await axios.patch(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + cardId,
            );

            const card = cards.find((card) => card._id === cardId);

            if (card) {
                const isLiked = card.likes.includes(user?._id + "");
                let cardsArr = [...cards];

                if (isLiked) {
                    card.likes = card?.likes.filter((like) => like !== user?._id + "");
                    const cardIndex = cardsArr.findIndex((card) => card._id === cardId);
                    cardsArr[cardIndex] = card;
                    toast.success("Card unliked successfully");
                } else {
                    card.likes = [...card.likes, user?._id + ""];
                    const cardIndex = cardsArr.findIndex((card) => card._id === cardId);
                    cardsArr[cardIndex] = card;
                    toast.success("Card liked successfully");
                }

                setCards(cardsArr);
            }

        } catch (error) {
            console.log("Error liking/unliking card:", error);
        }
    };

    const onPageChange = (page: number) => {
        setCurPage(page);
    }

    const filterByPage = () => {
        const start = (curPage - 1) * 12;
        const end = start + 12;
        return filterCards().slice(start, end);
    }

    return (
        <div className="flex flex-col items-center justify-start gap-2 pt-2 pb-2 bg-slate-400">
            <h1 className="text-2xl">Home Page</h1>
            <p className="text-lg">Welcome Home!</p>

            <div className="w-[100%] flex gap-3 flex-wrap p-3 justify-center bg-slate-600">
                {cards && filterByPage()?.map((card) => {
                    const isLiked = card.likes.includes(user?._id + "");
                    return (
                        <Card key={card._id} id={card._id} className="h-[500px] w-1/4 mycard" imgSrc={card.image.url}>
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
                            {user && (
                                <FaHeart className={`${isLiked ? "text-red-500" : "text-gray-500"} cursor-pointer`} onClick={() => likeOrUnlikeCard(card._id)}></FaHeart>
                            )}
                            <Button onClick={() => nav("/card/" + card._id)}>View Card</Button>
                        </Card>
                    );
                })}
            </div>

            {spiner && (
                <Spinner color="purple" aria-label="Purple spinner example" />
            )}

            <div className="flex overflow-x-auto sm:justify-center mb-3">
                <Pagination currentPage={curPage} totalPages={Math.ceil(cards.length / 12)} onPageChange={onPageChange} />
            </div>

        </div>
    );
};

export default Home;

