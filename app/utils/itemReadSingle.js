// lib/itemReadSingle.ts
import connectDB from "./database"
import { ItemModel } from "./schemaModels"

const itemReadSingle = async (id) => {
  await connectDB()
  return await ItemModel.findById(id)
}
export default itemReadSingle
