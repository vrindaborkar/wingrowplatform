// import React, { useMemo, useState } from "react";
// import MzCalendar from "../../common/MzForm/MzCalendar";
// import { Calendar } from "primereact/calendar";
// import { FORM_FIELDS_NAME } from "./constant";
// import { useForm } from "react-hook-form";
// import { GREEN_STALL } from "../../assets/images";
// import stallList from "./data.json";

// const StallComponent = (props) => {
//   const {
//     fetchStallList,
//     isPageLevelError,
//     isLoading,
//     userRole,
//     handleOnReadRecord,
//     handleOnDeleteRecord,
//     handleOnEditRecord,
//     handleOnCreatedRecord,
//     formFieldValueMap,
//   } = props.stallProps;
//   const [date, setDate] = useState(null);
//   const {
//     control,
//     formState: { errors },
//     watch,
//     handleSubmit,
//     reset,
//     setValue,
//   } = useForm({
//     defaultValues: useMemo(() => {
//       return formFieldValueMap;
//     }, [formFieldValueMap]),
//     mode: "onChange",
//     reValidateMode: "onChange",
//   });
//   const getFormErrorMessage = (name) => {
//     return (
//       errors[name] && <small className="p-error">{errors[name].message}</small>
//     );
//   };
//   const dat = new Date();

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <>

//       <div className="flex w-full bg-white flex-column align-items-center justify-content-center border-round mt-3 p-2 md:p-0">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="mt-2 w-full px-4 md:mt-5"
//         >
//           {" "}
//           <div className="flex justify-content-end">
//             <MzCalendar
//               control={control}
//               name={FORM_FIELDS_NAME.B_DATE.name}
//               label={FORM_FIELDS_NAME.B_DATE.label}
//               placeholder={FORM_FIELDS_NAME.B_DATE.placeholder}
//               rules={FORM_FIELDS_NAME.B_DATE.rules}
//               isError={errors[FORM_FIELDS_NAME.B_DATE.name]}
//               errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.B_DATE.name)}
//               showButtonBar={true}
//               minDate={dat}
//               disabledDays={[0, 2, 3, 4, 5, 6]}
//             />
//           </div>
//           <div className="card">
//             <div className="market-layout p-grid">
//               {stallList.map((stall, index) => (
//                 <div key={index} className="p-col-12 p-md-6 p-lg-4 p-xl-3">
//                   <div className="p-card p-shadow-2">
//                     <div className="p-card-header">
//                       <div dangerouslySetInnerHTML={{ __html: GREEN_STALL }} />
//                     </div>
//                     <div className="p-card-body">
//                       <h5>{stall.stallName}</h5>
//                       <p>Stall No: {stall.stallNo}</p>
//                       <p>Price Range: {stall.stallPrice}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default StallComponent;

// import React, { useMemo, useState } from "react";
// import MzCalendar from "../../common/MzForm/MzCalendar";
// import { useForm } from "react-hook-form";
// import { FORM_FIELDS_NAME } from "./constant";

// import stallList from "./data.json";

// const stallPositions = [
//   [false, false, true, false, true, false, false],
//   [false, true, false, false, false, true, false],
//   [false, false, false, true, false, false, false],
//   [true, false, true, false, true, false, true],
//   [true, false, true, false, true, false, true],
//   [true, false, true, false, true, false, true],
//   [true, false, true, false, true, false, true],
//   [true, false, true, false, true, false, true],
//   [false, false, false, true, false, false, false],
//   [false, true, false, false, false, true, false],
//   [false, false, true, false, true, false, false],
// ];

// const StallComponent = (props) => {
//   const {
//     fetchStallList,
//     isPageLevelError,
//     isLoading,
//     userRole,
//     handleOnReadRecord,
//     handleOnDeleteRecord,
//     handleOnEditRecord,
//     handleOnCreatedRecord,
//     formFieldValueMap,
//   } = props.stallProps;

//   const [selectedStalls, setSelectedStalls] = useState([]);
//   const [date, setDate] = useState(null);

//   const {
//     control,
//     formState: { errors },
//     watch,
//     handleSubmit,
//     reset,
//     setValue,
//   } = useForm({
//     defaultValues: useMemo(() => {
//       return formFieldValueMap;
//     }, [formFieldValueMap]),
//     mode: "onChange",
//     reValidateMode: "onChange",
//   });

//   const getFormErrorMessage = (name) => {
//     return (
//       errors[name] && <small className="p-error">{errors[name].message}</small>
//     );
//   };

//   const dat = new Date();

//   const onSubmit = (data) => {
//     console.log("Selected Stalls:", selectedStalls);
//     console.log("Form Data:", data);
//   };
//   const handleStallClick = (row, col) => {
//     const stallId = `${row}-${col}`;
//     let newSelectedStalls = [...selectedStalls];

//     if (newSelectedStalls.includes(stallId)) {

//       newSelectedStalls = newSelectedStalls.filter((s) => s !== stallId);
//     } else {

