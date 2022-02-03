import Head from "next/head";

function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }

      html {
        font-size: 62.5%
      }
      body {
        font-family: "Open Sans", sans-serif;
        
      }
      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */
    `}</style>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
          <title>QUICK CHAT</title>
        </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
