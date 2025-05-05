import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Event, EventFilters } from '../types/event';

interface EventContextType {
  events: Event[];
  featuredEvents: Event[];
  loading: boolean;
  error: string | null;
  filters: EventFilters;
  setFilters: (filters: EventFilters) => void;
  fetchEvents: () => Promise<void>;
  fetchEventById: (id: string) => Promise<Event | null>;
  addEvent: (event: Omit<Event, 'id' | 'created_at'>) => Promise<void>;
  approveEvent: (id: string) => Promise<void>;
  rejectEvent: (id: string) => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EventFilters>({
    type: null,
    college: null,
    mode: null,
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    // Initialize Supabase client
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
      setSupabase(supabaseClient);
      fetchEvents();
    } else {
      setLoading(false);
      setError("Supabase configuration is missing. Please connect to Supabase.");
    }
  }, []);

  // Re-fetch events when filters change
  useEffect(() => {
    if (supabase) {
      fetchEvents();
    }
  }, [filters]);

  const fetchEvents = async () => {
    if (!supabase) return;

    try {
      setLoading(true);
      
      // Build query with filters
      let query = supabase
        .from('events')
        .select('*')
        .eq('status', 'approved')
        .order('event_date', { ascending: true });
      
      if (filters.type) {
        query = query.eq('event_type', filters.type);
      }
      
      if (filters.college) {
        query = query.eq('college', filters.college);
      }
      
      if (filters.mode) {
        query = query.eq('mode', filters.mode);
      }
      
      if (filters.startDate) {
        query = query.gte('event_date', filters.startDate);
      }
      
      if (filters.endDate) {
        query = query.lte('event_date', filters.endDate);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setEvents(data as Event[]);
      
      // Fetch featured events
      const { data: featuredData, error: featuredError } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'approved')
        .eq('featured', true)
        .order('event_date', { ascending: true })
        .limit(5);
        
      if (featuredError) throw featuredError;
      
      setFeaturedEvents(featuredData as Event[]);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventById = async (id: string): Promise<Event | null> => {
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      return data as Event;
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  const addEvent = async (event: Omit<Event, 'id' | 'created_at'>) => {
    if (!supabase) return;

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('events')
        .insert([event]);
        
      if (error) throw error;
      
      await fetchEvents();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const approveEvent = async (id: string) => {
    if (!supabase) return;

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('events')
        .update({ status: 'approved' })
        .eq('id', id);
        
      if (error) throw error;
      
      await fetchEvents();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const rejectEvent = async (id: string) => {
    if (!supabase) return;

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('events')
        .update({ status: 'rejected' })
        .eq('id', id);
        
      if (error) throw error;
      
      await fetchEvents();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        featuredEvents,
        loading,
        error,
        filters,
        setFilters,
        fetchEvents,
        fetchEventById,
        addEvent,
        approveEvent,
        rejectEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}