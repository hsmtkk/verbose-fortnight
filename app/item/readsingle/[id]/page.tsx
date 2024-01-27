interface Item {
    _id: string,
    title: string,
    image: string,
    price: number,
    description: string,
    email: string,
}

const getSingleItem = async (id: string): Promise<Item> => {
    const resp = await fetch(`http://localhost:3000/api/item/readsingle/${id}`)
    const respJson = await resp.json()
    return respJson.singleItem
}

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const singleItem = await getSingleItem(id)
    return (
        <>
            {singleItem.title}
        </>
    )
}