import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const authHeader = req.headers.get("Authorization")
    const token = authHeader?.split(" ")[1]
    if (!token) {
        return NextResponse.json({ message: "トークンなし" })
    }
    try {
        const secretKey = process.env.SECRET_KEY
        const encodedKey = new TextEncoder().encode(secretKey)
        const decodedJWt = await jwtVerify(token, encodedKey)
        // console.log("decodedJWT")
        // console.log(decodedJWt)
        return NextResponse.next()
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "トークン不正" })
    }
}

export const config = {
    matcher: [
        "/api/item/create",
        "/api/item/update",
        "/api/item/delete/:path*",
    ]
}