//       if (newSelectedStalls.length >= 3) {

//         newSelectedStalls.shift();
//       }
//       newSelectedStalls.push(stallId);
//     }

//     setSelectedStalls(newSelectedStalls);
//   };

//   const getStallClass = (row, col) => {
//     const stallId = `${row}-${col}`;

//     if (selectedStalls.includes(stallId)) return "selected";
//     return "available";
//   };

//   return (
//     <div className="stall-container">
//       <div className="summary">
//         <span>
//           Total stalls: {stallPositions.flat().filter(Boolean).length}
//         </span>
//         <span>
//           Available stalls:{" "}
//           {
//             stallPositions
//               .flat()
//               .filter(
//                 (isStall, index) => isStall && !selectedStalls.includes(index)
//               ).length
//           }
//         </span>
//       </div>
//       <form onSubmit={handleSubmit(onSubmit)} className="stall-form">
//         <div className="calendar-section">
//           <MzCalendar
//             control={control}
//             name={FORM_FIELDS_NAME.B_DATE.name}
//             label={FORM_FIELDS_NAME.B_DATE.label}
//             placeholder={FORM_FIELDS_NAME.B_DATE.placeholder}
//             rules={FORM_FIELDS_NAME.B_DATE.rules}
//             isError={errors[FORM_FIELDS_NAME.B_DATE.name]}
//             errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.B_DATE.name)}
//             showButtonBar={true}
//             minDate={dat}
//             disabledDays={[0, 2, 3, 4, 5, 6]}
//           />
//         </div>
//         <div className="market-layout">
//           {stallPositions.map((row, rowIndex) =>
//             row.map((isStall, colIndex) => (
//               <div
//                 key={`${rowIndex}-${colIndex}`}
//                 className={`stall  ${
//                   isStall ? getStallClass(rowIndex, colIndex) : ""
//                 }`}
//                 onClick={() => isStall && handleStallClick(rowIndex, colIndex)}
//               >
//                 {isStall && (
//                   <div className="stall-content">

//                     <div>{`${rowIndex+colIndex + 1}`}</div>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//         <div className="total-amount">
//           <span>Total Amount</span>
//           <span>Rs. xxx/-</span>
//         </div>
//         <div className="pay-button-container">
//           <button type="submit" className="pay-button">
//             Pay
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default StallComponent;
import React, { useMemo, useState } from "react";
import MzCalendar from "../../common/MzForm/MzCalendar";
import { useForm } from "react-hook-form";
import { FORM_FIELDS_NAME } from "./constant";
import { Tooltip } from "primereact/tooltip";

import {
  ANTIQUE_STALL,
  DRY_FRUITS_STALL,
  FLOWER_STALL,
  FRUITS_STALL,
  GENERAL_STALL,
  KOBI_STALL,
  LEAFY_STALL,
  MUKHVAS_STALL,
  ONION_STALL,
  RED_STALL,
  SANACK_STALL,
  SPICE_STALL,
  TARKARI_STALL,
} from "../../assets/images";
import { Button } from "primereact/button";
// import stallList from "./data.json";

const stallPositions = [
  [false, false, true, false, true, false, false],
  [false, true, false, false, false, true, false],
  [true, false, false, true, false, false, true],
  [true, false, true, false, true, false, true],
  [true, false, true, false, true, false, true],
  [true, false, true, false, true, false, true],
  [true, false, true, false, true, false, true],
  [true, false, true, false, true, false, true],
  [true, false, false, true, false, false, true],
  [false, true, false, false, false, true, false],
  [false, false, true, false, true, false, false],
];

