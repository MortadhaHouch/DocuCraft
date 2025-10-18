import React from 'react'
import ContactUs from '@/components/main/ContactUs'
import { Metadata } from 'next'
import { defaultMetadata } from '../metadata'

export default function Contact() {
  return (
    <ContactUs />
  )
}
export const metadata:Metadata={
    title:"Contact Us",
    description:"Contact Us",
    keywords:[
        "Contact Us",
    ],
    openGraph:{
        title:"Contact Us",
        description:"Contact Us",
        type:"website",
        url:`${defaultMetadata.openGraph?.url}/contact`,
        siteName:defaultMetadata.openGraph?.siteName
    },
    twitter:{
        card:"summary_large_image",
        title:"Contact Us",
        description:"Contact Us",
        creator:"@yourhandle"
    }
}