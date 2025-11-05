import Image from 'next/image';

export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  url?: string;
  tags?: string[];
};

export type ProjectGroup = {
  name: string; // e.g., UI/UX, Web
  items: ProjectItem[];
};

export function ProjectGrid({ groups }: { groups: ProjectGroup[] }) {
  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <div key={group.name}>
          <h3 className="text-xl font-semibold mb-4">{group.name}</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((p) => (
              <article key={p.id} className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                <div className="relative aspect-[16/10]">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold">{p.title}</h4>
                  <p className="text-white/70 text-sm mt-1">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.tags?.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-md bg-white/10">{t}</span>
                    ))}
                  </div>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-brand-300 hover:text-brand-200">View ?</a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