const StallComponent = (props) => {
  const {
    fetchStallList,
    isPageLevelError,
    isLoading,
    userRole,
    handleOnReadRecord,
    handleOnDeleteRecord,
    handleOnEditRecord,
    handleOnCreatedRecord,
    formFieldValueMap,
    stallList,
  } = props.stallProps;

  const [selectedStalls, setSelectedStalls] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [date, setDate] = useState(null);

  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: useMemo(() => {
      return formFieldValueMap;
    }, [formFieldValueMap]),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const dat = new Date();

  const onSubmit = (data) => {
    console.log("Selected Stalls:", selectedStalls);
    console.log("Form Data:", data);
  };
  const handleStallClick = (row, col) => {
    const stallId = `${row}-${col}`;
    let newSelectedStalls = [...selectedStalls];
    const stall = stallDataMap.get(stallId);

    if (newSelectedStalls.includes(stallId)) {
      newSelectedStalls = newSelectedStalls.filter((s) => s !== stallId);
      setTotalPrice((prevPrice) => prevPrice - stall.stallPrice);
    } else {
      if (newSelectedStalls.length >= 3) {
        const removedStallId = newSelectedStalls.shift();
        const removedStall = stallDataMap.get(removedStallId);
        setTotalPrice((prevPrice) => prevPrice - removedStall.stallPrice);
      }
      newSelectedStalls.push(stallId);
      setTotalPrice((prevPrice) => prevPrice + stall.stallPrice);
    }

    setSelectedStalls(newSelectedStalls);
  };
  // const handleStallClick = (row, col) => {
  //   const stallId = `${row}-${col}`;
  //   let newSelectedStalls = [...selectedStalls];

  //   if (newSelectedStalls.includes(stallId)) {
  //     newSelectedStalls = newSelectedStalls.filter((s) => s !== stallId);
  //   } else {
  //     if (newSelectedStalls.length >= 3) {
  //       newSelectedStalls.shift();
  //     }
  //     newSelectedStalls.push(stallId);
  //   }

  //   setSelectedStalls(newSelectedStalls);
  // };

  const getStallClass = (row, col) => {
    const stallId = `${row}-${col}`;

    if (selectedStalls.includes(stallId)) return "selected";
    return "available";
  };

  // Create a list of active positions
  const activePositions = [];
  stallPositions.forEach((row, rowIndex) =>
    row.forEach((isStall, colIndex) => {
      if (isStall) {
        activePositions.push({ row: rowIndex, col: colIndex });
      }
    })
  );

  const stallDataMap = new Map(
    activePositions.map((position, index) => [
      `${position.row}-${position.col}`,
      stallList[index],
    ])
  );
  const stallImageMap = {
    Masale: SPICE_STALL,
    Antic: ANTIQUE_STALL,
    Fruits: FRUITS_STALL,
    "Flower-Kobi": KOBI_STALL,
    Tarkari: TARKARI_STALL,
    "Onion-Potato": ONION_STALL,
    Exotic: ANTIQUE_STALL,
    Leafy: LEAFY_STALL,
    Snacks: SANACK_STALL,
    Flowers: FLOWER_STALL,
    Dryfruits: DRY_FRUITS_STALL,
    Mukhvas: MUKHVAS_STALL,
  };
  return (
    <div className="stall-container">
      <form onSubmit={handleSubmit(onSubmit)} className="stall-form">
        <div className="calendar-section">
          <MzCalendar
            control={control}
            name={FORM_FIELDS_NAME.B_DATE.name}
            label={FORM_FIELDS_NAME.B_DATE.label}
            placeholder={FORM_FIELDS_NAME.B_DATE.placeholder}
            rules={FORM_FIELDS_NAME.B_DATE.rules}
            isError={errors[FORM_FIELDS_NAME.B_DATE.name]}
            errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.B_DATE.name)}
            showButtonBar={true}
            minDate={dat}
            disabledDays={[0, 2, 3, 4, 5, 6]}
          />
        </div>
        <div className="border-green-200 border-1 p-2">
          <div className="summary">
            <span>Total stalls: {stallList.length}</span>
            <span>
              Available stalls:{" "}
              {stallPositions.flat().filter((isStall) => isStall).length -
                selectedStalls.length}
            </span>
          </div>
          <hr />
          
          <div className="bg-black flex justify-content-between py-2 mb-3 text-white text-center ">
            <div className="p-2"></div>
            Main Road 
            <div className="p-2"></div> 
          </div>
          <div className="market-layout">
            {stallPositions.map((row, rowIndex) =>
              row.map((isStall, colIndex) => {
                const stallId = `${rowIndex}-${colIndex}`;
                const stall = stallDataMap.get(stallId);

                return (
                  <div
                    key={stallId}
                    className={`stall ${
                      isStall ? getStallClass(rowIndex, colIndex) : ""
                    }`}
                    onClick={() =>
                      isStall && handleStallClick(rowIndex, colIndex)
                    }
                    data-pr-tooltip={stall ? stall.stallName : ""}
                    
                    style={{ fontSize: "1rem", cursor: "pointer" }}
                  >
                    <div className="md:flex justify-content-between align-items-center">
                      {isStall && stall && (
                        <>
                          <img
                            src={
                              stallImageMap[stall.stallName] || GENERAL_STALL
                            }
                            alt={stall.stallName}
                            className="stall-image w-8 md:w-4"
                          />
                          {/* <div>{stall.stallName}</div> */}
                          <div className="text-xs md:text-base">
                            {stall.stallPrice}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <hr />
          <div className="total-amount">
            <span>Total Amount</span>
            <span>
              {" "}
              {totalPrice} <i className="pi pi-indian-rupee" />
              /-{" "}
            </span>
          </div>
          <hr />
          <div className="flex justify-content-end ">
          <Button
              type="submit"
              label="Pay"
              className="border-2 te border-round-md md:w-10rem"
            ></Button>
            <Button
              type="submit"
              severity="danger"
              label="Pay in market "
              className="border-2 te  border-round-md md:w-10rem ml-2"
            ></Button>
          </div>
        </div>
      </form>
      <Tooltip target=".stall" mouse className="text-green-400" />
    </div>
  );
};

export default StallComponent;
