'use client';

import { ForwardRefExoticComponent, memo, ReactNode, RefAttributes } from 'react';
import { motion } from 'framer-motion';
import { LucideProps, TrendingUp } from 'lucide-react';
import { NumberTicker } from './number-ticker';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  stat: {
    title: string;
    value: number;
    change: number;
    changeType: 'positive' | 'negative';
    icon: ReactNode;
    color: string;
    bgColor: string;
  };
  index: number;
}

export const DashboardCard = memo(({ stat, index }: DashboardCardProps) => {
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="group relative cursor-pointer"
    >
      <div className="border-border bg-card/40 rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
        <div className="to-primary/5 absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <div className={`rounded-lg p-3 ${stat.bgColor}`}>
              {Icon}
            </div>

            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                stat.changeType === 'positive'
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              <TrendingUp
                className={`h-4 w-4 ${
                  stat.changeType === 'negative' ? 'rotate-180' : ''
                }`}
              />
              <NumberTicker className={cn("text-foreground mb-1 text-xl font-bold",stat.changeType == "positive"?"text-green-500":"text-red-500")} value={stat.change}/>
            </div>
          </div>

          <div className="mb-3">
            <NumberTicker className="text-foreground mb-1 text-3xl font-bold" value={stat.value}/>
            <p className="text-muted-foreground text-sm font-medium">
              {stat.title}
            </p>
          </div>

          <div className="bg-muted h-2 overflow-hidden rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${65 + index * 8}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`h-full rounded-full ${stat.color.replace('text-', 'bg-')}`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

DashboardCard.displayName = 'DashboardCard';
