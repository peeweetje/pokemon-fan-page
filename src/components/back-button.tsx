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
  href,
  text = 'Back to Home',
  onClick,
  className,
}: BackButtonProps) {
  const defaultHref = '/';

  return (
    <Link
      className={cn(
        buttonVariants({ variant: 'primary', size: 'sm' }),
        'md:h-10 md:px-6 md:gap-2 md:has-[>svg]:px-4',
        'rounded-full border-0 font-semibold text-white shadow-md',
        'bg-gradient-to-r from-red-500 via-purple-500 to-indigo-500',
        'bg-[length:200%_auto] bg-left transition-all duration-500 ease-out',
        'hover:bg-right hover:shadow-lg hover:shadow-purple-400/40 hover:scale-[1.03]',
        'focus-visible:ring-2 focus-visible:ring-purple-400/60',
        className
      )}
      href={href || defaultHref}
      onClick={onClick}
    >
      <ChevronLeft className="h-4 w-4" />
      {text}
    </Link>
  );
}
