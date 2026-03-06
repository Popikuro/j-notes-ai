import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey
);

async function main() {
    const { data: catData } = await supabase.from('categories').select('id, name').ilike('name', 'Insight').single();
    const category_id = catData ? catData.id : null;

    const { data, error } = await supabase.from('articles').insert({
        title: 'Gochisosama: The Satisfaction of Gratitude [ご馳走様]',
        slug: 'gochisosama-thank-you-for-the-meal',
        excerpt: 'The phrase "Gochisosama" is the essential counterpart to "Itadakimasu." Just as a meal begins with gratitude, it must end with it.',
        content: `The phrase "Gochisosama" is the essential counterpart to "Itadakimasu." Just as a meal begins with gratitude, it must end with it.

## Recognizing the Feast

<div class="flex flex-col items-center mb-10 w-full text-center">
  <img src="/gochisosama_solo_gratitude.png" alt="Gochisosama Solo Gratitude Cyber Mode" class="w-full max-w-2xl rounded-2xl shadow-xl mx-auto border border-slate-200 dark:border-slate-800" />
  <p class="text-sm text-slate-500 font-outfit mt-4 italic max-w-xl px-4 mx-auto">A profound gesture of gratitude: Osushi-chan expresses Gochisosama in the serene glow of the Cyber-Washitsu.</p>
</div>

By placing your hands together in *Gassho* [合掌] and saying <ContextDecoder phrase="ご馳走様" meaning="Thank you for the meal / It was a feast" context="Said after finishing a meal to express satisfaction and gratitude to the host or chef">Gochisosama</ContextDecoder>, you are explicitly acknowledging the profound effort that went into preparing the food. 

## The Meaning of the Characters

The characters 馳走 (Chisou) historically refer to "running around"—representing the physical effort the host went through to gather ingredients and prepare the feast. The prefix "Go" and suffix "Sama" elevate this effort to a deeply respectful level. 

1. **Clear Your Plate**: The most sincere way to say Gochisosama is to leave nothing behind.
2. **Hands Together**: Close your eyes and bow your head slightly.
3. **Say It Clearly**: Whether to the chef at a sushi counter or your family at the dinner table.`,
        published: true,
        published_at: new Date().toISOString(),
        category_id: category_id
    }).select();

    if (error) {
        if (error.code === '23505') {
            console.log('Already exists, updating it..');
            await supabase.from('articles').update({ published: true }).eq('slug', 'gochisosama-thank-you-for-the-meal');
        } else {
            console.error('Error inserting article:', error);
        }
    } else {
        console.log('Inserted article:', data);
    }
}
main();
