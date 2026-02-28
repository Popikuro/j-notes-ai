export const dynamic = 'force-dynamic';

export const metadata = {
  title: "About J-Notes AI | Mastering Japanese Business Culture",
  description: "Learn about J-Notes AI's mission to decode the nuances of Japanese business culture and etiquette.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] flex flex-col items-center py-20 px-6 antialiased">
      <div className="w-full max-w-3xl space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-inter tracking-tight text-slate-900 dark:text-white mb-2 pb-2 inline-block border-b-2 border-indigo-500">
            About J-Notes AI
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-outfit text-lg tracking-wide">
            Mastering Japanese Business Culture, one nuance at a time.
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none font-outfit text-slate-700 dark:text-slate-300">
          <section className="bg-slate-50 dark:bg-[#1a1a1a] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold font-inter text-slate-900 dark:text-indigo-400 mb-4 flex items-center gap-2">
               Our Mission
            </h2>
            <p className="leading-relaxed">
              At <strong>J-Notes AI</strong>, our mission is to elegantly decode the deeply intricate world of Japanese business culture and etiquette. We believe that understanding the *why* behind cultural practices—such as the profound respect conveyed in a business card exchange, or the gratitude expressed in a simple pre-meal phrase—is the key to building lasting, meaningful professional relationships in Japan.
            </p>
          </section>

          <section className="bg-slate-50 dark:bg-[#1a1a1a] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow mt-8">
            <h2 className="text-2xl font-bold font-inter text-slate-900 dark:text-indigo-400 mb-4">
               The "Cyber-Premium" Encyclopedia
            </h2>
            <p className="leading-relaxed mb-4">
              We leverage clean, modern design and high-quality "Cyber-Premium" visual infographics (featuring our mascot, Osushi-chan!) to make ancient cultural concepts immediately accessible to a modern, global audience. Whether you are an entrepreneur expanding into Tokyo, or a student of the Japanese language, J-Notes AI serves as your next-generation cultural encyclopedia.
            </p>
          </section>

          <section className="bg-slate-50 dark:bg-[#1a1a1a] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow mt-8">
            <h2 className="text-2xl font-bold font-inter text-slate-900 dark:text-indigo-400 mb-4">
              Connect With Us
            </h2>
            <p className="leading-relaxed">
              We are constantly expanding our database of cultural insights. Join our community on X (Twitter) or subscribe to our newsletter to receive the latest decoded nuances straight to your feed.
            </p>
            <div className="mt-6 flex">
              <a 
                href="/" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors shadow-lg shadow-indigo-500/30"
              >
                Start Learning
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
