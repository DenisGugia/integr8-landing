import React from 'react';
import { ArrowRight, Link } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { MergedPillar } from './useOrbitalState';

import { useTranslation } from '@/lib/i18n/context';

interface NodeCardProps {
  item: MergedPillar;
  isExpanded: boolean;
}

export function NodeCard({ item, isExpanded }: NodeCardProps) {
  const { t } = useTranslation();
  if (!isExpanded) return null;

  const statusLabel = t.pillars.statusLabels[item.status] || item.status;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <Card className="w-96 bg-white dark:bg-black border-slate-200 dark:border-white/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{item.title}</CardTitle>
              <Badge className={getStatusBadgeClass(item.status)}>{statusLabel}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
              <span className="text-sm text-gray-500">{item.date}</span>
              <Button size="sm" className="gap-2">
                {t.hero.cta} <ArrowRight size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-white dark:bg-black text-slate-900 dark:text-white border-slate-900 dark:border-white';
    case 'in-progress':
      return 'bg-black dark:bg-white text-white dark:text-black border-white dark:border-black';
    case 'pending':
      return 'bg-black/10 dark:bg-black/40 text-slate-900 dark:text-white border-slate-400 dark:border-white/50';
    default:
      return 'bg-black/10 dark:bg-black/40 text-slate-900 dark:text-white border-slate-400 dark:border-white/50';
  }
}