import Features from "@/components/main/Features";
import { Metadata } from "next";

export default function FeaturesPage() {
  return (
    <Features/>
  )
}

export const metadata: Metadata = {
  title: "Powerful Document Collaboration Features | Modern Docs Editor",
  description: "Discover the advanced features of our document editor - Real-time collaboration, rich text editing, version history, and secure cloud storage. Boost your productivity today.",
  keywords: [
    "document editor features",
    "real-time collaboration",
    "online document editor",
    "rich text editor",
    "document version control",
    "secure document sharing",
    "cloud document editor"
  ],
  openGraph: {
    title: "Powerful Document Collaboration Features | Modern Docs Editor",
    description: "Experience seamless document collaboration with our advanced editor. Real-time editing, secure sharing, and powerful tools for teams.",
    type: "website",
    url: "https://yourdomain.com/features",
    siteName: "Modern Docs Editor"
  },
  twitter: {
    card: "summary_large_image",
    title: "Document Collaboration Features | Modern Docs Editor",
    description: "Discover powerful document editing and collaboration features designed for modern teams.",
    creator: "@yourhandle"
  }
}