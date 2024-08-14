import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export const POST =  auth(function GET(req) {
  if (req.auth) {
    return NextResponse.json("this the result") 
}
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
})