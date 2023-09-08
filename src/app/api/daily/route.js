import { connectToDatabase } from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function POST(req){
        const data = await req.json()
        // const {name} = data.body
        const { db } = await connectToDatabase()
        db
            .collection("daily").insertOne(data) 
        return NextResponse.json(data)
}

export async function GET(req){
    // const {name} = data.body
    const { db } = await connectToDatabase()
    const dars = await db
        .collection("daily")
        .find({})
        .sort({ metacritic: -1 })
        .toArray();
    return NextResponse.json(dars)
}