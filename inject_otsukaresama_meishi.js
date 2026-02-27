const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    console.log("Starting DB update...");

    // 1. Update Otsukaresama
    const otsukaresamaTitle = 'Otsukaresama: More Than "Good Job" [お疲れ様です]';
    const otsukaresamaContent = `
"Otsukaresama" is famously one of the most difficult Japanese phrases to translate directly into English. It is a linguistic Swiss Army knife used in almost every conceivable workplace scenario.

## The Silent Acknowledgment

While literally translating to "You must be tired," its actual meaning is much closer to a profound expression of communal appreciation. Saying <ContextDecoder phrase="Otsukaresama" meaning="Thank you for your hard work" context="Used to acknowledge shared effort and build solidarity in the workplace">Otsukaresama</ContextDecoder> acknowledges the burden of the work and the shared dedication of the team.

## When to Use It

1. **Arriving at the Office**: It serves as a gentle, collaborative greeting alongside 'Ohayou gozaimasu'.
2. **Passing in the Hallway**: A quick acknowledgment of shared effort during a busy day.
3. **Leaving for the Day**: Replaces "goodbye" with a warm wave of appreciation.

## More Than Words

Ultimately, it reflects the cultural value of *wa* (harmony) and communal effort. It tells your colleagues: "I see your hard work, and I value it."
    `.trim();

    const { error: error1 } = await supabase
        .from('articles')
        .update({ title: otsukaresamaTitle, content: otsukaresamaContent })
        .eq('slug', 'the-magic-word-otsukaresama');
        
    if (error1) console.error("Error updating Otsukaresama:", error1);
    else console.log("Successfully updated Otsukaresama");

    // 2. Update Meishi
    const meishiTitle = 'Meishi: The Soul of a Business Card [名刺]';
    const meishiContent = `
In many Western business cultures, a business card is a disposable piece of paper, often crumpled in a pocket or immediately transcribed into a phone. In Japan, the ritual is entirely different.

## The Extension of Self

In Japanese business protocol, a <ContextDecoder phrase="Meishi" meaning="Business card" context="Treated as a literal extension of the person giving it, commanding immediate respect">Meishi</ContextDecoder> is not merely contact information; it is considered a physical extension of the individual and their corporate identity.

## The Ritual of Exchange

The actual exchange of the Meishi is a choreographed dance of respect:

1. **Present with Both Hands**: Always hold the card by the top corners with both hands, ensuring the text is facing the recipient so they can read it immediately.
2. **Accept with Care**: Receive the card with both hands and take a moment to read it carefully. Acknowledge their title and name out loud. Never slide it directly into your pocket.
3. **Table Placement**: During a meeting, keep the card face-up on the table, arranged according to the seating order of the people across from you.

## A Lasting Impression

Treating the Meishi with the utmost reverence from the very first second sets the tone for a respectful, long-lasting business relationship. It is the first test of your professional character.
    `.trim();

    const { error: error2 } = await supabase
        .from('articles')
        .update({ title: meishiTitle, content: meishiContent })
        .eq('slug', 'the-art-of-meishi-more-than-just-a-business-card');

    if (error2) console.error("Error updating Meishi:", error2);
    else console.log("Successfully updated Meishi");

}

run();
