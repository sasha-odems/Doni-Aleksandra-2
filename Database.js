import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";
const SUPABASE_URL = "https://tezhzyatmwjvzjiqjhiv.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlemh6eWF0bXdqdnpqaXFqaGl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDIyNDIsImV4cCI6MjA2MTA3ODI0Mn0.b-c4eIwpIwyFYCjRSBvi9FNbmEKurxaRjZDjiZVOFfA"
// Create a single supabase client for interacting with your database


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
