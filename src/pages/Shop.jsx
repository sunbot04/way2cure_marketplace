import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { categories, shopViews, products } from '../data/products.js';
import { PageHead, RxNotice } from '../components/ui.jsx';
import NotFound from './NotFound.jsx';

const priceBands = [
  { id: 'all', label: 'Any price', test: () => true },
  { id: 'u500', label: 'Under Rs. 500', test: (p) => p < 500 },
  { id: '500-2000', label: 'Rs. 500 to 2,000', test: (p) => p >= 500 && p <= 2000 },
  { id: 'o2000', label: 'Over Rs. 2,000', test: (p) => p > 2000 },
];

const sorters = {
  popular: (a, b) => b.popular - a.popular,
  'price-low': (a, b) => (a.price ?? a.rentPerMonth) - (b.price ?? b.rentPerMonth),
  'price-high': (a, b) => (b.price ?? b.rentPerMonth) - (a.price ?? a.rentPerMonth),
  delivery: (a, b) => a.deliveryHours - b.deliveryHours,
};

export default function Shop() {
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
    if (q) list = list.filter((p) => `${p.name} ${p.brand} ${p.desc} ${p.cat}`.toLowerCase().includes(q));
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

  const title = q ? `Results for "${params.get('q')}"` : view ? view.name : 'Shop';
  const reset = () => { setBrand('all'); setPrice('all'); setBuyRent('all'); setRx('all'); };

  return (
    <>
      <PageHead eyebrow="Shop" title={title}>
        <p>{view ? view.blurb : 'Medicines, devices, daily care and more. Delivered in Mumbai, Navi Mumbai and Thane.'}</p>
      </PageHead>

      <div className="container section-sm">
        {!category && !q && (
          <div className="grid grid-tiles shop-cats">
            {[...categories, ...shopViews].map((c) => (
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
          <aside className="filters card" aria-label="Filters">
            <h2 className="h3">Filter</h2>
            <label className="select-label">Brand
              <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="all">All brands</option>
                {brands.map((b) => <option key={b}>{b}</option>)}
              </select>
            </label>
            <label className="select-label">Price
              <select value={price} onChange={(e) => setPrice(e.target.value)}>
                {priceBands.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
              </select>
            </label>
            <label className="select-label">Buy or rent
              <select value={buyRent} onChange={(e) => setBuyRent(e.target.value)}>
                <option value="all">Buy or rent</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </label>
            <label className="select-label">Prescription
              <select value={rx} onChange={(e) => setRx(e.target.value)}>
                <option value="all">Rx and no Rx</option>
                <option value="rx">Rx needed</option>
                <option value="otc">No Rx needed</option>
              </select>
            </label>
            <button type="button" className="btn btn-outline btn-block" onClick={reset}>Clear filters</button>
          </aside>

          <div>
            <div className="shop-toolbar">
              <p aria-live="polite"><strong>{shown.length}</strong> {shown.length === 1 ? 'item' : 'items'}</p>
              <label className="select-label inline">Sort by
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="popular">Most popular</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="delivery">Fastest delivery</option>
                </select>
              </label>
            </div>
            {shown.length ? (
              <div className="grid grid-products">
                {shown.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="empty card">
                <h3>We could not find that.</h3>
                <p>Try a different word, or clear the filters. You can also call us and we will find it for you.</p>
                <button type="button" className="btn btn-primary" onClick={reset}>Clear filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
