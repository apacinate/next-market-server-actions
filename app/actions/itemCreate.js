import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import connectDB from "../utils/database"
import { ItemModel } from "../utils/schemaModels"

export const itemCreate = async(formData)=>{
    "use server"
    const itemData={
        title: formData.get("title"),
        price:formData.get("price"),
        image:formData.get("image"),
        description:formData.get("description"),
        email:formData.get("email")
    }

    try {
        await connectDB()
        await ItemModel.create(itemData)
    } catch{
        throw new Error("エラー:アイテム作成失敗")
    }

    revalidatePath("/")
    redirect("/")
}