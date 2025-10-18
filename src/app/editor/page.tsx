import QuillEditor from '@/components/main/QuillEditor';
import { getPageMetadata } from '../metadata';
import { Metadata } from 'next';

export const metadata: Metadata = getPageMetadata({
  title: 'Document Editor',
  description: 'Create and edit documents in real-time with our collaborative editor',
  openGraph: {
    title: 'Document Editor',
    description: 'Create and edit documents in real-time with our collaborative editor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Document Editor',
    description: 'Create and edit documents in real-time with our collaborative editor',
  },
});

export default function Editor() {
  return (
    <main className="w-full h-full min-h-screen flex justify-center items-center">
      <QuillEditor className='w-full max-w-7xl' />
    </main>
  );
}