"use client"

import { Button, Input, Spacer, Textarea } from "@nextui-org/react";
import { useState } from "react";

export default function Create() {
    const [title, setTitle] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [image, setImage] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const handleClick = async () => {
        const token = localStorage.getItem("token")
        const email = "dummy@example.com"
        const body = { title, price, image, description, email }
        try {
            const resp = await fetch("/api/item/create", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: JSON.stringify(body),
            })
            const respJson = await resp.json()
            alert(respJson.message)
        } catch (err) {
            console.log(err)
            alert("アイテム登録失敗")
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
            <Button onClick={handleClick}>登録</Button>
        </div>
    )
}