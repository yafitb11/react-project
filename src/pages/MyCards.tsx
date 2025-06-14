import axios from "axios";
import { Button, Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tcard } from "../types/cardType";
import useAuth from "../hooks/useAuth";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const MyCards = () => {
    const [cards, setCards] = useState<Tcard[]>([]);
    const [reload, setReload] = useState<boolean>(false);
    const [spiner, setspiner] = useState<boolean>(false)
    const navigate = useNavigate();

    const { user, autoLogIn } = useAuth();
    { !user && autoLogIn(); }

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
    }, [user?._id, reload]);

    const deleteCard = async (id: string) => {
        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["x-auth-token"] = token;
            const response = await axios.delete(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`);
            console.log(response.data);
            toast.success("editing was successful", { autoClose: 2000, });
        } catch (error) {
            console.error("Error deleting card:", error);
            toast.error("something went wrong", { autoClose: 2000, });
        }
        setReload((reload => !reload));
    };

    return (
        <div className="flex flex-col items-center justify-start gap-2 bg-blue-300 dark:bg-slate-400">
            <h1 className="text-3xl m-3">My Cards</h1>

            <div className="w-[100%] flex gap-5 flex-wrap p-5 justify-center bg-blue-100 dark:bg-slate-800">
                {cards?.map((card) => (
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
                        <Button className="ml-2 mr-2 cursor-pointer"
                            onClick={() => navigate("/card/" + card._id)}>View Card</Button>

                        <div className="flex justify-center" id="iconsdiv">
                            <MdEdit className="cursor-pointer text-2xl dark:hover:text-white" onClick={() => navigate("/edit-card/" + card._id)}></MdEdit>
                            <MdDelete className="cursor-pointer text-2xl dark:hover:text-white" onClick={() => { deleteCard(card._id) }}></MdDelete>
                        </div>
                    </Card>
                ))}
            </div>
            {spiner && (
                <Spinner color="purple" aria-label="Purple spinner example" />
            )}

        </div>
    );
};

export default MyCards;

