import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import CategoryCard from '../components/commerce/CategoryCard';
import Button from '../components/ui/Button';
import { Field, Select } from '../components/ui/Field';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import ProductCard from '../components/commerce/ProductCard';
import CartBar from '../components/commerce/CartBar';
import { COPY } from '../components/copy';
import { useSaved } from '../context/SavedContext';
import RxNotice from '../components/commerce/RxNotice';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import { categories, shopViews, products, type Product } from '../data';
import { SITE } from '../config/site';
import { useLang, useT, useLoc, type Dict } from '../i18n/LangContext';
import NotFound from './NotFound';

const T: Dict = {
  en: {
    shop: 'Shop',
    shopTitle: 'Everything for care at home, *delivered to your door.*',
    resultsFor: 'Results for "{q}"',
    intro: 'Medicines, devices, daily care and more. Delivered in Mumbai, Navi Mumbai and Thane.',
    browse: 'Browse by need',
    filters: 'Filters', filter: 'Filter', showFilters: 'Show filters', hideFilters: 'Hide filters', active: '{n} on',
    brand: 'Brand', allBrands: 'All brands',
    price: 'Price', anyPrice: 'Any price', under500: 'Under Rs. 500', mid: 'Rs. 500 to 2,000', over2000: 'Over Rs. 2,000',
    buyOrRent: 'Buy or rent', buy: 'Buy', rent: 'Rent',
    prescription: 'Prescription', rxAll: 'Rx and no Rx', rxNeeded: 'Rx needed', rxNo: 'No Rx needed',
    clear: 'Clear filters',
    item: 'item', items: 'items', loading: 'Loading products',
    sortBy: 'Sort by', popular: 'Most popular', priceLow: 'Price: low to high', priceHigh: 'Price: high to low', fastest: 'Fastest delivery',
    emptyTitle: 'We could not find that.',
    emptyText: 'Try a different word, or clear the filters. You can also call us and we will find it for you.',
    allProducts: 'See all products', call: 'Call {phone}',
    errorTitle: 'We could not load products.',
    errorText: 'Your cart is safe. Please try again. If it keeps happening, call us and we will place the order for you.',
    retry: 'Try again',
    findTitle: 'Cannot find what you need?', findText: 'Tell us on WhatsApp or call. We will find it and deliver it.',
  },
  hi: {
    shop: 'खरीदारी',
    shopTitle: 'घर पर देखभाल की हर चीज़, *आपके दरवाज़े तक।*',
    resultsFor: '"{q}" के नतीजे',
    intro: 'दवाइयाँ, उपकरण, रोज़ की देखभाल और बहुत कुछ। मुंबई, नवी मुंबई और ठाणे में डिलिवरी।',
    browse: 'ज़रूरत के हिसाब से देखें',
    filters: 'फ़िल्टर', filter: 'फ़िल्टर', showFilters: 'फ़िल्टर दिखाएँ', hideFilters: 'फ़िल्टर छिपाएँ', active: '{n} चालू',
    brand: 'ब्रांड', allBrands: 'सभी ब्रांड',
    price: 'कीमत', anyPrice: 'कोई भी कीमत', under500: 'Rs. 500 से कम', mid: 'Rs. 500 से 2,000', over2000: 'Rs. 2,000 से ज़्यादा',
    buyOrRent: 'ख़रीदें या किराये पर', buy: 'ख़रीदें', rent: 'किराये पर',
    prescription: 'पर्चा', rxAll: 'सभी सामान', rxNeeded: 'पर्चा ज़रूरी', rxNo: 'पर्चा ज़रूरी नहीं',
    clear: 'फ़िल्टर हटाएँ',
    item: 'सामान', items: 'सामान', loading: 'प्रोडक्ट लोड हो रहे हैं',
    sortBy: 'क्रम', popular: 'सबसे लोकप्रिय', priceLow: 'कीमत: कम से ज़्यादा', priceHigh: 'कीमत: ज़्यादा से कम', fastest: 'सबसे जल्दी डिलिवरी',
    emptyTitle: 'हमें यह नहीं मिला।',
    emptyText: 'कोई दूसरा शब्द आज़माएँ, या फ़िल्टर हटाएँ। आप हमें कॉल भी कर सकते हैं, हम आपके लिए ढूँढ देंगे।',
    allProducts: 'सभी प्रोडक्ट देखें', call: 'कॉल करें {phone}',
    errorTitle: 'हम प्रोडक्ट लोड नहीं कर पाए।',
    errorText: 'आपका कार्ट सुरक्षित है। कृपया फिर से कोशिश करें। अगर ऐसा बार-बार हो, तो हमें कॉल करें, हम आपके लिए ऑर्डर कर देंगे।',
    retry: 'फिर से कोशिश करें',
    findTitle: 'जो चाहिए वह नहीं मिल रहा?', findText: 'हमें व्हाट्सऐप पर बताएँ या कॉल करें। हम ढूँढकर पहुँचा देंगे।',
  },
  mr: {
    shop: 'खरेदी',
    shopTitle: 'घरच्या काळजीसाठी सर्व काही, *तुमच्या दारात.*',
    resultsFor: '"{q}" साठी निकाल',
    intro: 'औषधे, उपकरणे, दैनंदिन काळजी आणि बरेच काही. मुंबई, नवी मुंबई आणि ठाणे येथे डिलिव्हरी.',
    browse: 'गरजेनुसार पाहा',
    filters: 'फिल्टर', filter: 'फिल्टर', showFilters: 'फिल्टर दाखवा', hideFilters: 'फिल्टर लपवा', active: '{n} चालू',
    brand: 'ब्रँड', allBrands: 'सर्व ब्रँड',
    price: 'किंमत', anyPrice: 'कोणतीही किंमत', under500: 'Rs. 500 पेक्षा कमी', mid: 'Rs. 500 ते 2,000', over2000: 'Rs. 2,000 पेक्षा जास्त',
    buyOrRent: 'विकत की भाड्याने', buy: 'विकत घ्या', rent: 'भाड्याने',
    prescription: 'प्रिस्क्रिप्शन', rxAll: 'सर्व वस्तू', rxNeeded: 'प्रिस्क्रिप्शन लागते', rxNo: 'प्रिस्क्रिप्शन नको',
    clear: 'फिल्टर काढा',
    item: 'वस्तू', items: 'वस्तू', loading: 'उत्पादने लोड होत आहेत',
    sortBy: 'क्रम', popular: 'सर्वात लोकप्रिय', priceLow: 'किंमत: कमी ते जास्त', priceHigh: 'किंमत: जास्त ते कमी', fastest: 'सर्वात लवकर डिलिव्हरी',
    emptyTitle: 'आम्हाला हे सापडले नाही.',
    emptyText: 'दुसरा शब्द वापरून पाहा, किंवा फिल्टर काढा. तुम्ही आम्हाला कॉलही करू शकता, आम्ही तुमच्यासाठी शोधून देऊ.',
    allProducts: 'सर्व उत्पादने पाहा', call: 'कॉल करा {phone}',
    errorTitle: 'आम्ही उत्पादने लोड करू शकलो नाही.',
    errorText: 'तुमचे कार्ट सुरक्षित आहे. कृपया पुन्हा प्रयत्न करा. असे वारंवार होत असल्यास, आम्हाला कॉल करा, आम्ही तुमच्यासाठी ऑर्डर करू.',
    retry: 'पुन्हा प्रयत्न करा',
    findTitle: 'हवे ते सापडत नाही?', findText: 'आम्हाला व्हॉट्सॲपवर सांगा किंवा कॉल करा. आम्ही शोधून पोहोचवू.',
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

// Simulated catalogue loading time, so the skeleton grid can be seen.
// TODO: API: replace with the real catalogue request; keep the skeleton while it is in flight.
const LOAD_MS = 500;

// Product cards (client design products.html): 2 across on phones, 3 from 768px, 4 from 1280px.
const grid = 'grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-4 xl:grid-cols-4';

export default function Shop() {
  const { t } = useLang();
  const tr = useT(T);
  const loc = useLoc();
  const { category } = useParams();
  const [params, setParams] = useSearchParams();
  const rawQ = (params.get('q') || '').trim();
  const q = rawQ.toLowerCase();
  // Demo only: /shop?fail=1 shows the error state.
  const fail = params.get('fail') === '1';
  // ?saved=1: only the products saved with the heart
  const savedOnly = params.get('saved') === '1';
  const { ids: savedIds } = useSaved();
  const tc = useT(COPY);

  const [brand, setBrand] = useState('all');
  const [price, setPrice] = useState('all');
  const [buyRent, setBuyRent] = useState('all');
  const [rx, setRx] = useState('all');
  const [sort, setSort] = useState<SortKey>('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);

  const view = categories.find((c) => c.slug === category) || shopViews.find((c) => c.slug === category);

  // TODO: API: catalogue search and filters server-side once the range grows.
  const base = useMemo(() => {
    let list = products;
    if (category === 'rent') list = list.filter((p) => p.rentPerMonth);
    else if (category === 'sellers') list = list.filter((p) => p.seller !== 'Way2Cure');
    else if (category) list = list.filter((p) => p.cat === category);
    if (q) list = list.filter((p) => searchText(p).toLowerCase().includes(q));
    if (savedOnly) list = list.filter((p) => savedIds.includes(p.id));
    return list;
  }, [category, q, savedOnly, savedIds]);

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

  // Skeleton on first load and whenever the category, search or a filter changes (not on sort).
  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), LOAD_MS);
    return () => window.clearTimeout(timer);
  }, [category, q, brand, price, buyRent, rx, fail, attempt, savedOnly]);

  if (category && !view) return <NotFound />;

  const v = view ? loc(view) : undefined;
  const plainTitle = q ? tr('resultsFor', { q: rawQ }) : v ? v.name : tr('shop');
  const title = q || v ? plainTitle : tr('shopTitle');
  const lead = v ? v.blurb : tr('intro');
  const reset = () => { setBrand('all'); setPrice('all'); setBuyRent('all'); setRx('all'); };
  const activeCount = [brand, price, buyRent, rx].filter((x) => x !== 'all').length;
  const retry = () => {
    if (fail) {
      const next = new URLSearchParams(params);
      next.delete('fail');
      setParams(next, { replace: true });
    } else setAttempt((n) => n + 1);
  };
  const gridKey = [category, q, brand, price, buyRent, rx, sort, attempt, savedOnly].join('|');
  const toggleSaved = () => {
    const next = new URLSearchParams(params);
    if (savedOnly) next.delete('saved'); else next.set('saved', '1');
    setParams(next, { replace: true });
  };
  const skeletons = Math.min(8, Math.max(4, shown.length));

  return (
    <>
      <Seo title={plainTitle} description={lead} noindex={!!q} />
      <PageHeader
        title={title}
        lead={lead}
        crumbs={[{ label: t('home'), to: '/' }, ...(category || q ? [{ label: tr('shop'), to: '/shop' }, { label: plainTitle }] : [{ label: tr('shop') }])]}
      />

      {!category && !q && (
        <section aria-labelledby="browse" className="pb-8 md:pb-10">
          <div className="container">
            <h2 id="browse" className="sr-only">{tr('browse')}</h2>
            {/* Phones: a row you swipe (keeps the products near the top); 2 across from 640px, 4 from 1024px */}
            <Stagger as="ul" className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-4">
              {[...categories, ...shopViews].map(loc).map((c) => (
                <StaggerItem as="li" key={c.slug} className="w-[8.5rem] shrink-0 snap-start sm:w-auto">
                  <CategoryCard c={c} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <section aria-label={tr('shop')} className="bg-mist py-8 md:py-12">
        <div className="container">
          {(category === 'medicines' || base.some((p) => p.rx)) && <RxNotice light className="mb-8" />}

          <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
            <aside aria-labelledby="filter-heading" className="self-start rounded-panel bg-white p-5 shadow-card lg:sticky lg:top-28 lg:p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 id="filter-heading" className="m-0 flex items-center gap-2 font-body text-h3m">
                  <Icon name="filter" size={20} className="text-sage" /> {tr('filter')}
                  {activeCount > 0 && <span className="ml-2 rounded-full bg-green px-2 py-0.5 align-middle text-small font-bold text-white">{tr('active', { n: activeCount })}</span>}
                </h2>
                <button
                  type="button"
                  aria-expanded={showFilters}
                  aria-controls="filter-fields"
                  onClick={() => setShowFilters((s) => !s)}
                  className="inline-flex min-h-tap items-center gap-1.5 rounded-btn px-2 font-bold text-green hover:bg-mist lg:hidden"
                >
                  {showFilters ? tr('hideFilters') : tr('showFilters')}
                  <Icon name="chevronDown" size={18} className={`transition-transform duration-micro ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <div id="filter-fields" className={`${showFilters ? 'grid' : 'hidden'} mt-5 gap-4 sm:grid-cols-2 lg:grid lg:grid-cols-1`}>
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
                {activeCount > 0 && (
                  <Button variant="outline" block compact className="sm:col-span-2 lg:col-span-1" onClick={reset}>
                    <Icon name="close" size={16} /> {tr('clear')}
                  </Button>
                )}
              </div>
            </aside>

            <div className="min-w-0">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="m-0 text-body" aria-live="polite">
                    {loading ? <span className="text-grey">{tr('loading')}…</span> : !fail && <><strong className="text-green">{shown.length}</strong> {shown.length === 1 ? tr('item') : tr('items')}</>}
                  </p>
                  {(savedIds.length > 0 || savedOnly) && (
                    <button
                      type="button"
                      aria-pressed={savedOnly}
                      onClick={toggleSaved}
                      className={`inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border-2 px-4 text-base font-bold transition-colors duration-micro ${
                        savedOnly ? 'border-green bg-green text-white' : 'border-line bg-white text-green hover:border-green'
                      }`}
                    >
                      <Icon name="heart" size={16} filled className={savedOnly ? 'text-white' : 'text-terracotta-deep'} /> {tc('savedN', { n: savedIds.length })}
                    </button>
                  )}
                </div>
                <Field id="f-sort" label={tr('sortBy')} className="w-full sm:w-64">
                  <Select id="f-sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                    <option value="popular">{tr('popular')}</option>
                    <option value="price-low">{tr('priceLow')}</option>
                    <option value="price-high">{tr('priceHigh')}</option>
                    <option value="delivery">{tr('fastest')}</option>
                  </Select>
                </Field>
              </div>

              {loading ? (
                <ul aria-busy="true" aria-label={tr('loading')} className={grid}>
                  {Array.from({ length: skeletons }, (_, i) => <li key={i}><ProductCardSkeleton /></li>)}
                </ul>
              ) : fail ? (
                <Reveal>
                  <div role="alert" className="rounded-panel bg-white p-8 shadow-card md:p-10">
                    <span className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-cream text-terracotta-deep"><Icon name="warning" size={26} /></span>
                    <h3 className="font-head text-h2m">{tr('errorTitle')}</h3>
                    <p className="text-ink/80">{tr('errorText')}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button onClick={retry}><Icon name="refresh" size={18} /> {tr('retry')}</Button>
                      <Button href={SITE.phoneHref} variant="outline"><Icon name="phone" size={18} /> {tr('call', { phone: SITE.phone })}</Button>
                    </div>
                  </div>
                </Reveal>
              ) : shown.length ? (
                <ul key={gridKey} className={grid}>
                  {/* Each card fades in as it scrolls into view; cards in a row follow each other closely */}
                  {shown.map((p, i) => <Reveal as="li" key={p.id} delay={(i % 4) * 0.05} className="grid"><ProductCard product={p} alt={i % 2 === 1} /></Reveal>)}
                </ul>
              ) : (
                <Reveal>
                  <div className="rounded-panel bg-white p-8 shadow-card md:p-10">
                    <span className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-mist text-green"><Icon name="search" size={26} /></span>
                    <h3 className="font-head text-h2m">{tr('emptyTitle')}</h3>
                    <p className="text-ink/80">{tr('emptyText')}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {activeCount > 0 ? <Button onClick={reset}>{tr('clear')}</Button> : <Button to="/shop">{tr('allProducts')} <Icon name="arrow" size={18} /></Button>}
                      <Button href={SITE.phoneHref} variant="outline"><Icon name="phone" size={18} /> {tr('call', { phone: SITE.phone })}</Button>
                    </div>
                  </div>
                </Reveal>
              )}

              <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-panel border border-line bg-white p-6 md:p-8">
                <div>
                  <h2 className="mb-1 font-body text-h3m">{tr('findTitle')}</h2>
                  <p className="m-0 text-base text-grey">{tr('findText')}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button href={SITE.whatsappHref} external variant="outline" compact><Icon name="whatsapp" size={18} /> {t('whatsapp')}</Button>
                  <Button href={SITE.phoneHref} variant="urgent" compact><Icon name="phone" size={18} /> {tr('call', { phone: SITE.phone })}</Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <CartBar />
    </>
  );
}
