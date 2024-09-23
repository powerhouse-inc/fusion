import Document, { Html, Head } from 'next/document';

interface Props {
  isAnalyticsActive: boolean;
}

export default class MyDocument extends Document<Props> {
  render() {
    return (
      <Html>
        <Head>
          <meta http-equiv="refresh" content="0; url=https://fsusion.sky.money" />
        </Head>
        <body />
      </Html>
    );
  }
}
