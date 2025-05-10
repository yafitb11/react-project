import { Card } from "flowbite-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Tcard } from "../components/cardtype";

const Home = () => {

    const [cards, setCards] = useState<Tcard[]>([]);

    const getCards = async () => {
        try {
            const response = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards");
            console.log("response:", response.data);
            setCards(response.data);

        } catch (error) {
            console.log("Error:");

        }
    }

    useEffect(() => { getCards() }, []);


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

export default Home;