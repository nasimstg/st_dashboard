import { connectToDatabase } from "../../util/mongodb";
const link = async (req, res) => {
    const { title, description } = req.body
    const { db } = await connectToDatabase()
    try {
        db
            .collection("links").insertOne({
                title: title,
                description: description,
                createdAt: new Date()
            }).then(() => {
                return res.status(200).json({ msg: 'Link Added Successfully' })
            })
    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }
}

export default link;