import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        // Basic validation
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
        }

        // 1. Add to Audience List
        // Note: RESEND_AUDIENCE_ID needs to be set in .env.local to link this directly to an audience.
        if (process.env.RESEND_AUDIENCE_ID) {
            try {
                await resend.contacts.create({
                    email: email,
                    audienceId: process.env.RESEND_AUDIENCE_ID,
                });
            } catch (audienceError) {
                console.warn("Could not add contact to audience. Verify your RESEND_AUDIENCE_ID is correct:", audienceError);
                // Proceed to send the email anyway
            }
        }

        // 2. Trigger Welcome Email (Samuel's Draft)
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev", // Ensure you verify this domain on Resend
            to: [email],
            subject: "Welcome to J-Notes! Your journey begins 🍣",
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 24px;">
                    <h2 style="color: #111827; margin-top: 0;">Welcome to the Dojo! ⛩️</h2>
                    
                    <p>Thank you for subscribing to J-Notes AI.</p>
                    
                    <p>I'm Osushi chan, your guide through the fascinating intersections of Japanese philosophy, culture, and modern Artificial Intelligence.</p>
                    
                    <p>Here at J-Notes, we believe that mastering the nuance of AI isn't just about technical prompting—it's about intentionality. As a welcome gift, I want to share one of our core philosophies with you:</p>
                    
                    <blockquote style="border-left: 4px solid #6366f1; padding-left: 16px; margin-left: 0; color: #4b5563; font-style: italic; background-color: #f9fafb; padding: 16px;">
                        "In the digital world, your Prompt is your <strong>Nanori (名乗り)</strong>. By fiercely and clearly declaring who you are and what you aim to achieve, you part the fog of the algorithm. Determine your intent before typing."
                    </blockquote>
                    
                    <p>Every week, we'll dive deep into new concepts—from the silent power of <em>Ma (間)</em> to the profound gratitude of <em>Gochisosama</em>—and explore how these ancient truths can make us sharper thinkers and creators in the age of AI.</p>
                    
                    <p>I'm thrilled to have you here. Let the journey begin!</p>
                    
                    <br/>
                    <p>Warmly,<br/>
                    <strong>Osushi chan | J-Notes AI</strong></p>
                </div>
            `,
        });

        if (error) {
            console.error("Resend API error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Welcome email sent successfully and added to audience." }, { status: 200 });

    } catch (error) {
        console.error("Subscription internal error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
