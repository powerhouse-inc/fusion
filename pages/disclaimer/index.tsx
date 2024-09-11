import DisclaimerView from '@/views/Disclaimer/DisclaimerView';

const Disclaimer = () => <DisclaimerView />;

export async function getServerSideProps() {
  return { props: {} };
}

export default Disclaimer;
