import { connectToDatabase } from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function PUT (req, {params}){
    const {id} =  params
    const {

    } = req.json();

    const { db } = await connectToDatabase()

    return NextResponse('OK')
}