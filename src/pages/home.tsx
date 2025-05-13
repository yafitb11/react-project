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

const Home = () => {
    const [cards, setCards] = useState<Tcard[]>([]);
    const nav = useNavigate();
    const [spiner, setspiner] = useState<boolean>(false);

    const search = useSelector((state: TRootState) => state.searchSlice.searchWord);
    const { user } = useAuth();

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
            const token = localStorage.getItem("token");

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
                    //  cardsArr = [...cardsArr, card]; זה טוב לפייבוריטס, מוסיף כרטיס נוסף בסוף, אבל לא טוב למסך הכללי
                    toast.success("Card liked successfully");
                }

                setCards(cardsArr);
            }

        } catch (error) {
            console.log("Error liking/unliking card:", error);
        }
    };



    return (
        <div className="flex flex-col items-center justify-start gap-2">
            <h1 className="text-2xl">Home Page</h1>
            <p className="text-lg">Welcome Home!</p>

            {cards && filterCards()?.map((card) => {
                const isLiked = card.likes.includes(user?._id + "");
                return (
                    <Card key={card._id} id={card._id} className="h-[500px] w-1/4 mycard" imgSrc={card.image.url}>
                        <h2>{card.title}</h2>
                        <h5>{card.subtitle}</h5>
                        <p>{card.description}</p>
                        <div className="border-t border-gray-300 m-0" ></div>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Phone: {card.phone}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Email: {card.email}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Web: {card.web}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Adress: {card.address.country} {card.address.city} {card.address.street} {card.address.houseNumber}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            BizNumber: {card.bizNumber}
                        </p>

                        {user && (
                            <FaHeart className={`${isLiked ? "text-red-500" : "text-gray-500"} cursor-pointer`} onClick={() => likeOrUnlikeCard(card._id)}></FaHeart>
                        )}
                        <Button onClick={() => nav("/card/" + card._id)}>Click</Button>
                    </Card>
                );
            })}

            {spiner && (
                <Spinner color="purple" aria-label="Purple spinner example" />
            )}

        </div>
    );
};

export default Home;


/*

      {cards &&
        cards.map((card) => (
          <Card key={card._id}>
            <h2>{card.title}</h2>
            <Button onClick={() => nav("/card/" + card._id)}>Click</Button>
          </Card>
        ))}
          
זה בשביל להראות את כל הקלפים
        */

/*

    return (

        <div className=" bg-blue-200 text-center p-3">
            <h1 className="text-3xl font-medium mb-2">Cards Page</h1>
            <h2 className="text-xl">here you can find business cards from al categories:</h2>


            <div className="flex gap-2 flex-wrap p-3 justify-center">
                {cards.map((card) => (
                    <Card key={card._id} className="max-w-sm mycard" imgSrc={card.image.url}>
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {card.title}
                        </h3>
                        <h5>{card.subtitle}</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">{card.description}</p>
                        <div className="border-t border-gray-300 m-0" ></div>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Phone: {card.phone}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Email: {card.email}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Web: {card.web}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Adress: {card.address.country} {card.address.city} {card.address.street} {card.address.houseNumber}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            BizNumber: {card.bizNumber}
                        </p>

                    </Card>
                ))}


            </div>


        </div>
    )
}
*/