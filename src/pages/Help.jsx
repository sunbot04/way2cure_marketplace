import { faqs } from '../data/content.js';
import { FaqList, HelpBox, PageHead } from '../components/ui.jsx';

export default function Help() {
  return (
    <>
      <PageHead eyebrow="Help centre" title="Questions and answers">
        <p>Can't find what you need? Call or WhatsApp us. A real person will help.</p>
      </PageHead>
      <div className="container section-sm two-col">
        <FaqList items={faqs} />
        <HelpBox />
      </div>
    </>
  );
}
