import { TracingBeam } from "@/components/main/TracingBeam";
import { Feature } from "../../../utils/type";
import { Clock, Download, File, Keyboard, Link, Lock, MessageCircle, Pen, Phone, Search, User } from "lucide-react";
import { TypewriterEffectSmooth } from "@/components/main/TypewriterEffectSmooth";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
export default function Features() {
  return (
    <main className="relative py-14">
      <TracingBeam>
        <section className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="relative mx-auto max-w-2xl sm:text-center">
            <div className="relative z-10">
              <h3 className="font-geist mt-4 text-3xl font-normal tracking-tighter sm:text-4xl md:text-5xl">
                Features
              </h3>
              <p className="font-geist text-foreground/60 mt-3">
                Discover the advanced features of our document editor - Real-time collaboration, rich text editing, version history, and secure storage. Boost your productivity today.
              </p>
            </div>
            <div
              className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
              style={{
                background:
                  'linear-gradient(152.92deg, rgba(192, 15, 102, 0.2) 4.54%, rgba(192, 11, 109, 0.26) 34.2%, rgba(192, 15, 102, 0.1) 77.55%)',
              }}
            ></div>
          </div>
          <hr className="bg-foreground/30 mx-auto mt-5 h-px w-1/2" />
          <div className="relative mt-12">
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((item, idx) => (
                <li
                  key={idx}
                  className="transform-gpu space-y-3 rounded-xl border bg-transparent p-4 [box-shadow:0_-20px_80px_-20px_#ff7aa42f_inset]"
                >
                  <div className="text-primary w-fit transform-gpu rounded-full border p-4 [box-shadow:0_-20px_80px_-20px_#ff7aa43f_inset] dark:[box-shadow:0_-20px_80px_-20px_#ff7aa40f_inset]">
                    {item.icon}
                  </div>
                  <h4 className="font-geist text-lg font-bold tracking-tighter">
                    {item.title}
                  </h4>
                  <p className="text-gray-500">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <TypewriterEffectSmooth words={words}>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
              <Button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent dark:bg-white dark:text-black text-white text-sm" variant="default">
                Join now
              </Button>
              <Button className="w-40 h-10 rounded-xl bg-white dark:bg-black dark:text-white dark:border-white text-black border border-black text-sm" variant="outline">
                Signup
              </Button>
            </div>
        </TypewriterEffectSmooth>
      </TracingBeam>
    </main>
  );
}
export const features: Feature[] = [
  {
    title: 'Real-time Collaboration',
    description: 'Edit documents simultaneously with others and see changes in real-time',
    icon: <User/>,
  },
  {
    title: 'Rich Text Editor',
    description: 'Comprehensive text formatting with styles, fonts, and colors',
    icon: <Pen/>,
  },
  {
    title: 'Document Sharing',
    description: 'Share documents with specific people or generate shareable links',
    icon: <Link/>,
  },
  {
    title: 'Version History',
    description: 'Track changes and restore previous versions of your documents',
    icon: <Clock/>,
  },
  {
    title: 'Comments & Suggestions',
    description: 'Add comments and suggest edits for seamless collaboration',
    icon: <MessageCircle/>,
  },
  {
    title: 'Offline Support',
    description: 'Work on documents without internet and sync when back online',
    icon: <Phone/>,
  },
  {
    title: 'Templates',
    description: 'Start quickly with professionally designed document templates',
    icon: <File/>,
  },
  {
    title: 'Export & Download',
    description: 'Download documents in multiple formats (PDF, DOCX, TXT)',
    icon: <Download/>,
  },
  {
    title: 'Search & Navigation',
    description: 'Quickly find content with powerful search and document outline',
    icon: <Search/>,
  },
  {
    title: 'Mobile Responsive',
    description: 'Edit documents on any device with a responsive interface',
    icon: <Phone/>,
  },
  {
    title: 'Keyboard Shortcuts',
    description: 'Work faster with intuitive keyboard shortcuts',
    icon: <Keyboard/>,
  },
  {
    title: 'Secure & Private',
    description: 'End-to-end encryption for your documents and data',
    icon: <Lock/>,
  },
];
export const words = [
  {
    text:"What"
  },{
    text:"Are"
  },{
    text:"You"
  },{
    text:"Waiting"
  },{
    text:"For"
  }
]
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