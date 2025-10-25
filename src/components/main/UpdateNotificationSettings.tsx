"use client";

import { Save } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

interface NotificationSettings {
    enableNotifications: boolean;
    showOnStartup: boolean;
    enableDesktopNotifications: boolean;
}

export default function UpdateNotificationSettings() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<NotificationSettings>({
        defaultValues: {
            enableNotifications: true,
            showOnStartup: false,
            enableDesktopNotifications: true,
        }
    });

    const onSubmit = async (data: NotificationSettings) => {
        try {
            console.log('Saving settings:', data);
            // TODO: Implement settings update logic
        } catch (error) {
            console.error('Failed to update settings:', error);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="space-y-6 p-6 rounded-lg border border-border/30 bg-card shadow-sm"
            >
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold leading-none tracking-tight">
                        Notification Preferences
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Choose how you want to be notified about updates and changes.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="enableNotifications"
                            {...register("enableNotifications")}
                        />
                        <Label 
                            htmlFor="enableNotifications"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Enable notifications
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="showOnStartup"
                            {...register("showOnStartup")}
                        />
                        <Label 
                            htmlFor="showOnStartup"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Show notifications on startup
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="enableDesktopNotifications"
                            {...register("enableDesktopNotifications")}
                        />
                        <Label 
                            htmlFor="enableDesktopNotifications"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Enable desktop notifications
                        </Label>
                    </div>
                </div>

                <Button 
                    type="submit"
                    className={cn(
                        "w-full",
                        isSubmitting && "opacity-70 cursor-not-allowed"
                    )}
                    disabled={isSubmitting}
                >
                    <Save className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </div>
    )
}
