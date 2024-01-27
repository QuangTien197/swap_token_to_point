import "../styles/globals.css";
import { Toaster } from "react-hot-toast"
import { SessionProvider } from "next-auth/react"
//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";
const MyApp = ({ Component,
  pageProps: { session, ...pageProps }
}) => (
  <div>

    <NFTMarketplaceProvider>
      <SessionProvider session={session}>
        <NavBar />
        <Toaster className="toast" position="bottom-left" />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </NFTMarketplaceProvider>


  </div>
);

export default MyApp;
