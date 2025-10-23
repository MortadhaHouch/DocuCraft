import { Notification } from "@/generated/prisma"
import { v4 as uuid } from "uuid"
export function generateSampleNotifications(count: number = 50):Notification[]{
    const notifications: Notification[] = [];
    for (let i = 0; i < count; i++) {
        notifications.push({
            id: uuid(),
            type: "DOCUMENT_SHARED",
            isViewed: false,
            isDeleted: false,
            deletedAt: null,
            content: "Document shared with you",
            userId: "8a9d8f7e-6d5c-4b3a-2c1d-0e9f8a7b6c5d",
            docId: "1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }
    return notifications
}