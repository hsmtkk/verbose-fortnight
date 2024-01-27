"use client"

import { Button, Input, Spacer } from "@nextui-org/react";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleClick = async () => {
        const body = { email, password }
        try {
            const resp = await fetch("/api/user/login", {
                method: "POST",
                body: JSON.stringify(body),
            })
            const respJson = await resp.json()
            localStorage.setItem("token", respJson.token)
            alert(respJson.message)
        } catch (err) {
            console.log(err)
            alert("ログイン失敗")
        }
    }

    return (
        <div className="container">
            <Input label="メールアドレス" value={email} onValueChange={setEmail} required />
            <Spacer />
            <Input label="パスワード" type="password" value={password} onValueChange={setPassword} required />
            <Spacer />
            <Button onClick={handleClick}>登録</Button>
        </div>
    )
}