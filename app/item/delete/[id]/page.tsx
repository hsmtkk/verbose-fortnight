"use client"

import { Button, Input, Spacer, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Item {
    _id: string,
    title: string,
    image: string,
    price: number,
    description: string,
    email: string,
}

export default function Delete({ params }: { params: { id: string } }) {
    const [title, setTitle] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [image, setImage] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    useEffect(() => {
        const getSingleItem = async (id: string) => {
            const resp = await fetch(`http://localhost:3000/api/item/readsingle/${id}`)
            const respJson = await resp.json()
            const singleItem = respJson.singleItem
            setTitle(singleItem.title)
            setPrice(singleItem.price)
            setImage(singleItem.image)
            setDescription(singleItem.description)
            setEmail(singleItem.email)
        }
        getSingleItem(params.id)
    }, [params.id])

    const handleClick = async () => {
        const id = params.id
        const token = localStorage.getItem("token")
        const email = "dummy@example.com"
        const body = { email }
        try {
            const resp = await fetch(`/api/item/delete/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` },
                body: JSON.stringify(body),
            })
            const respJson = await resp.json()
            alert(respJson.message)
        } catch (err) {
            console.log(err)
            alert("アイテム削除失敗")
        }
    }

    return (
        <div className="container">
            <h2>{title}</h2>
            <Image src={image} alt={title} width={750} height={250} />
            <ul>
                <li>{price}</li>
                <li>{description}</li>
            </ul>
            <Button onClick={handleClick}>削除</Button>
        </div>
    )
}