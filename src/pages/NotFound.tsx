import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import { SITE } from '../config/site';
import { useLang, useT, type Dict } from '../i18n/LangContext';

const T: Dict = {
  en: {
    title: 'We could not find that page.',
    text: 'It may have moved. Go back home, or call',
    textEnd: 'and we will help.',
    home: 'Go to home',
  },
  hi: {
    title: 'हमें यह पेज नहीं मिला।',
    text: 'हो सकता है यह कहीं और चला गया हो। होम पेज पर लौटें, या कॉल करें',
    textEnd: '— हम मदद करेंगे।',
    home: 'होम पेज पर जाएँ',
  },
  mr: {
    title: 'आम्हाला हे पान सापडले नाही.',
    text: 'हे कदाचित दुसरीकडे गेले असेल. मुख्यपृष्ठावर परत जा, किंवा कॉल करा',
    textEnd: '— आम्ही मदत करू.',
    home: 'मुख्यपृष्ठावर जा',
  },
};

export default function NotFound() {
  const { t } = useLang();
  const tr = useT(T);
  return (
    <div className="container py-10 md:py-14">
      <Seo title={tr('title')} description={tr('text')} noindex />
      <div className="max-w-2xl rounded-card bg-white p-8 shadow-card">
        <h1>{tr('title')}</h1>
        <p>
          {tr('text')} <a href={SITE.phoneHref} className="font-bold">{SITE.phoneDisplay}</a> {tr('textEnd')}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button to="/">{tr('home')}</Button>
          <Button to="/shop" variant="outline">{t('shop')}</Button>
        </div>
      </div>
    </div>
  );
}
