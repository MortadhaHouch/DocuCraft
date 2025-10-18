import { Table as TableRoot, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Document } from '@/generated/prisma';
import { ArrowDown, ArrowUp, Pin } from 'lucide-react';
import { Button } from '../ui/button';
import { useMemo } from 'react';
import { Sort } from '../../../utils/type';
export function DocumentsTable({ documents,sort,onSortChange }: { documents: Document[],sort?:Sort,onSortChange:(sort:Sort)=>void }) {
  const sortedDocuments = useMemo(()=>{
    return documents.sort((a, b) => {
      if (sort) {
        if (sort.criteria === "createdAt") {
          return sort.direction === "asc" ? a.createdAt.getTime() - b.createdAt.getTime() : b.createdAt.getTime() - a.createdAt.getTime();
        } else if (sort.criteria === "updatedAt") {
          return sort.direction === "asc" ? a.updatedAt.getTime() - b.updatedAt.getTime() : b.updatedAt.getTime() - a.updatedAt.getTime();
        } else if (sort.criteria === "downloads") {
          return sort.direction === "asc" ? a.downloads - b.downloads : b.downloads - a.downloads;
        } else if (sort.criteria === "pinned") {
          return sort.direction == "asc" ? Number(a.isPinned) - Number(b.isPinned) : Number(b.isPinned) - Number(a.isPinned);
        }else if (sort.criteria === "title") {
          return sort.direction === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        }
      }
      return 0;
    })
  },[documents,sort])
  return (
    <section className='w-full max-w-7xl bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mt-6'>
      <div className='p-6 border-b border-gray-200 dark:border-gray-800'>
        <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Recent Documents</h2>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Your most recently accessed documents</p>
      </div>
      <div className='overflow-x-auto'>
        <TableRoot>
          <TableHeader className='bg-gray-50 dark:bg-gray-800'>
            <TableRow className='border-b border-gray-200 dark:border-gray-700'>
              <TableHead className='w-1/4 text-sm font-medium text-gray-600 dark:text-gray-300'>
                <span>Title</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2"
                    onClick={()=>onSortChange({criteria:"title",direction:sort?.direction === "asc" ? "desc" : "asc"})}
                  >
                  {sort?.criteria === "title" && sort?.direction === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                </Button>
              </TableHead>
              <TableHead className='w-2/5 text-sm font-medium text-gray-600 dark:text-gray-300'>
                <span>Description</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2"
                    onClick={()=>onSortChange({criteria:"description",direction:sort?.direction === "asc" ? "desc" : "asc"})}
                  >
                  {sort?.criteria === "description" && sort?.direction === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                </Button>
              </TableHead>
              <TableHead className='text-sm font-medium text-gray-600 dark:text-gray-300'>
                <span>Created</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={()=>onSortChange({criteria:"createdAt",direction:sort?.direction === "asc" ? "desc" : "asc"})}
                >
                {sort?.criteria === "createdAt" && sort?.direction === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              </Button>
              </TableHead>
              <TableHead className='text-sm font-medium text-gray-600 dark:text-gray-300'>
                <span>Last Updated</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2"
                    onClick={()=>onSortChange({criteria:"updatedAt",direction:sort?.direction === "asc" ? "desc" : "asc"})}
                  >
                  {sort?.criteria === "updatedAt" && sort?.direction === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                </Button>
              </TableHead>
              <TableHead className='text-sm font-medium text-gray-600 dark:text-gray-300'>
                <span>Downloads</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2"
                    onClick={()=>onSortChange({criteria:"downloads",direction:sort?.direction === "asc" ? "desc" : "asc"})}
                  >
                  {sort?.criteria === "downloads" && sort?.direction === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                </Button>
              </TableHead>
              <TableHead className='text-sm font-medium text-gray-600 dark:text-gray-300'>
                <span>Pinned</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={()=>onSortChange({criteria:"pinned",direction:sort?.direction === "asc" ? "desc" : "asc"})}
                >
                {sort?.criteria === "pinned" && sort?.direction === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              </Button>
            </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='divide-y divide-gray-200 dark:divide-gray-700'>
            {sortedDocuments.map((doc) => (
              <TableRow 
                key={doc.id} 
                className='hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150 cursor-pointer group'
              >
                <TableCell className='py-4'>
                  <div className='flex items-center'>
                    <div className={`h-3 w-3 rounded-full mr-3 ${doc.isPinned ? 'bg-yellow-400' : 'bg-blue-500'}`}></div>
                    <span className='font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                      {doc.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell className='text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate'>
                  {doc.description}
                </TableCell>
                <TableCell className='text-sm text-gray-600 dark:text-gray-400'>
                  {new Date(doc.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell className='text-sm text-gray-600 dark:text-gray-400'>
                  {new Date(doc.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell className='text-right text-sm font-medium text-gray-900 dark:text-white'>
                  {doc.downloads.toLocaleString()}
                </TableCell>
                <TableCell className='text-right text-sm font-medium text-gray-900 dark:text-white'>
                  {doc.isPinned ? <Pin className='text-yellow-400'/> : <Pin className='opacity-50'/>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </div>
      <div className='px-6 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50'>
        <div className='flex items-center justify-between'>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Showing <span className='font-medium'>{documents.length}</span> of <span className='font-medium'>{documents.length}</span> documents
          </p>
          <div className='flex space-x-2'>
            <button className='px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/70'>
              Previous
            </button>
            <button className='px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700'>
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
