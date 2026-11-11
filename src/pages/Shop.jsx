import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import ProductCard from '../components/ProductCard';
import { categories, shopViews, products } from '../data';
import { PageHead, RxNotice } from '../components/legacy-ui';
import { useT, useLoc } from '../i18n/LangContext';
import NotFound from './NotFound';

const T = {
  en: {
    shop: 'Shop',
    resultsFor: 'Results for "{q}"',
    intro: 'Medicines, devices, daily care and more. Delivered in Mumbai, Navi Mumbai and Thane.',
    filters: 'Filters', filter: 'Filter',
    brand: 'Brand', allBrands: 'All brands',
    price: 'Price', anyPrice: 'Any price', under500: 'Under Rs. 500', mid: 'Rs. 500 to 2,000', over2000: 'Over Rs. 2,000',
    buyOrRent: 'Buy or rent', buy: 'Buy', rent: 'Rent',
    prescription: 'Prescription', rxAll: 'Rx and no Rx', rxNeeded: 'Rx needed', rxNo: 'No Rx needed',
    clear: 'Clear filters',
    item: 'item', items: 'items',
    sortBy: 'Sort by', popular: 'Most popular', priceLow: 'Price: low to high', priceHigh: 'Price: high to low', fastest: 'Fastest delivery',
    emptyTitle: 'We could not find that.',
    emptyText: 'Try a different word, or clear the filters. You can also call us and we will find it for you.',
  },
  hi: {
    shop: 'खरीदारी',
    resultsFor: '"{q}" के नतीजे',
    intro: 'दवाइयाँ, उपकरण, रोज़ की देखभाल और बहुत कुछ। मुंबई, नवी मुंबई और ठाणे में डिलिवरी।',
    filters: 'फ़िल्टर', filter: 'फ़िल्टर',
    brand: 'ब्रांड', allBrands: 'सभी ब्रांड',
    price: 'कीमत', anyPrice: 'कोई भी कीमत', under500: 'Rs. 500 से कम', mid: 'Rs. 500 से 2,000', over2000: 'Rs. 2,000 से ज़्यादा',
    buyOrRent: 'ख़रीदें या किराये पर', buy: 'ख़रीदें', rent: 'किराये पर',
    prescription: 'पर्चा', rxAll: 'पर्चे वाली और बिना पर्चे वाली', rxNeeded: 'पर्चा ज़रूरी', rxNo: 'पर्चा ज़रूरी नहीं',
    clear: 'फ़िल्टर हटाएँ',
    item: 'सामान', items: 'सामान',
    sortBy: 'क्रम', popular: 'सबसे लोकप्रिय', priceLow: 'कीमत: कम से ज़्यादा', priceHigh: 'कीमत: ज़्यादा से कम', fastest: 'सबसे जल्दी डिलिवरी',
    emptyTitle: 'हमें यह नहीं मिला।',
    emptyText: 'कोई दूसरा शब्द आज़माएँ, या फ़िल्टर हटाएँ। आप हमें कॉल भी कर सकते हैं, हम आपके लिए ढूँढ देंगे।',
  },
  mr: {
    shop: 'खरेदी',
    resultsFor: '"{q}" साठी निकाल',
    intro: 'औषधे, उपकरणे, दैनंदिन काळजी आणि बरेच काही. मुंबई, नवी मुंबई आणि ठाणे येथे डिलिव्हरी.',
    filters: 'फिल्टर', filter: 'फिल्टर',
    brand: 'ब्रँड', allBrands: 'सर्व ब्रँड',
    price: 'किंमत', anyPrice: 'कोणतीही किंमत', under500: 'Rs. 500 पेक्षा कमी', mid: 'Rs. 500 ते 2,000', over2000: 'Rs. 2,000 पेक्षा जास्त',
    buyOrRent: 'विकत की भाड्याने', buy: 'विकत घ्या', rent: 'भाड्याने',
    prescription: 'प्रिस्क्रिप्शन', rxAll: 'प्रिस्क्रिप्शनची आणि विना-प्रिस्क्रिप्शन', rxNeeded: 'प्रिस्क्रिप्शन आवश्यक', rxNo: 'प्रिस्क्रिप्शन आवश्यक नाही',
    clear: 'फिल्टर काढा',
    item: 'वस्तू', items: 'वस्तू',
    sortBy: 'क्रम', popular: 'सर्वात लोकप्रिय', priceLow: 'किंमत: कमी ते जास्त', priceHigh: 'किंमत: जास्त ते कमी', fastest: 'सर्वात लवकर डिलिव्हरी',
    emptyTitle: 'आम्हाला हे सापडले नाही.',
    emptyText: 'दुसरा शब्द वापरून पाहा, किंवा फिल्टर काढा. तुम्ही आम्हाला कॉलही करू शकता, आम्ही तुमच्यासाठी शोधून देऊ.',
  },
};

const priceBands = [
  { id: 'all', label: 'anyPrice', test: () => true },
  { id: 'u500', label: 'under500', test: (p) => p < 500 },
  { id: '500-2000', label: 'mid', test: (p) => p >= 500 && p <= 2000 },
  { id: 'o2000', label: 'over2000', test: (p) => p > 2000 },
];

const sorters = {
  popular: (a, b) => b.popular - a.popular,
  'price-low': (a, b) => (a.price ?? a.rentPerMonth) - (b.price ?? b.rentPerMonth),
  'price-high': (a, b) => (b.price ?? b.rentPerMonth) - (a.price ?? a.rentPerMonth),
  delivery: (a, b) => a.deliveryHours - b.deliveryHours,
};

