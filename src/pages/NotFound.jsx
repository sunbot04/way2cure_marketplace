import { Link } from 'react-router-dom';
import { SITE } from '../config/site.js';
import { useLang, useT } from '../context/LangContext.jsx';

const T = {
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
    <div className="container section">
      <div className="empty card">
        <h1 className="h2">{tr('title')}</h1>
        <p>{tr('text')} <a href={SITE.phoneHref}>{SITE.phone}</a> {tr('textEnd')}</p>
        <div className="btn-row">
          <Link to="/" className="btn btn-primary">{tr('home')}</Link>
          <Link to="/shop" className="btn btn-outline">{t('shop')}</Link>
        </div>
      </div>
    </div>
  );
}
