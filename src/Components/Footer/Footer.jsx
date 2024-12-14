import amozonPayLogo from "../../assets/images/amazon-pay.png"
import americanExpressLogo from "../../assets/images/American-Express-Color.png"
import mastercardLogo from "../../assets/images/mastercard.webp"
import paypallLogo from "../../assets/images/paypal.png"
import googlePlay from "../../assets/images/get-google-play.png"
import appStore from "../../assets/images/get-apple-store.png"

function Footer() {
  return (
    <>
    <footer className="bg-slate-100 p-5 ">
      <div className="container">
        <h2 className="text-2xl font-bold pt-4">Get The FreshCart App</h2>
        <p className="mt-1">We will send you a link, Open it in your phone to download App</p>
        <form className="flex flex-col md:flex-row items-center gap-5 mt-5">
          <input className="form-control w-full md:w-auto md:flex-grow" type="enail" placeholder="Email..." />
          <button className="btn uppercase w-full md:w-auto">share app link</button>
        </form>
        <div className="flex flex-col md:flex-row items-center py-5">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <h3>Payment Partners</h3>
            <div className="flex items-center gap-5 ">
              <div>
              <img className="w-20" src={amozonPayLogo} alt="" />
              <img className="w-20" src={americanExpressLogo} alt="" />
              </div>
              <div>
              <img className="w-20" src={mastercardLogo} alt="" />
              <img className="w-20" src={paypallLogo} alt="" />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:ml-auto gap-3 ">
            <h3>Get Deliveries With Freshcart</h3>
            <div className="flex  flex-col gap-3">
              <img className="w-24" src={googlePlay} alt="" />
              <img className="w-24" src={appStore} alt="" />
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer