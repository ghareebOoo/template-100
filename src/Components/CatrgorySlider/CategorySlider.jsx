import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "../Loading/Loading";

export default function CategorySlider() {
  const [category, setCategory] = useState(null);

  async function getSlider() {
    const options = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/categories",
    };
    let { data } = await axios.request(options);
    setCategory(data.data);
  }

  useEffect(() => {
    getSlider();
  }, []);

  return (
    <>
      {category ? (
        <div className="container mx-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            Shop Popular Categories
          </h2>
          <Swiper
            loop={true}
            autoplay={true}
            spaceBetween={10}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 6 },
            }}
          >
            {category.map((ca) => (
              <SwiperSlide key={ca._id}>
                <div>
                  <img
                    className="w-full h-56 md:h-48 lg:h-32 object-contain"
                    src={ca.image}
                    alt={ca.name}
                  />
                  <h3 className="text-center text-sm md:text-lg ">
                    {ca.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
