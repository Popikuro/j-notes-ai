import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json({ error: "Missing Supabase credentials in Vercel Edge environment" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const updates = [];

    // Update Naruto
    const res1 = await supabase.from("articles").update({ published_at: '2026-02-23T00:00:00.000Z' }).eq("slug", "nindo-naruto-way-of-the-ninja").select();
    updates.push({ naruto: res1 });

    // Update Demon Slayer
    const res2 = await supabase.from("articles").update({ published_at: '2026-02-24T00:00:00.000Z' }).eq("slug", "demon-slayer-kokoro-wo-moyase-shimei").select();
    updates.push({ demonSlayer: res2 });

    return NextResponse.json({ success: true, updates });
}
