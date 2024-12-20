import Header from '@/components/Header/Header';

import './styles/globals.css'

export const metadata = {
  title: 'Altavoix',
  description: "Suivez l'activité des députés à l'Assemblée Nationale",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
