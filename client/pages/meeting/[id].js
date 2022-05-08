import { useRouter } from "next/router"

const Meeting = () => {
    const router = useRouter();
    const { id } = router.query;

    const meeting = {
        _id: "1234",
        title: "LightSaber lessons",
        description: "Bla bla bal bla",
        date: "12.03.2028",
        participants: [
            "2345",
            "3456"
        ]
    }

    return <div>{id}</div>;
}

export default Meeting;