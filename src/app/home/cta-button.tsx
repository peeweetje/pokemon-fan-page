'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface CTALinkButtonProps {
  href: string;
  label: string;
  className?: string;
  size?: "sm" | "lg" | "default" | "icon" ;
  onNavigate: (href: string) => void;
}

export default function CTALinkButton({
  href,
  label,
  className,
  size,
  onNavigate,
}: CTALinkButtonProps) {
  return (
    <Link href={href}>
      <Button
        size={size}
        className={
          className ??
          'bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6 rounded-full'
        }
        onClick={() => onNavigate(href)}
      >
        {label} <ChevronRight className="h-5 w-5" />
      </Button>
    </Link>
  );
}
