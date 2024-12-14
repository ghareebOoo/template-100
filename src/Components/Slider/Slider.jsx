import slide1 from "../../assets/images/slider-image-1.jpeg"
import slide2 from "../../assets/images/slider-image-2.jpeg"
import slide3 from "../../assets/images/slider-image-3.jpeg"

export default function Slider() {
  return (
    <>
    <div className="grid grid-cols-12 pb-7 mt-3">
        <div className="col-span-12 md:col-span-8">
            <swiper-container style={{height : "100%"}} loop={true}>
                <swiper-slide style={{height : "100%"}}>
                    <img className="w-full h-full object-cover" src={slide1} alt=""/>
                </swiper-slide>
                <swiper-slide style={{height : "100%"}}>
                    <img className="w-full h-full object-cover" src={slide2} alt=""/>
                </swiper-slide>
                <swiper-slide style={{height : "100%"}}>
                    <img className="w-full h-full object-cover" src={slide3} alt=""/>
                </swiper-slide>
            </swiper-container>
        </div>
        <div className="col-span-12 md:col-span-4">
            <div className="h-1/2">
                <img className="w-full h-full object-cover" src={slide2} alt=""/>
            </div>
            <div className="h-1/2">
                <img className="w-full h-full object-cover" src={slide1} alt=""/>
            </div>
        </div>
    </div>
    </>
  )
}
