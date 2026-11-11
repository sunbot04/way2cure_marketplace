import { Link } from 'react-router-dom';
import { SITE } from '../config/site.js';

export default function NotFound() {
  return (
    <div className="container section">
      <div className="empty card">
        <h1 className="h2">We could not find that page.</h1>
        <p>It may have moved. Go back home, or call <a href={SITE.phoneHref}>{SITE.phone}</a> and we will help.</p>
        <div className="btn-row">
          <Link to="/" className="btn btn-primary">Go to home</Link>
          <Link to="/shop" className="btn btn-outline">Shop</Link>
        </div>
      </div>
    </div>
  );
}
