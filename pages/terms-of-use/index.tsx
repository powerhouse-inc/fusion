import TermsOfUseView from '@/views/TermsOfUse/TermsOfUseView';

const TermsOfUse = () => <TermsOfUseView />;

export async function getServerSideProps() {
  return { props: {} };
}

export default TermsOfUse;
