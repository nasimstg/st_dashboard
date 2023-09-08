import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from "mongodb";
export default async function del(req, res) {
    const { db } = await connectToDatabase()
    const id = req.body
    try {
        db
            .collection("links").deleteOne({
                "_id": ObjectId(id)
            }).then(() => {
                return res.status(200).json({ msg: 'Success' })
            })

    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }

}
