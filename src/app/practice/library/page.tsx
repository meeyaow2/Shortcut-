import type { Metadata } from "next";
import { FreshnessStatus } from "@/components/source/Source";
import { Tag } from "@/components/ui/Tag";
import { ExternalLink, PageHeader } from "@/components/ui/primitives";
import { VERIFIED } from "@/data/citations";
import { openCategories, openResources } from "@/data/practice";

export const metadata: Metadata = { title: "Open Design Library" };

const slug = (category: string) => category.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function LibraryPage() {
  return (
    <div className="page">
      <PageHeader
        title="Open Design Library"
        lede="Free and open resources worth knowing: official, well maintained and trustworthy. A short list on purpose."
      >
        <div className="mt-5 max-w-read space-y-1.5 text-sm text-ink-2">
          <p>
            <span className="font-semibold text-ink">Licences </span>
            are what each project&rsquo;s own repository reported on the date shown. Where a licence was not checked,
            the entry says so. &ldquo;Free to read&rdquo; does not mean open source.
          </p>
          <FreshnessStatus dateVerified={VERIFIED} />
        </div>
      </PageHeader>

      <div className="grid gap-10 pt-8 lg:grid-cols-[13rem_1fr]">
        <nav aria-label="Categories" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <p className="text-sm font-semibold">Categories</p>
          <ul className="mt-2 space-y-0.5 border-l border-line">
            {openCategories.map((category) => (
              <li key={category}>
                <a href={`#${slug(category)}`} className="-ml-px block border-l border-transparent py-1 pl-3 text-ink-2 hover:border-ink hover:text-ink">
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 stack-sections">
          {openCategories.map((category) => (
            <section key={category} id={slug(category)} aria-labelledby={`${slug(category)}-title`} className="anchor-target">
              <h2 id={`${slug(category)}-title`} className="border-b-2 border-ink pb-2 text-2xl font-semibold">
                {category}
              </h2>
              <ul className="grid gap-4 pt-5 md:grid-cols-2">
                {openResources
                  .filter((resource) => resource.category === category)
                  .map((resource) => (
                    <li key={resource.id} id={resource.id} className="anchor-target flex flex-col rounded-md border border-line p-4 sm:p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-lg font-semibold">{resource.name}</h3>
                        <Tag tone={resource.access === "Open source" ? "ok" : "outline"}>{resource.access}</Tag>
                      </div>
                      <p className="mt-2">{resource.what}</p>
                      <dl className="mt-3 flex-1 space-y-2 text-[0.9375rem]">
                        <div>
                          <dt className="inline font-semibold text-ink-3">Use it for. </dt>
                          <dd className="inline text-ink-2">{resource.useFor}</dd>
                        </div>
                        <div>
                          <dt className="inline font-semibold text-ink-3">Why it is useful. </dt>
                          <dd className="inline text-ink-2">{resource.why}</dd>
                        </div>
                        <div>
                          <dt className="inline font-semibold text-ink-3">Licence. </dt>
                          <dd className="inline text-ink-2">{resource.licence ?? "Not checked. See the site's own terms."}</dd>
                        </div>
                      </dl>
                      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-3">
                        <ExternalLink href={resource.url}>Official site</ExternalLink>
                        {resource.repo && resource.repo !== resource.url && <ExternalLink href={resource.repo}>Repository</ExternalLink>}
                      </p>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
