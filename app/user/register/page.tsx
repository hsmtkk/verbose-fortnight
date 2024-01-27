"use client"

import { Button, Input, Spacer } from "@nextui-org/react";
import { useState } from "react";

export default function Regsiter() {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleClick = async () => {
        const body = { name, email, password }
        const resp = await fetch("/api/user/register", {
            method: "POST",
            body: JSON.stringify(body),
        })
        console.log(resp)
    }

    return (
        <div className="container">
            <Input label="名前" value={name} onValueChange={setName} required />
            <Spacer />
            <Input label="メールアドレス" value={email} onValueChange={setEmail} required />
            <Spacer />
            <Input label="パスワード" type="password" value={password} onValueChange={setPassword} required />
            <Spacer />
            <Button onClick={handleClick}>登録</Button>
        </div>
    )
}