// Search matches the English text and both translations, so a search typed in any language works.
const searchText = (p) =>
  [p, p.hi, p.mr].filter(Boolean).map((x) => `${x.name} ${x.desc}`).join(' ') + ` ${p.brand} ${p.cat}`;

export default function Shop() {
  const tr = useT(T);
  const loc = useLoc();
  const { category } = useParams();
  const [params] = useSearchParams();
  const q = (params.get('q') || '').trim().toLowerCase();

  const [brand, setBrand] = useState('all');
  const [price, setPrice] = useState('all');
  const [buyRent, setBuyRent] = useState('all');
  const [rx, setRx] = useState('all');
  const [sort, setSort] = useState('popular');

  const view = categories.find((c) => c.slug === category) || shopViews.find((c) => c.slug === category);

  const base = useMemo(() => {
    let list = products;
    if (category === 'rent') list = list.filter((p) => p.rentPerMonth);
    else if (category === 'sellers') list = list.filter((p) => p.seller !== 'Way2Cure');
    else if (category) list = list.filter((p) => p.cat === category);
    if (q) list = list.filter((p) => searchText(p).toLowerCase().includes(q));
    return list;
  }, [category, q]);

  const brands = [...new Set(base.map((p) => p.brand))].sort();

  const shown = useMemo(() => {
    const band = priceBands.find((b) => b.id === price);
    const list = base.filter(
      (p) =>
        (brand === 'all' || p.brand === brand) &&
        band.test(p.price ?? p.rentPerMonth) &&
        (buyRent === 'all' || (buyRent === 'rent' ? p.rentPerMonth : !p.rentOnly)) &&
        (rx === 'all' || (rx === 'rx' ? p.rx : !p.rx)),
    );
    // Chronic-care items are pinned to the top, then the chosen sort.
    return [...list].sort((a, b) => (b.chronic ? 1 : 0) - (a.chronic ? 1 : 0) || sorters[sort](a, b));
  }, [base, brand, price, buyRent, rx, sort]);

  if (category && !view) return <NotFound />;

  const v = loc(view);
  const title = q ? tr('resultsFor', { q: params.get('q') }) : v ? v.name : tr('shop');
  const reset = () => { setBrand('all'); setPrice('all'); setBuyRent('all'); setRx('all'); };

  return (
    <>
      <PageHead eyebrow={tr('shop')} title={title}>
        <p>{v ? v.blurb : tr('intro')}</p>
      </PageHead>

      <div className="container section-sm">
        {!category && !q && (
          <div className="grid grid-tiles shop-cats">
            {[...categories, ...shopViews].map(loc).map((c) => (
              <Link key={c.slug} to={`/shop/${c.slug}`} className="card card-edge-left tile" style={{ '--edge': c.edge }}>
                <span className="tile-icon"><Icon name={c.icon} size={32} /></span>
                <span className="tile-text"><strong>{c.name}</strong><span>{c.blurb}</span></span>
                <Icon name="chevron" className="tile-arrow" />
              </Link>
            ))}
          </div>
        )}

        {(category === 'medicines' || base.some((p) => p.rx)) && <RxNotice />}

        <div className="shop-layout">
          <aside className="filters card" aria-label={tr('filters')}>
            <h2 className="h3">{tr('filter')}</h2>
            <label className="select-label">{tr('brand')}
              <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="all">{tr('allBrands')}</option>
                {brands.map((b) => <option key={b}>{b}</option>)}
              </select>
            </label>
            <label className="select-label">{tr('price')}
              <select value={price} onChange={(e) => setPrice(e.target.value)}>
                {priceBands.map((b) => <option key={b.id} value={b.id}>{tr(b.label)}</option>)}
              </select>
            </label>
            <label className="select-label">{tr('buyOrRent')}
              <select value={buyRent} onChange={(e) => setBuyRent(e.target.value)}>
                <option value="all">{tr('buyOrRent')}</option>
                <option value="buy">{tr('buy')}</option>
                <option value="rent">{tr('rent')}</option>
              </select>
            </label>
            <label className="select-label">{tr('prescription')}
              <select value={rx} onChange={(e) => setRx(e.target.value)}>
                <option value="all">{tr('rxAll')}</option>
                <option value="rx">{tr('rxNeeded')}</option>
                <option value="otc">{tr('rxNo')}</option>
              </select>
            </label>
            <button type="button" className="btn btn-outline btn-block" onClick={reset}>{tr('clear')}</button>
          </aside>

          <div>
            <div className="shop-toolbar">
              <p aria-live="polite"><strong>{shown.length}</strong> {shown.length === 1 ? tr('item') : tr('items')}</p>
              <label className="select-label inline">{tr('sortBy')}
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="popular">{tr('popular')}</option>
                  <option value="price-low">{tr('priceLow')}</option>
                  <option value="price-high">{tr('priceHigh')}</option>
                  <option value="delivery">{tr('fastest')}</option>
                </select>
              </label>
            </div>
            {shown.length ? (
              <div className="grid grid-products">
                {shown.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="empty card">
                <h3>{tr('emptyTitle')}</h3>
                <p>{tr('emptyText')}</p>
                <button type="button" className="btn btn-primary" onClick={reset}>{tr('clear')}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
