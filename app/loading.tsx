export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-5"
      style={{ background: 'white' }}
    >
      {/* Animated TTC brand loader */}
      <div className="relative w-14 h-14">
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{ border: '3px solid #f0f2ff', borderTopColor: '#153093' }}
        />
        <div
          className="absolute inset-2 rounded-full animate-spin"
          style={{ border: '2px solid transparent', borderTopColor: '#f7931e', animationDuration: '0.7s', animationDirection: 'reverse' }}
        />
      </div>
      <p
        className="text-xs font-heading font-bold tracking-widest uppercase animate-pulse"
        style={{ color: '#153093' }}
      >
        Loading...
      </p>
    </div>
  )
}
