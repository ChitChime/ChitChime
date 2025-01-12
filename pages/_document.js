import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Kodchasan:wght@400;700&display=optional"
          rel="stylesheet"
        />
        <style>
          {`
            @font-face {
              font-family: 'Kodchasan';
              src: url('/fonts/Kodchasan-Bold.ttf') format('truetype');
              font-weight: bold;
              font-style: normal;
            }
            @font-face {
              font-family: 'Kodchasan';
              src: url('/fonts/Kodchasan-BoldItalic.ttf') format('truetype');
              font-weight: bold;
              font-style: italic;
            }
            @font-face {
              font-family: 'Kodchasan';
              src: url('/fonts/Kodchasan-ExtraLight.ttf') format('truetype');
              font-weight: 200;
              font-style: normal;
            }
            @font-face {
              font-family: 'Kodchasan';
              src: url('/fonts/Kodchasan-ExtraLightItalic.ttf') format('truetype');
              font-weight: 200;
              font-style: italic;
            }
            @font-face {
              font-family: 'Kodchasan';
              src: url('/fonts/Kodchasan-Italic.ttf') format('truetype');
              font-weight: normal;
              font-style: italic;
            }
            @font-face {
              font-family: 'Kodchasan';
              src: url('/fonts/Kodchasan-Light.ttf') format('truetype');
              font-weight: 300;
              font-style: normal;
            }
            @font-face {
              font-family: 'Kodchasan';
              src: url('/fonts/Kodchasan-LightItalic.ttf') format('truetype');
              font-weight: 300;
              font-style: italic;
            }
            @font-face {
              font-family: 'Kodchasan';
              src: url('/fonts/Kodchasan-Medium.ttf') format('truetype');
              font-weight: 500;
              font-style: normal;
            }
            @font-face {
              font-family: 'Kodchasan';
              src: url('/fonts/Kodchasan-MediumItalic.ttf') format('truetype');
              font-weight: 500;
              font-style: italic;
            }
            @font-face {
              font-family: 'Kodchasan';
              src: url('/fonts/Kodchasan-Regular.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
            @font-face {
              font-family: 'Kodchasan';
              src: url('/fonts/Kodchasan-SemiBold.ttf') format('truetype');
              font-weight: 600;
              font-style: normal;
            }
            @font-face {
              font-family: 'Kodchasan';
              src: url('/fonts/Kodchasan-SemiBoldItalic.ttf') format('truetype');
              font-weight: 600;
              font-style: italic;
            }
          `}
        </style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
