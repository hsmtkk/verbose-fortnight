import { Card, CardBody, CardFooter, CardHeader, Spacer } from "@nextui-org/react"
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

const getAllItems = async (): Promise<Item[]> => {
  const resp = await fetch("http://localhost:3000/api/item/readall")
  const respJson = await resp.json()
  return respJson.allItems
}

export default async function Page() {
  const allItems = await getAllItems()
  return (
    <>
      {allItems.map((item: Item) => <Card key={item._id}>
        <CardHeader>
          {item.title}
        </CardHeader>
        <CardBody>
          <Link href={`/item/readsingle/${item._id}`}>
            <Image src={item.image} alt={item.title} width={250} height={250} loading="lazy" />
          </Link>
          {item.description.substring(0, 80)}...
        </CardBody>
        <CardFooter>
          {item.price}
        </CardFooter>
      </Card>
      )}
    </>
  )
}