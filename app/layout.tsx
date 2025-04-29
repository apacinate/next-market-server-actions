// app/layout.tsx
import React, { ReactNode } from "react"
import Header from "./components/header"
import Footer from "./components/footer"

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
