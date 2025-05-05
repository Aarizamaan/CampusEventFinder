import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Initialize Supabase client
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
      setSupabase(supabaseClient);

      // Check for existing session
      supabaseClient.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user || null);
      });

      // Set up auth state listener
      const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
        async (_, session) => {
          setUser(session?.user || null);
          
          if (session?.user) {
            // Check if user is admin
            const { data, error } = await supabaseClient
              .from('profiles')
              .select('is_admin')
              .eq('id', session.user.id)
              .single();
              
            setIsAdmin(data?.is_admin || false);
          } else {
            setIsAdmin(false);
          }
          
          setLoading(false);
        }
      );

      // Cleanup subscription
      return () => {
        subscription.unsubscribe();
      };
    } else {
      setLoading(false);
      setError("Supabase configuration is missing. Please connect to Supabase.");
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!supabase) return;

    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!supabase) return;

    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    if (!supabase) return;

    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, isAdmin, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}