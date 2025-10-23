import { v4 as uuid } from "uuid"
import { Request } from "@/generated/prisma"
export function generateSampleRequests(count: number = 50): Request[] {
    const requests: Request[] = [];
    for (let i = 0; i < count; i++) {
        requests.push({
            id: uuid(),
            status: "PENDING",
            isViewed: false,
            userId: "8a9d8f7e-6d5c-4b3a-2c1d-0e9f8a7b6c5d",
            docId: "1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }
    return requests
}