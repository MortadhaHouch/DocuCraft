import { v4 as uuid } from "uuid"
import { Document } from '@/generated/prisma';

const DOCUMENT_TITLES = [
  'Project Proposal',
  'Meeting Notes',
  'Product Requirements',
  'Technical Specification',
  'User Guide',
  'API Documentation',
  'Marketing Plan',
  'Q2 Report',
  'Team Offsite Agenda',
  'Research Findings'
];

const DOCUMENT_DESCRIPTIONS = [
  'Initial draft for the upcoming project',
  'Key points discussed during the meeting',
  'Detailed requirements for the new feature',
  'Technical specifications for the API',
  'Step by step guide for end users',
  'Complete API reference documentation',
  'Marketing strategy for the next quarter',
  'Quarterly performance report',
  'Agenda and activities for team building',
  'Findings from user research'
];

const AUTHORS = [
  '8a9d8f7e-6d5c-4b3a-2c1d-0e9f8a7b6c5d',
  '1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e',
  'a1b2c3d4-e5f6-4a3b-2c1d-0e9f8a7b6c5d',
  'f1e2d3c4-b5a6-7c8d-9e0f-1a2b3c4d5e6f'
];

export function generateSampleDocuments(count: number = 50): Document[] {
  const documents: Document[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 365);
    const createdAt = new Date(now);
    createdAt.setDate(now.getDate() - daysAgo);
    
    const updatedAt = new Date(createdAt);
    updatedAt.setDate(updatedAt.getDate() + Math.floor(Math.random() * 5));
    
    const titleIndex = Math.floor(Math.random() * DOCUMENT_TITLES.length);
    const title = `${DOCUMENT_TITLES[titleIndex]} ${Math.floor(Math.random() * 100) + 1}`;
    
    documents.push({
      id: uuid(),
      title,
      description: DOCUMENT_DESCRIPTIONS[titleIndex],
      content: `# ${title}\n\nThis is a sample document content for testing purposes.`,
      authorId: AUTHORS[Math.floor(Math.random() * AUTHORS.length)],
      createdAt,
      updatedAt,
      downloads: Math.floor(Math.random() * 1000),
      isPinned: Math.random() > 0.8, // 20% chance of being pinned
      views: Math.floor(Math.random() * 5000),
      isArchived: Math.random() > 0.8, // 20% chance of being archived
      isDeleted: Math.random() > 0.8, // 20% chance of being deleted
      requestId: uuid(),
      shares: Math.floor(Math.random() * 100),
      autoSave: Math.random() > 0.8, // 20% chance of being auto-saved
      saveInterval: Math.floor(Math.random() * 60),
      deletedAt: Math.random() > 0.8 ? new Date(now) : null,
    });
  }
  
  // Sort by creation date (newest first)
  return documents.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export const sampleDocuments = generateSampleDocuments(50);
