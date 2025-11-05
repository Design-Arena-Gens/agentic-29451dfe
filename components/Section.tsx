import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export function Section({ id, title, subtitle, children, className }: PropsWithChildren<{ id?: string; title: string; subtitle?: string; className?: string }>) {
  return (
    <section id={id} className={clsx('container-width py-16 md:py-24', className)}>
      <div className="mb-8">
        <p className="text-brand-300 font-semibold tracking-wide">{subtitle}</p>
        <h2 className="text-3xl md:text-4xl font-bold mt-1">{title}</h2>
      </div>
      {children}
    </section>
  );
}
