import "@shopify/polaris/dist/styles.css";
import './../styles/globals.css'
import { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import { StoreProvider } from './../mst/setup';
import './../components/taskList/style.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </Layout>
  )
}

export default MyApp
