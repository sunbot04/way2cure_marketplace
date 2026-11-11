import LegalPage from './LegalPage';
import { SITE } from '../config/site';
import { useT } from '../i18n/LangContext';
import { LEGAL } from './copy/legal';

export default function Privacy() {
  const tr = useT(LEGAL);
  return (
    <LegalPage title={tr('privacyPage')} lead={tr('privacyLead')} seo={tr('privacySeo')}
      other={{ to: '/terms', label: tr('seeTerms') }}>
      <h2>{tr('privacyTitle')}</h2>
      <p>{tr('privacyText')}</p>
      <h2>{tr('askTitle')}</h2>
      <p>
        {tr('askText')}{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
      </p>
    </LegalPage>
  );
}
