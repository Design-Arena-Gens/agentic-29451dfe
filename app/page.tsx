import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { getDefaultConfig } from '@/lib/config';
import { Section } from '@/components/Section';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { ContactForm } from '@/components/ContactForm';

const Spline = dynamic(() => import('@splinetool/react-spline').then(m => m.default), { ssr: false });
const RiveComponent = dynamic(() => import('@/components/RiveShowcase').then(m => m.RiveShowcase), { ssr: false });

export default function HomePage() {
  const config = getDefaultConfig();

  return (
    <main>
      {/* Hero with Spline */}
      <section className="relative h-[80vh] min-h-[520px] overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene={config.hero.splineSceneUrl} />
        </div>
        <div className="relative z-10 container-width h-full flex items-center">
          <div className="backdrop-blur-sm/80 bg-black/30 rounded-2xl p-6 md:p-10 max-w-2xl">
            <p className="text-brand-300 font-semibold tracking-wide">{config.hero.kicker}</p>
            <h1 className="text-4xl md:text-6xl font-bold mt-2 leading-tight">
              {config.hero.heading}
            </h1>
            <p className="text-white/80 mt-4 text-lg">{config.hero.subheading}</p>
            <div className="flex gap-3 mt-6">
              <Link href="#projects" className="px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 transition">View Projects</Link>
              <Link href="#contact" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition">Contact</Link>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* About & Skills with Rive */}
      <Section id="about" title="About & Skills" subtitle="Full?stack dev ? UI/UX ? Branding">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="prose prose-invert">
            <p>{config.about.bio}</p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {config.skills.map((s) => (
                <div key={s} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">{s}</div>
              ))}
            </div>
          </div>
          <RiveComponent riveUrl={config.about.riveAnimationUrl} />
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" subtitle="UI/UX and Web builds">
        <ProjectGrid groups={config.projects} />
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" subtitle="Let?s build something exceptional">
        <ContactForm />
      </Section>

      <footer className="container-width py-10 text-sm text-white/60">
        ? {new Date().getFullYear()} {config.meta.author}. All rights reserved.
      </footer>
    </main>
  );
}
