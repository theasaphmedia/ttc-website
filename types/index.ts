// Form Types

export type FormType =
  | 'membership'
  | 'counseling'
  | 'feedback'
  | 'first_timer'
  | 'second_timer'
  | 'volunteer'
  | 'membership_class'
  | 'ministry_group_class'
  | 'online_community'
  | 'premarital_counseling'
  | 'postmarital_counseling'
  | 'prayer_request'
  | 'testimony'
  | 'welfare'
  | 'tic_city'
  | 'transformation_kids'
  | 'elders_forum'
  | 'circle_group'
  | 'ministry_group_music'
  | 'ministry_group_locomotive'
  | 'ministry_group_twg'
  | 'ministry_group_tpg'
  | 'ministry_group_gip'
  | 'ministry_group_media'
  | 'ministry_group_admin'
  | 'tic_campus'
  | 'contact'

export interface FormSubmission {
  id?: string
  created_at?: string
  form_type: FormType
  name: string
  email: string
  phone?: string
  data: Record<string, unknown>
}

// Giving Types

export type GivingCategory = 'offering' | 'tithe' | 'building' | 'special'

export interface GivingTransaction {
  id?: string
  created_at?: string
  name: string
  email: string
  phone?: string
  amount: number
  category: GivingCategory
  paystack_reference?: string
  status: 'pending' | 'success' | 'failed'
}

// YouTube / Sermon Types

export interface YouTubeSermon {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  duration: string
  viewCount?: string
  videoType?: 'sermon' | 'music'
}

export type SermonCategory =
  | 'All'
  | 'Purpose & Calling'
  | 'Prayer & Worship'
  | 'Grace & Faith'
  | 'Life & Relationships'
  | 'Special Series'

// Ministry Group Types

export interface MinistryGroup {
  slug: string
  name: string
  subtitle?: string
  icon: string
  color: string
  description: string
  formType: FormType
  intent?: 'join' | 'learn'  // 'join' = serve on the team | 'learn' = enrol to grow
}

// Program / Schedule Types

export interface ScheduledService {
  date: Date
  type: 'Regular Service' | 'Quarterly Ingathering' | 'Special Program'
  label: string
  location?: string
}
