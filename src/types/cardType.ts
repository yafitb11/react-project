export type Tcard = {

    _id: string,
    title: string,
    subtitle: string,
    description: string,
    phone: number,
    email: string,
    web: string,
    likes: string[],
    image: {
        url: string,
        alt: string,
    },
    address: {
        state: string,
        country: string,
        city: string,
        street: string,
        houseNumber: number,
        zip: number,
    },
    bizNumber: number,
}