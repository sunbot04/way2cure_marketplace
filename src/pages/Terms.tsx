import LegalPage from './LegalPage';
import { useT } from '../i18n/LangContext';
import { LEGAL } from './copy/legal';

export default function Terms() {
  const tr = useT(LEGAL);
  return (
    <LegalPage title={tr('termsPage')} lead={tr('termsLead')} seo={tr('termsSeo')}
      other={{ to: '/privacy', label: tr('seePrivacy') }}>
      <h2 id="prescriptions">{tr('rxTitle')}</h2>
      <p>{tr('rxText')}</p>
      <h2>{tr('sellersTitle')}</h2>
      <p>{tr('sellersText')}</p>
      <h2>{tr('careTitle')}</h2>
      <p>{tr('careText')}</p>
      <h2>{tr('payTitle')}</h2>
      <p>{tr('payText')}</p>
    </LegalPage>
  );
}
