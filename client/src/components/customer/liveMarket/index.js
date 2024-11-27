import React, { useCallback, useEffect, useState } from "react";
import { Card, Image } from "react-bootstrap";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { t } from "i18next";
import { baseUrl } from "../../../services/PostAPI";
import axios from "axios";

export default function Index() {
  const imageList = [
    {
      imageUrl: "https://5.imimg.com/data5/ME/GI/MY-65021751/all-type-of-farm-fresh-vegetables-500x500.jpg",
    },
    {
      imageUrl: "https://c1.wallpaperflare.com/preview/401/383/592/farmers-market-fresh-vegetable-ripe.jpg",
    },
    {
      imageUrl: "https://thumbs.dreamstime.com/b/vegetable-market-6333220.jpg",
    },
    {
      imageUrl: "https://previews.123rf.com/images/ewastudio/ewastudio1702/ewastudio170200662/73044956-farmers-market-vegetable-market-fresh-vegetables.jpg",
    },
    {
      imageUrl: "https://previews.123rf.com/images/ewastudio/ewastudio1702/ewastudio170200662/73044956-farmers-market-vegetable-market-fresh-vegetables.jpg",
    },
  ];
  const mockOffers = [
    {
      id: 1,
      vegetable: "Tomato",
      price: 2.5, // price in USD
    },
    {
      id: 2,
      vegetable: "Potato",
      price: 1.8, // price in USD
    },
    {
      id: 3,
      vegetable: "Cucumber",
      price: 1.2, // price in USD
    },
    {
      id: 4,
      vegetable: "Onion",
      price: 1.5, // price in USD
    },
    {
      id: 5,
      vegetable: "Carrot",
      price: 2.0, // price in USD
    },
    {
      id: 6,
      vegetable: "Spinach",
      price: 1.3, // price in USD
    },
    {
      id: 1,
      vegetable: "Tomato",
      price: 2.5, // price in USD
    },
    {
      id: 2,
      vegetable: "Potato",
      price: 1.8, // price in USD
    },
    {
      id: 3,
      vegetable: "Cucumber",
      price: 1.2, // price in USD
    },
    {
      id: 4,
      vegetable: "Onion",
      price: 1.5, // price in USD
    },
    {
      id: 5,
      vegetable: "Carrot",
      price: 2.0, // price in USD
    },
    {
      id: 6,
      vegetable: "Spinach",
      price: 1.3, // price in USD
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [markets, setMarkets] = useState([]);
  const [viewMarket, setViewMarket] = useState(false);
  const [offers, setOffers] = useState([]);
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    return imageList[randomIndex].imageUrl;
  };

  const getCurrentDay = () => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "saturday", "friday", "saturday"];
    const currentDayIndex = new Date().getDay();
    return days[currentDayIndex];
  };

  const [currentDay] = useState(getCurrentDay());

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      prev < Math.ceil(filteredMarkets.length / itemsPerPage) ? prev + 1 : prev
    );
  };
  const today = new Date();
  const formattedDate = today.toISOString();
  const viewOffers = async (market) => {

    setViewMarket(true);
    const params = {
      createdAt: formattedDate,
      location: market.name,
    };
    try {
      const response = await axios.get(`${baseUrl}/api/offers`, { params });
      setOffers(response.data.offers);
    } catch (error) {
      console.error("Error fetching offers:", error);

    }
  };


  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/markets`);
        setMarkets(response?.data?.markets);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMarketData();
  }, []);

  const filteredMarkets = Array.isArray(markets)
    ? markets.filter((market) => market.marketDay.toLowerCase() === currentDay.toLowerCase())
    : [];


  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredMarkets.slice(startIndex, startIndex + itemsPerPage);

  const updateItemsPerPage = useCallback(() => {
    const width = window.innerWidth;
    if (width < 600) {
      setItemsPerPage(1);
    } else if (width < 900) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(3);
    }
  }, []);

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, [updateItemsPerPage]);

  return (
    <>
      <div className="md:p-4 px-2 mb-2">
        <div className="flex align-items-center">
          <h2 className="mr-2 text-xl md:text-3xl">Live Markets</h2>
          <hr className="flex-1 p-2" />
        </div>

        <div>
          {filteredMarkets.length === 0 ? (
            <div className="p-5 text-center">
              <h2>No market today</h2>
            </div>
          ) : (
            <div className="w-full">
              <div className="grid w-full grid-nogutter gap-2 justify-content-start mb-3">
                {currentItems.map((item, index) => (
                  <div key={index}>
                    <Card className="shadow-3 mb-3 h-full p-5 border-round-3xl flex flex-column justify-content-between">
                      <div className="flex flex-column align-items-center justify-content-center">
                        <Image
                          src={getRandomImage()}
                          alt={item.alt}
                          width="250"
                          className="border-round-3xl"
                        />
                        <div className="m-2">{t(item.name)}</div>
                      </div>
                      <div className="flex align-items-center justify-content-center text-xs gap-2">
                        <Button className="border-round-3xl" label="View Offers" onClick={() => viewOffers(item)} />
                        <Button
                          className="border-round-3xl"
                          label="Get Direction"
                          onClick={() => window.open(item.location, "_blank")}
                        />
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
              <div className="flex align-items-center justify-content-center text-xs gap-2">
                <Button
                  className="border-round-3xl"
                  label="Previous"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                />
                <Button
                  className="border-round-3xl"
                  label="Next"
                  onClick={handleNextPage}
                  disabled={currentPage === Math.ceil(filteredMarkets.length / itemsPerPage)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog header="View Offers" visible={viewMarket} onHide={() => setViewMarket(false)}>

        <div className="p-2 grid grid-nogutter">
          {mockOffers.map((offer) => (
            <div key={offer.id} className="col-12 sm:col-6 md:col-4 p-2 mb-2 border-bottom">
              <div><strong>{offer.vegetable}</strong></div>
              <div>Price: ₹{offer.price}</div>
            </div>
          ))}
        </div>

      </Dialog>
    </>
  );
}
