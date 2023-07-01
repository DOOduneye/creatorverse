import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wsnyeqsuodmeayubgbpe.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbnllcXN1b2RtZWF5dWJnYnBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc0NjY4NTIsImV4cCI6MjAwMzA0Mjg1Mn0.2b4j0hR-KvSvDDxNgutrzaUXYk2sQHvy6OYUKJHTEwM';
const supabase = createClient(supabaseUrl, API_KEY)

export default supabase;

