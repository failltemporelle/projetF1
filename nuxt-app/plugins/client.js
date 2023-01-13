import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  "https://sissllzmgqnujobufcec.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpc3NsbHptZ3FudWpvYnVmY2VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMwNDI5ODUsImV4cCI6MTk4ODYxODk4NX0.kvRLDYv3VtHKyLGNxW8Xlg02W3ttx1SNigWst_fFJww"
)
export default (_, inject) => {
  inject('supabase', supabase)
}