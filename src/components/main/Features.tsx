"use client"
import { Bell, Clock, Download, File, Keyboard, Link, Lock, MessageCircle, Palette, Pen, Phone, Save, Search, Smile, Trash, User } from "lucide-react";
import { Feature } from "../../../utils/type";
import { Button } from "../ui/button";
import { TracingBeam } from "./TracingBeam";
import { TypewriterEffectSmooth } from "./TypewriterEffectSmooth";
import { AnimatePresence,motion } from "framer-motion";

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
            <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
                <h2 className="font-geist text-xl font-normal tracking-tighter md:text-3xl text-center mb-3">Editor Features</h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence>
                        {editorFeatures.map((item, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
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
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                </section>
                <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
                    <h2 className="font-geist text-xl font-normal tracking-tighter md:text-3xl text-center mb-3">Collaboration Features</h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"> 
                        <AnimatePresence>
                            {collaborationFeatures.map((item, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
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
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>
                <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8"> 
                    <h2 className="font-geist text-xl font-normal tracking-tighter md:text-3xl text-center mb-3">Other Features</h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence>
                            {otherFeatures.map((item, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
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
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>
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
    group: 'collaboration'
  },{
    title:"Persistence",
    description:"Never lose your work, documents are persisted on accidental closes",
    icon:<Save/>,
    group:"editor"
  },{
    title:"Dark Mode",
    description:"Switch between light and dark modes for a comfortable reading experience",
    icon:<Palette/>,
    group:"editor"
  },{
    title:"Keyboard Shortcuts",
    description:"Use keyboard shortcuts to navigate and edit documents",
    icon:<Keyboard/>,
    group:"editor"
  },{
    title:"Auto-save",
    description:"Your work is saved automatically",
    icon:<Save/>,
    group:"editor"
  },{
    title:"Notifications",
    description:"Get notified when someone edits your document",
    icon:<Bell/>,
    group:"collaboration"
  },{
    title:"Deletion and restore",
    description:"Delete and restore documents",
    icon:<Trash/>,
    group:"editor"
  },{
    title:"Messages",
    description:"Send messages to other users",
    icon:<MessageCircle/>,
    group:"collaboration"
  },{
    title: 'Rich Text Editor',
    description: 'Comprehensive text formatting with styles, fonts, and colors',
    icon: <Pen/>,
    group: 'editor'
  },
  {
    title: 'Document Sharing',
    description: 'Share documents with specific people or generate shareable links or QR codes',
    icon: <Link/>,
    group: 'collaboration'
  },
  {
    title: 'Version History',
    description: 'Track changes and restore previous versions of your documents',
    icon: <Clock/>,
    group: 'editor'
  },
  {
    title: 'Comments & Suggestions',
    description: 'Add comments and suggest edits for seamless collaboration',
    icon: <MessageCircle/>,
    group: 'collaboration'
  },
  {
    title: 'Offline Support',
    description: 'Work on documents without internet and sync when back online',
    icon: <Phone/>,
    group: 'editor'
  },
  {
    title: 'Templates',
    description: 'Start quickly with professionally designed document templates',
    icon: <File/>,
    group: 'other'
  },
  {
    title: 'Export & Download',
    description: 'Download documents in multiple formats (PDF, DOCX, TXT)',
    icon: <Download/>,
    group: 'other'
  },
  {
    title: 'Search & Navigation',
    description: 'Quickly find content with powerful search and document outline',
    icon: <Search/>,
    group: 'editor'
  },
  {
    title: 'Mobile Responsive',
    description: 'Edit documents on any device with a responsive interface',
    icon: <Phone/>,
    group: 'other'
  },
  {
    title: 'Keyboard Shortcuts',
    description: 'Work faster with intuitive keyboard shortcuts',
    icon: <Keyboard/>,
    group: 'other'
  },
  {
    title: 'Secure & Private',
    description: 'End-to-end encryption for your documents and data',
    icon: <Lock/>,
    group: 'other'
  },
  {
    title: 'Mention',
    description: "Mention users in comments and suggestions",
    icon: <User/>,
    group: "collaboration"
  },{
    title:"Realtime Communication & Messaging",
    description:"Send messages and communicate with others in real-time while editing",
    icon:<User/>,
    group:"collaboration"
  },{
    title:"Emoji",
    description:"Use emojis in comments and messages",
    icon:<Smile/>,
    group:"collaboration"
  }
];
const editorFeatures = features.filter((feature) => feature.group === 'editor');
const collaborationFeatures = features.filter((feature) => feature.group === 'collaboration');
const otherFeatures = features.filter((feature) => feature.group === 'other');
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