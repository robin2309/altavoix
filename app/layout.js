import Head from 'next/head';

import Header from '@/components/Header/Header';

import './styles/globals.css'

export const metadata = {
  title: 'Altavoix',
  description: "Suivez l'activité des députés à l'Assemblée Nationale",
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
        </head>
        <body>
          <Header />
          {children}
        </body>
      </html>
  )
}
