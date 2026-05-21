import Image from 'next/image'

interface TTCLogoProps {
  variant?: 'dark' | 'white' | 'color'
  size?: number
  className?: string
}

export function TTCLogo({
  variant = 'color',
  size = 48,
  className,
}: TTCLogoProps) {
  const src =
    variant === 'white'
      ? '/images/logo/ttc-logo-white.svg'
      : variant === 'dark'
      ? '/images/logo/ttc-logo-blue.svg'
      : '/images/logo/ttc-logo-colour.svg'

  return (
    <Image
      src={src}
      alt="The Transformation Camp"
      width={size * 4}
      height={size}
      className={className}
      priority
      style={{ height: size, width: 'auto' }}
    />
  )
}
