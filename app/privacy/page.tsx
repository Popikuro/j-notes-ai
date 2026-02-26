export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Privacy Policy | J-Notes AI",
  description: "Privacy Policy for J-Notes AI, including our use of cookies and Google AdSense.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] flex flex-col items-center py-20 px-6 antialiased">
      <div className="w-full max-w-3xl space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-inter tracking-tight text-slate-900 dark:text-white mb-2 pb-2 inline-block border-b-2 border-indigo-500">
            Privacy Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-outfit text-sm tracking-widest uppercase">
            Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none font-outfit text-slate-700 dark:text-slate-300">
          <section className="bg-slate-50 dark:bg-[#1a1a1a] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold font-inter text-slate-900 dark:text-indigo-400 mb-4 flex items-center gap-2">
               Introduction
            </h2>
            <p className="leading-relaxed">
              Welcome to <strong>J-Notes AI</strong>. We are committed to protecting your personal information and your right to privacy. This Privacy Policy applies to all information collected through our website (https://j-notes-ai-ptny.vercel.app/). By using our site, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="bg-slate-50 dark:bg-[#1a1a1a] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow mt-8">
            <h2 className="text-2xl font-bold font-inter text-slate-900 dark:text-indigo-400 mb-4">
              Google AdSense & Cookies
            </h2>
            <p className="leading-relaxed mb-4">
              We use <strong>Google AdSense</strong> to display advertisements on our website. Google, as a third-party vendor, uses cookies to serve ads on our site based on a user's prior visits to our website or other websites on the internet.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-600 dark:text-slate-400 font-medium">
              <li>Third-party vendors, including Google, use cookies to serve ads based on your prior visits.</li>
              <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">Ads Settings</a>.</li>
            </ul>
            <p className="text-sm italic text-slate-500 mt-6 border-l-4 border-indigo-500/50 pl-4">
              For more information on how Google uses data when you use our partners' sites or apps, please visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">Google's terms</a>.
            </p>
          </section>

          <section className="bg-slate-50 dark:bg-[#1a1a1a] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow mt-8">
            <h2 className="text-2xl font-bold font-inter text-slate-900 dark:text-indigo-400 mb-4">
              Data Analytics & Log Files
            </h2>
            <p className="leading-relaxed">
              J-Notes AI follows a standard procedure of using log files and essential analytics to understand website traffic. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, and tracking aggregate user movement.
            </p>
          </section>

          <section className="bg-slate-50 dark:bg-[#1a1a1a] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow mt-8">
            <h2 className="text-2xl font-bold font-inter text-slate-900 dark:text-indigo-400 mb-4">
              Contact Us
            </h2>
            <p className="leading-relaxed">
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
            </p>
            <div className="mt-6 flex">
              <a 
                href="https://x.com/messages/compose?recipient_id=1962561585097977856" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors shadow-lg shadow-indigo-500/30"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
                Contact via X Direct Message
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
