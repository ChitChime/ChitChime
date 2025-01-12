export const metadata = {
  title: 'ChitChime',
  description: 'Welcome to ChitChime!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Remove custom font link */}
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Kodchasan:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        /> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
