"use client"

import { Button, Input, Spacer, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface Item {
    _id: string,
    title: string,
    image: string,
    price: number,
    description: string,
    email: string,
}

export default function Update({ params }: { params: { id: string } }) {
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
        const body = { title, price, image, description, email }
        try {
            const resp = await fetch(`/api/item/update/${id}`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${token}` },
                body: JSON.stringify(body),
            })
            const respJson = await resp.json()
            alert(respJson.message)
        } catch (err) {
            console.log(err)
            alert("アイテム編集失敗")
        }
    }

    return (
        <div className="container">
            <Input label="名前" value={title} onValueChange={setTitle} required />
            <Spacer />
            <Input label="価格" type="number" value={price.toString()} onValueChange={(s) => setPrice(parseInt(s))} required />
            <Spacer />
            <Input label="画像" value={image} onValueChange={setImage} required />
            <Spacer />
            <Textarea value={description} onValueChange={setDescription} required />
            <Button onClick={handleClick}>編集</Button>
        </div>
    )
}