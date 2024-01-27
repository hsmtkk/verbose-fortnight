import { Button, Spacer } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"

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
            <Image src={singleItem.image} alt={singleItem.title} width={750} height={500} loading="lazy" />
            <ul>
                <li>{singleItem.title}</li>
                <li>{singleItem.price}</li>
                <Spacer />
                <li>{singleItem.description}</li>
            </ul>
            <Spacer />
            <Button as={Link} href={`/item/update/${id}`} >編集</Button>
            <Spacer />
            <Button as={Link} href={`/item/delete/${id}`} >削除</Button>
        </>
    )
}