import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'trade' | 'life'
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
          {
            'border-transparent bg-blue-600 text-white hover:bg-blue-700': variant === 'default',
            'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200': variant === 'secondary',
            'border-slate-300 bg-transparent text-slate-700': variant === 'outline',
            'border-transparent bg-red-600 text-white hover:bg-red-700': variant === 'destructive',
            'border-transparent bg-orange-500 text-white': variant === 'trade',
            'border-transparent bg-emerald-500 text-white': variant === 'life',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }
