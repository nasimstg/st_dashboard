import { connectToDatabase } from "@/util/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req){
        const data = await req.json()
        // const {name} = data.body
        const { db } = await connectToDatabase()
        db
            .collection("dar").insertOne(data) 
        return NextResponse.json(data)
}

export async function GET(req){
    // const {name} = data.body
    const { db } = await connectToDatabase()
    const dars = await db
        .collection("dar")
        .find({})
        .sort({ metacritic: -1 })
        .toArray();
    return NextResponse.json(dars)
}

export async function DELETE(req){
    // const {name} = data.body
    const id  = await req.json()
        console.log(id)
    const { db } = await connectToDatabase()
    const res = await db
        .collection("dar").deleteOne({'_id': new ObjectId(id) })
    return NextResponse.json(id)
}