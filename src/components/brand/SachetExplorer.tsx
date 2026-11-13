import Sachet from './Sachet';

// The morning sachet as a sample of what arrives (the time-of-day buttons were removed at the
// client's request). Kept as its own component so the pages that show it stay unchanged.
export default function SachetExplorer() {
  return (
    <div className="grid place-items-center">
      <Sachet slot="morning" />
    </div>
  );
}
