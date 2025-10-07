import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://whzrdqpxrayxrvjyorvw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoenJkcXB4cmF5eHJ2anlvcnZ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTY5MzEyMCwiZXhwIjoyMDc1MjY5MTIwfQ.NenhF89CJTrz1Lejbc9zaURAS9X9AceQDtCIReq6Tz0"
);

export default supabase;
