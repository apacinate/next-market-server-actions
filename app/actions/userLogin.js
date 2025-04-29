"use server"
import { redirect } from "next/navigation"
import { SignJWT } from "jose"
import connectDB from "../utils/database"
import { UserModel } from "../utils/schemaModels"
import { cookies } from "next/headers"

const config ={
    maxAge:60*60*24,
    httpOnly:true,
}

export const userLogin = async(prevState,formData)=>{
    const userData ={
        email:formData.get("email"),
        password:formData.get("password"),
    }

    try{
        await connectDB()
        const saveUserData = await UserModel.findOne({email:userData.email})
        console.log("saveUserData:",saveUserData)
        if(saveUserData){
            if(userData.password==saveUserData.password){
                const secretKey = new TextEncoder().encode("next-market-server-actions")
                const payload = { email:userData.email }
                const token = await new SignJWT(payload).setProtectedHeader({alg:"HS256"}).setExpirationTime("1d").sign(secretKey)
                const cookie = await cookies()
                cookie.set("token", token,config)
                
            } else {
                return {message:"エラー：パスワードが間違っています"}
            }
        } else {
            return {message:"エラー：ユーザー登録をしてください"}
        }
  
    } catch{
        return {message:"エラー：ログイン失敗"}
    }
    redirect("/")
}