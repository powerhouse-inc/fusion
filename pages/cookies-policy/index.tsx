import CookiesPolicyView from '@/views/CookiesPolicy/CookiesPolicyView';

const CookiesPolicy = () => <CookiesPolicyView />;

export async function getServerSideProps() {
  return { props: {} };
}

export default CookiesPolicy;
