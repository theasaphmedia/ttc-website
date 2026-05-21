export interface ServiceDate {
  date: Date
  type: 'Regular Service' | 'Quarterly Ingathering'
  label: string
  description: string
}

/** Returns the Nth Friday of a given month/year (1-indexed) */
function getNthFridayOfMonth(year: number, month: number, n: number): Date {
  const d = new Date(year, month, 1)
  // Find first Friday
  const dayOfWeek = d.getDay() // 0=Sun, 5=Fri
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7
  d.setDate(1 + daysUntilFriday + (n - 1) * 7)
  d.setHours(12, 0, 0, 0) // 12:00 PM
  return d
}

/** Returns the next N upcoming 1st and 3rd Fridays from today */
export function getNextServiceDates(count = 4): ServiceDate[] {
  const results: ServiceDate[] = []
  const now = new Date()
  let month = now.getMonth()
  let year = now.getFullYear()

  while (results.length < count) {
    const firstFriday = getNthFridayOfMonth(year, month, 1)
    const thirdFriday = getNthFridayOfMonth(year, month, 3)

    if (firstFriday > now) {
      results.push({
        date: firstFriday,
        type: 'Regular Service',
        label: '1st Friday Service',
        description: 'Monthly gathering — 12:00 PM',
      })
    }

    if (results.length < count && thirdFriday > now) {
      results.push({
        date: thirdFriday,
        type: 'Regular Service',
        label: '3rd Friday Service',
        description: 'Monthly gathering — 12:00 PM',
      })
    }

    month++
    if (month > 11) {
      month = 0
      year++
    }
  }

  return results.slice(0, count)
}

/** Format a date as "Friday, June 6" */
export function formatServiceDate(date: Date): string {
  return date.toLocaleDateString('en-NG', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

/** Returns a human-readable countdown (e.g. "in 3 days", "Today", "Tomorrow") */
export function getCountdown(date: Date): string {
  const now = new Date()
  const diffMs = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays < 7) return `in ${diffDays} days`
  if (diffDays < 30) return `in ${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''}`
  return `in ${Math.ceil(diffDays / 30)} month${Math.ceil(diffDays / 30) > 1 ? 's' : ''}`
}
