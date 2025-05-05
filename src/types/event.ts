export type EventType = 'hackathon' | 'workshop' | 'webinar' | 'seminar' | 'competition' | 'tech_talk' | 'other';
export type EventMode = 'online' | 'offline' | 'hybrid';
export type EventStatus = 'pending' | 'approved' | 'rejected';

export interface Event {
  id: string;
  name: string;
  description: string;
  short_description: string;
  college: string;
  event_type: EventType;
  mode: EventMode;
  location: string | null;
  event_date: string;
  end_date: string | null;
  registration_link: string;
  image_url: string | null;
  featured: boolean;
  status: EventStatus;
  created_at: string;
  created_by: string | null;
}

export interface EventFilters {
  type: EventType | null;
  college: string | null;
  mode: EventMode | null;
  startDate: string | null;
  endDate: string | null;
}