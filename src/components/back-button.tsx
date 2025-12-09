import { cn } from '@lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface BackButtonProps {
  href?: string;
  text?: string;
  onClick?: () => void;
  className?: string;
}

export default function BackButton({
  href = '/',
  text = 'Back to Home',
  onClick,
  className,
}: BackButtonProps) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: 'primary', size: 'sm' }),
        'md:h-10 md:px-6 md:gap-2 md:has-[>svg]:px-4',
        className
      )}
      href={href}
      onClick={onClick}
    >
      <ChevronLeft className="h-4 w-4" />
      {text}
    </Link>
  );
}
