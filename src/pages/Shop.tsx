import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import { Field, Select } from '../components/ui/Field';
import ProductCard from '../components/commerce/ProductCard';
import RxNotice from '../components/commerce/RxNotice';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import { categories, shopViews, products, type Product } from '../data';
import { useT, useLoc, type Dict } from '../i18n/LangContext';
import NotFound from './NotFound';

const T: Dict = {
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
  { id: 'u500', label: 'under500', test: (p: number) => p < 500 },
  { id: '500-2000', label: 'mid', test: (p: number) => p >= 500 && p <= 2000 },
  { id: 'o2000', label: 'over2000', test: (p: number) => p > 2000 },
];

const amount = (p: Product) => p.price ?? p.rentPerMonth ?? 0;
type SortKey = 'popular' | 'price-low' | 'price-high' | 'delivery';
const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
  popular: (a, b) => b.popular - a.popular,
  'price-low': (a, b) => amount(a) - amount(b),
  'price-high': (a, b) => amount(b) - amount(a),
  delivery: (a, b) => a.deliveryHours - b.deliveryHours,
};

// Search matches the English text and both translations, so a search typed in any language works.
const searchText = (p: Product) =>
  [p, p.hi, p.mr].filter(Boolean).map((x) => `${x!.name ?? ''} ${x!.desc ?? ''}`).join(' ') + ` ${p.brand} ${p.cat}`;

export default function Shop() {
  const tr = useT(T);
  const loc = useLoc();
  const { category } = useParams();
  const [params] = useSearchParams();
  const rawQ = (params.get('q') || '').trim();
  const q = rawQ.toLowerCase();

  const [brand, setBrand] = useState('all');
  const [price, setPrice] = useState('all');
  const [buyRent, setBuyRent] = useState('all');
  const [rx, setRx] = useState('all');
  const [sort, setSort] = useState<SortKey>('popular');

  const view = categories.find((c) => c.slug === category) || shopViews.find((c) => c.slug === category);

  // TODO: API: catalogue search and filters server-side once the range grows.
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
    const band = priceBands.find((b) => b.id === price) ?? priceBands[0];
    const list = base.filter(
      (p) =>
        (brand === 'all' || p.brand === brand) &&
        band.test(amount(p)) &&
        (buyRent === 'all' || (buyRent === 'rent' ? !!p.rentPerMonth : !p.rentOnly)) &&
        (rx === 'all' || (rx === 'rx' ? p.rx : !p.rx)),
    );
    // Chronic-care items are pinned to the top, then the chosen sort.
    return [...list].sort((a, b) => (b.chronic ? 1 : 0) - (a.chronic ? 1 : 0) || sorters[sort](a, b));
  }, [base, brand, price, buyRent, rx, sort]);

  if (category && !view) return <NotFound />;

  const v = view ? loc(view) : undefined;
  const title = q ? tr('resultsFor', { q: rawQ }) : v ? v.name : tr('shop');
  const lead = v ? v.blurb : tr('intro');
  const reset = () => { setBrand('all'); setPrice('all'); setBuyRent('all'); setRx('all'); };
  const filtered = brand !== 'all' || price !== 'all' || buyRent !== 'all' || rx !== 'all';

  return (
    <>
      <Seo title={title} description={lead} noindex={!!q} />
      <PageHeader
        title={title}
        lead={lead}
        crumbs={category || q ? [{ label: tr('shop'), to: '/shop' }, { label: title }] : undefined}
      />

      <div className="container py-8 md:py-12">
        {!category && !q && (
          <ul className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[...categories, ...shopViews].map(loc).map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/shop/${c.slug}`}
                  className="flex h-full items-start gap-4 rounded-card border border-line bg-white p-4 text-ink no-underline transition-colors hover:border-green md:p-5"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-btn bg-sage-tint text-green">
                    <Icon name={c.icon} size={26} />
                  </span>
                  <span className="grid flex-1 gap-1">
                    <strong className="leading-snug text-green">{c.name}</strong>
                    <span className="hidden text-base text-grey md:block">{c.blurb}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {(category === 'medicines' || base.some((p) => p.rx)) && <RxNotice className="mb-8" />}

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside aria-labelledby="filter-heading" className="self-start rounded-card bg-white p-5 shadow-card lg:sticky lg:top-24">
            <h2 id="filter-heading" className="mb-4 font-body text-h3m">{tr('filter')}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <Field id="f-brand" label={tr('brand')}>
                <Select id="f-brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
                  <option value="all">{tr('allBrands')}</option>
                  {brands.map((b) => <option key={b}>{b}</option>)}
                </Select>
              </Field>
              <Field id="f-price" label={tr('price')}>
                <Select id="f-price" value={price} onChange={(e) => setPrice(e.target.value)}>
                  {priceBands.map((b) => <option key={b.id} value={b.id}>{tr(b.label)}</option>)}
                </Select>
              </Field>
              <Field id="f-mode" label={tr('buyOrRent')}>
                <Select id="f-mode" value={buyRent} onChange={(e) => setBuyRent(e.target.value)}>
                  <option value="all">{tr('buyOrRent')}</option>
                  <option value="buy">{tr('buy')}</option>
                  <option value="rent">{tr('rent')}</option>
                </Select>
              </Field>
              <Field id="f-rx" label={tr('prescription')}>
                <Select id="f-rx" value={rx} onChange={(e) => setRx(e.target.value)}>
                  <option value="all">{tr('rxAll')}</option>
                  <option value="rx">{tr('rxNeeded')}</option>
                  <option value="otc">{tr('rxNo')}</option>
                </Select>
              </Field>
            </div>
            {filtered && <Button variant="outline" block compact className="mt-5" onClick={reset}>{tr('clear')}</Button>}
          </aside>

          <div>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <p className="m-0 text-body" aria-live="polite">
                <strong>{shown.length}</strong> {shown.length === 1 ? tr('item') : tr('items')}
              </p>
              <Field id="f-sort" label={tr('sortBy')} className="w-full sm:w-64">
                <Select id="f-sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                  <option value="popular">{tr('popular')}</option>
                  <option value="price-low">{tr('priceLow')}</option>
                  <option value="price-high">{tr('priceHigh')}</option>
                  <option value="delivery">{tr('fastest')}</option>
                </Select>
              </Field>
            </div>
            {shown.length ? (
              <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4 2xl:grid-cols-5">
                {shown.map((p) => <li key={p.id} className="grid"><ProductCard product={p} /></li>)}
              </ul>
            ) : (
              <div className="rounded-card bg-white p-8 shadow-card">
                <h3>{tr('emptyTitle')}</h3>
                <p>{tr('emptyText')}</p>
                <Button onClick={reset}>{tr('clear')}</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
