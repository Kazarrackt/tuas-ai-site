import { pageContent } from './page-content';
import SiteInteractions from './site-interactions';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
      <SiteInteractions />
    </>
  );
}
