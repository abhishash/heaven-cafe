'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useGetFAQQuery } from '@/store/services/master-api';
import HtmlRender from '../shared/html-render';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function FAQItem({ question, answer, isOpen = false, onToggle }: FAQItemProps) {

  return (
    <details className="">
      <summary className="font-semibold text-foreground text-sm md:text-base">{question}</summary>
      <div className="px-4 pb-4 pt-0 text-sm text-muted-foreground border-t border-border">
        <HtmlRender html={answer} />
      </div>
    </details>
  );
}
