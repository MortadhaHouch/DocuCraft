"use client"
import { AreaChart } from '@/components/charts/AreaChart';
import { DocumentsTable } from '@/components/main/DocumentsTable';
import { DashboardCard } from '@/components/ui/dashboard-card';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { Document } from '@/generated/prisma';
import { Users, Files, Archive, Share } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Sort } from '../../../utils/type';
// Dashboard stats data
const stats = [
  {
    title: 'Total Documents',
    value: 12,
    change: 12,
    changeType: 'positive' as const,
    icon: <Files/>,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'Collaborations',
    value: 20,
    change: 8,
    changeType: 'positive' as const,
    icon: <Users/>,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    title: 'Archived Documents',
    value: 15,
    change: 15,
    changeType: 'positive' as const,
    icon: <Archive/>,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    title: 'Shares',
    value: 16,
    change: -2.4,
    changeType: 'negative' as const,
    icon: <Share/>,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
];
const documents: Document[] = Array.from({ length: 20 }, (_, i) => {
  const now = new Date();
  const randomDaysAgo = Math.floor(Math.random() * 30);
  const createdAt = new Date(now);
  createdAt.setDate(now.getDate() - randomDaysAgo);
  const updatedAt = new Date(createdAt);
  updatedAt.setDate(createdAt.getDate() + Math.floor(Math.random() * 5));
  
  return {
    id: uuid(),
    title: `Document ${i + 1} - ${['Project', 'Report', 'Analysis', 'Study', 'Review'][i % 5]}`,
    description: `This is a sample document for testing purposes. Created on ${createdAt.toLocaleDateString()}.`,
    content: `# Document ${i + 1}\n\nThis is the content of document ${i + 1}. It contains sample text for demonstration.`,
    authorId: uuid(),
    createdAt,
    updatedAt,
    isArchived: Math.random() > 0.7, // 30% chance of being archived
    isDeleted: Math.random() > 0.7, // 30% chance of being deleted
    isPinned: Math.random() > 0.7, // 30% chance of being pinned
    downloads: Math.floor(Math.random() * 1000),
    views: Math.floor(Math.random() * 5000),
    requestId: uuid()
  };
});
export default function Dashboard() {
  const [sort,setSort] = useState<Sort|undefined>({
    criteria:"createdAt",
    direction:"desc"
  })
  return (
    <main className='w-full flex flex-col justify-start items-center gap-2'>
      <DashboardHeader
        isRefreshing={false}
        onExport={()=>{}}
        onRefresh={()=>{}}
        onSearchChange={()=>{}}
        searchQuery=''
      />
      <section className="w-full max-w-7xl grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <DashboardCard key={stat.title} stat={stat} index={index} />
        ))}
      </section>
      <section className='w-full max-w-7xl grid grid-cols-1 gap-3 md:grid-cols-2'>
        <AreaChart data={[]} title='Docs Per date' description='Docs count per date'/>
        <AreaChart data={[]} title='Docs Per date' description='Docs count per date'/>
        <AreaChart className="md:col-span-2" data={[]} title='Docs Per date' description='Docs count per date'/>
      </section>
      <section className='w-full max-w-7xl justify-center items-center'>
        <DocumentsTable sort={sort} documents={documents} onSortChange={setSort}/>
      </section>
    </main>
  );
}