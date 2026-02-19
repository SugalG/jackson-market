"use server"
import prisma from "@/lib/prisma";

export async function fetchParentCategories(){
    try {
        const result = await prisma.category.findMany({
            where: {parentId: null, isDeleted: false},
            include: {
                children: true
            }
        });

        return {
            success: true,
            result
        }
    }catch(e){
        console.error(e);
        return {
            success: false,
            result:[]
        }
    }
}