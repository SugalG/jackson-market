"use server";

import { getUser } from "@/lib/auth";

export async function fetchUserInfo(){
    return await getUser();
}