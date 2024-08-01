import React, { useCallback, useEffect, useState } from "react";
import { Card,Image  } from "react-bootstrap";
import { Button } from "primereact/button";
import { t } from "i18next";

export default function Index() {
  const imageList = [
    {
      day: "tuesday",
      name: "karveNagar",
      location: "https://goo.gl/maps/5sETcJGzXWoXC5SG9",
      address: "karveNagarLocation",
      time: "3PM - 9PM",
      imageUrl:
        "https://previews.123rf.com/images/ewastudio/ewastudio1702/ewastudio170200662/73044956-farmers-market-vegetable-market-fresh-vegetables.jpg",
    },
    {
      day: "tuesday",
      name: "godrejPrana",
      location: "https://maps.app.goo.gl/hWAwbDk3smxX7wfn9?g_st=iw",
      address: "godrejPranaLocation",
      time: "3PM - 9PM",
      imageUrl: "https://thumbs.dreamstime.com/b/vegetable-market-6333220.jpg",
    },
    {
      day: "tuesday",
      name: "wadgaonSheri",
      location: "https://maps.app.goo.gl/hWAwbDk3smxX7wfn9?g_st=iw",
      address: "wadgaonSheriLocation",
      time: "3PM - 9PM",
      imageUrl:
        "https://c1.wallpaperflare.com/preview/401/383/592/farmers-market-fresh-vegetable-ripe.jpg",
    },
    {
      day: "wednesday",
      name: "hadapsar",
      location: "https://maps.app.goo.gl/bh7wNdiyVWcvy15p9?g_st=iw",
      address: "hadapsarLocation",
      time: "3PM - 9PM",
      imageUrl:
        "https://5.imimg.com/data5/ME/GI/MY-65021751/all-type-of-farm-fresh-vegetables-500x500.jpg",
    },
    {
      day: "wednesday",
      name: "undri",
      location: "https://goo.gl/maps/GWympTKEp5Jqj8EB7",
      address: "undriLocation",
      time: "3PM - 9PM",
      imageUrl:
        "https://previews.123rf.com/images/ewastudio/ewastudio1702/ewastudio170200662/73044956-farmers-market-vegetable-market-fresh-vegetables.jpg",
    },
    {
      day: "thursday",
      name: "kharadi",
      location: "https://maps.app.goo.gl/hWAwbDk3smxX7wfn9?g_st=iw",
      address: "kharadiLocation",
      time: "3PM - 9PM",
      imageUrl: "https://thumbs.dreamstime.com/b/vegetable-market-6333220.jpg",
    },
    {
      day: "thursday",
      name: "nottingHill",
      location: "https://maps.app.goo.gl/hWAwbDk3smxX7wfn9?g_st=iw",
      address: "nottingHillLocation",
      time: "3PM - 9PM",
      imageUrl:
        "https://c1.wallpaperflare.com/preview/401/383/592/farmers-market-fresh-vegetable-ripe.jpg",
    },
    {
      day: "friday",
      name: "wagholi",
      location: "https://maps.app.goo.gl/hWAwbDk3smxX7wfn9?g_st=iw",
      address: "dabhadeChowkwagholiLocation",
      time: "3PM - 9PM",
      imageUrl:
        "https://5.imimg.com/data5/ME/GI/MY-65021751/all-type-of-farm-fresh-vegetables-500x500.jpg",
    },
    {
      day: "friday",
      name: "wadgaonSheri",
      location: "https://maps.app.goo.gl/hWAwbDk3smxX7wfn9?g_st=iw",
      address: "vadgoanSheriLocation",
      time: "3PM - 9PM",
      imageUrl:
        "https://previews.123rf.com/images/ewastudio/ewastudio1702/ewastudio170200662/73044956-farmers-market-vegetable-market-fresh-vegetables.jpg",
    },
    {
      day: "saturday",
      name: "adityaNandanvan",
      location: "https://maps.app.goo.gl/hWAwbDk3smxX7wfn9?g_st=iw",
      address: "adityaNandanvanLocation",
      time: "3PM - 9PM",
      imageUrl:
        "https://previews.123rf.com/images/ewastudio/ewastudio1702/ewastudio170200662/73044956-farmers-market-vegetable-market-fresh-vegetables.jpg",
    },
    {
      day: "saturday",
      name: "wadachiWadi",
      location: "https://maps.app.goo.gl/hWAwbDk3smxX7wfn9?g_st=iw",
      address: "wadachiWadiLocation",
      time: "3PM - 9PM",
      imageUrl:
        "https://previews.123rf.com/images/ewastudio/ewastudio1702/ewastudio170200662/73044956-farmers-market-vegetable-market-fresh-vegetables.jpg",
    },
    {
      day: "saturday",
      name: "wagholi",
      location: "https://maps.app.goo.gl/hWAwbDk3smxX7wfn9?g_st=iw",
      address: "dabhadeChowkwagholiLocation",
      time: "3PM - 9PM",
      imageUrl:
        "https://previews.123rf.com/images/ewastudio/ewastudio1702/ewastudio170200662/73044956-farmers-market-vegetable-market-fresh-vegetables.jpg",
    },
    {
      day: "sunday",
      name: "magarpatta",
      location: "https://maps.app.goo.gl/hWAwbDk3smxX7wfn9?g_st=iw",
      address: "magarpattaLocation",
      time: "7AM - 1PM",
      imageUrl:
        "https://previews.123rf.com/images/ewastudio/ewastudio1702/ewastudio170200662/73044956-farmers-market-vegetable-market-fresh-vegetables.jpg",
    },
    {
      day: "sunday",
      name: "sadeSatraNali",
      location: "https://maps.app.goo.gl/hWAwbDk3smxX7wfn9?g_st=iw",
      address: "sadeSatraNaliLocation",
      time: "3PM - 9PM",
      imageUrl: "https://thumbs.dreamstime.com/b/vegetable-market-6333220.jpg",
    },
    {
      day: "sunday",
      name: "ivyEstateWagholi",
      location: "https://maps.app.goo.gl/hWAwbDk3smxX7wfn9?g_st=iw",
      address: "ivyEstateWagholiLocation",
      time: "3PM - 9PM",
      imageUrl:
        "https://c1.wallpaperflare.com/preview/401/383/592/farmers-market-fresh-vegetable-ripe.jpg",
    },
    {
      day: "sunday",
      name: "nottingHill",
      location: "https://maps.app.goo.gl/hWAwbDk3smxX7wfn9?g_st=iw",
      address: "nottingHillLocation",
      time: "3PM - 9PM",
      imageUrl:
        "https://5.imimg.com/data5/ME/GI/MY-65021751/all-type-of-farm-fresh-vegetables-500x500.jpg",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const getCurrentDay = () => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "saturday",
      "friday",
      "saturday",
    ];
    const currentDayIndex = new Date().getDay();
    return days[currentDayIndex];
  };

  const [currentDay] = useState(getCurrentDay());

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      prev < Math.ceil(filteredItems.length / itemsPerPage) ? prev + 1 : prev
    );
  };

  const filteredItems = imageList.filter((item) => item.day === currentDay);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const updateItemsPerPage = useCallback(() => {
    const width = window.innerWidth;
    if (width < 600) {
      setItemsPerPage(1);
    } else if (width < 900) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(4);
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
          {filteredItems.length === 0 ? (
            <div>
              <div className="p-5 text-center">
                <h2>No market today</h2>
              </div>
            </div>
          ) : (
          
            <div className="w-full">
              <div className="grid w-full grid-nogutter gap-2 justify-content-center mb-3">
                {currentItems.map((item, index) => (
                  <div key={index} className="">
                    <Card className="shadow-3 mb-3 h-full p-5 border-round-3xl flex flex-column  justify-content-between">
                      <div className="flex flex-column align-items-center justify-content-center">
                        <Image
                          src={item.imageUrl}
                          alt={item.alt}
                          width="250"
                          className="border-round-3xl"
                        />
                        <div className="m-2">{t(item.name)}</div>
                      </div>
                      <div className="flex align-items-center justify-content-center text-xs gap-2">
                        <Button
                          className="border-round-3xl"
                          label="View Offers"
                        />
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
                  className="border-round-3xl "
                  label="Next"
                  onClick={handleNextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredItems.length / itemsPerPage)
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
