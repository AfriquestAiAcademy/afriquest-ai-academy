// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qouwxbgivuohdwavesiv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvdXd4YmdpdnVvaGR3YXZlc2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NTc0NDgsImV4cCI6MjA1MjQzMzQ0OH0.cynwpc9iorGysQlsML1363jYDYpRV5eNTYP3d3vE34Y";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);