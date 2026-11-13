import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import InfoBand from '../components/ui/InfoBand';
import { useLang, useT } from '../i18n/LangContext';
import { LEGAL } from './copy/legal';

// Shared shell for /privacy and /terms: one readable column and
// the "English applies" note when the page is shown in Hindi or Marathi.
interface Props {
  title: string;
  lead: string;
  seo: string;
  other: { to: string; label: string };
  children: ReactNode;
}

export default function LegalPage({ title, lead, seo, other, children }: Props) {
  const tr = useT(LEGAL);
  const { lang } = useLang();
  return (
    <>
      <Seo title={title} description={seo} />
      <PageHeader title={title} lead={lead} tone="white" />
      <div className="container grid max-w-[calc(70ch+3rem)] gap-6 py-8 md:py-12">
        {lang !== 'en' && <InfoBand>{tr('englishPrevails')}</InfoBand>}
        <div className="[&_h2]:mb-3 [&_h2]:mt-6 [&_p]:mb-0">{children}</div>
        <p className="m-0 border-t border-mint pt-6">
          <Link to={other.to} className="font-bold">{other.label}</Link>
        </p>
      </div>
    </>
  );
}
