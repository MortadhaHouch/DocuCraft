"use client"
import { AreaChart } from '@/components/charts/AreaChart';
import { DocumentsTable } from '@/components/main/DocumentsTable';
import { DashboardCard } from '@/components/ui/dashboard-card';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { Users, Files, Archive, Share } from 'lucide-react';
import { useState } from 'react';
import { Sort } from '../../../utils/type';
import { sampleDocuments } from '@/lib/sample-documents';
import { DocumentsAreaChart } from '@/components/main/DocumentsAreaChart';
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
const documents = sampleDocuments;
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
        <DocumentsAreaChart 
          data={documents}
          fillOpacity={0.5}
          strokeColor="hsl(var(--border))"
          strokeWidth={2}
          showTrend
          trendValue={5.2}
          trendPeriod="January - June 2024"
          showGrid
          showYAxis
          height={300}
          colorScheme="primary"
          title="Documents per date"
          description='Documents count per date'
        />
        <AreaChart 
          data={[]}
          title='Collaborations'
          height={300}
          showGrid
          showYAxis
          colorScheme="purple"
          fillOpacity={0.5}
          strokeColor="hsl(var(--border))"
          strokeWidth={2}
          showTrend
          trendValue={5.2}
          trendPeriod="January - June 2024"
          description='Collaborations progress per date'
        />
        <AreaChart 
          className="md:col-span-2" 
          data={[]}
          title='Interactions'
          height={300}
          showGrid
          showYAxis
          colorScheme="indigo"
          fillOpacity={0.5}
          strokeColor="hsl(var(--border))"
          strokeWidth={2}
          showTrend
          trendValue={5.2}
          trendPeriod="January - June 2024"
          description='Interactions count per date'
        />
      </section>
      <section className='w-full max-w-7xl justify-center items-center'>
        <DocumentsTable sort={sort} documents={documents} onSortChange={setSort}/>
      </section>
    </main>
  );
}