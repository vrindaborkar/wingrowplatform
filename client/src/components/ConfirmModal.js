import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "../styles/Test.css";
import Grid from "@mui/material/Grid";
import { ToastContainer, toast } from "react-toastify";
// Added
// import { Link } from "react-router-dom";
import { Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "70%",
  height: "90%",
  overflow: "hidden",
  bgcolor: "background.paper",
  // border: "2px solid #80BB65",
  borderRadius: 2,
  boxShadow: 24,
  p: 1.5,
};



export default function ConfirmModal({ confirmBooking,setCashOnDelivery,selected,status,t }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
    {/* 
      <div className="bookStall_btn">
      <Button onClick={handleOpen}>Pay</Button>
      
      <Button  onClick={() =>{handleOpen(); setCashOnDelivery(true)}} >Pay On Delivery</Button> */}

      {status === false && <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={6}>
              <div style={{ display: "flex", justifyContent: "center"}}>
            {selected === 0 ? (
              <Button onClick={() => toast.warn("Please select stalls!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })} style={{ width: "110px", height: "40px", paddingLeft: '5rem', paddingRight: '5rem', margin: '1rem', color: 'white', background: "linear-gradient(90deg, #07952b 41%, #0d6a02)", borderRadius: "20px", textAlign: "center", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              PAY</Button>
            ) : (

                <Button 
                onClick={handleOpen}
                style={{ width: "110px", height: "40px", paddingLeft:'5rem', paddingRight:'5rem', margin:'1rem', color: 'white', background: "linear-gradient(90deg, #07952b 41%, #0d6a02)", borderRadius: "20px", textAlign: "center", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                PAY
                </Button>
            )}

            {selected === 0 ? (
              <Button onClick={() => toast.warn("Please select stalls!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
              })} style={{ width: "110px", height: "40px", paddingLeft: '5rem', paddingRight: '5rem', margin: '1rem', color: 'white', background: "linear-gradient(90deg, #07952b 41%, #0d6a02)", borderRadius: "20px", textAlign: "center", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                PAY IN MARKET</Button>
            ) : (
                <Button 
                onClick={() =>{handleOpen(); setCashOnDelivery(true)}}
                style={{ width: "110px", height: "40px", paddingLeft:'5rem', paddingRight:'5rem', margin:'1rem', color: 'white', background: "linear-gradient(90deg, #07952b 41%, #0d6a02)", borderRadius: "20px", textAlign: "center", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                PAY IN MARKET
                </Button>
            )}
                </div>
              </Grid>  
              </Grid> }
          {status === true && 
            <Button 
                onClick={() =>{handleOpen(); setCashOnDelivery(true)}}
                style={{ width: "110px", height: "40px", paddingLeft:'5rem', paddingRight:'5rem', margin:'1rem', color: 'white', background: "linear-gradient(90deg, #07952b 41%, #0d6a02)", borderRadius: "20px", textAlign: "center", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                Go Ahead
                </Button>
          }

      {/* {selected === 0 ? console.log('error') : ( */}
       
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box className="box" sx={style}>
          
        
          <div className="terms_and_conditions">
            <button className="closebtn" onClick={handleClose}>           
               &times;
            </button>
            
            <h1>{t("Terms_of_service")}</h1>
            <br />
            <h2>{t("wingrow_farmers_market")}</h2>
            <h3 class="city">{t("role_of_wingrow_agritech")}</h3>
            <p>
              <li>
                {t("role_para_1")}
              </li>
              <br />
              <li>
                {t("role_para_2")}
              </li>
              <br />
              <li>
                {t("role_para_3")}
              </li>
              <br />
              <li>
                {t("role_para_4")}
              </li>
              <br />
            </p>
            <br />
            <h3 class="city">{t("personal_information")}</h3>
            <br />
            <p>
              {t("personal_info_para_1")}
            </p>
            <br />
            <h3 class="city">{t("account_and_registration_obligations")}</h3>
            <br />
            <p>
              {t("acc_and_registration_obligations_para")}
            </p>
            <br />
            <h3 class="city">{t("LICENSE_&_SITE_ACCESS")}</h3>
            <br />
            <p>
              {t("LICENSE_&_SITE_ACCESS_PARA")}
            </p>
            <br />
            <h3 class="city">{t("pricing")} </h3>
            <br />
            <p>
              {t("pricing_para")}
            </p>
            <br />
            <h3 class="city">{t("return_and_refunds")}</h3>
            <br />
            <p>
              {t("return_and_refunds_para")}
            </p>
            <br />
            <h3 class="city">{t("cancellation_of_booking")}</h3>
            <br />
            <p>
              <li>
                {t("cancellation_booking_para_1")}
              </li>
              <br />
              <li>
                {t("cancellation_booking_para_2")}
              </li>
            </p>
            <br />
            <h3 class="city">{t("PAYMENT_FOR_BOOKING_AND_ANY_ADDITIONAL_CHARGES")}</h3>
            <br />
            <h4>{t("FULL_PAYMENT")}</h4>
            <br />
            <p>
              {t("Full_payment_para")}
            </p>
            <br />
            <h4>{t("CANCELLATION_CHARGES")}</h4>
            <br />
            <p>
              {t("CANCELLATION_CHARGES_PARA")}
            </p>
            <br />
            <p>
              <table style={{ width: "100%" }}>
                <tr>
                  <th>{t("cancellation_charges_head_1")}</th>
                  <th>{t("cancellation_charges_head_2")}</th>
                </tr>
                <tr>
                  <td>{t("cancellation_data_1")}</td>
                  <td>{t("cancellation_data_2")}</td>
                </tr>
                <tr>
                  <td>{t("cancellation_data_3")}</td>
                  <td>{t("cancellation_data_4")}</td>
                </tr>
                <tr>
                  <td>{t("cancellation_data_5")}</td>
                  <td>{t("cancellation_data_6")}</td>
                </tr>
                <tr>
                  <td>{t("cancellation_data_7")}</td>
                  <td>{t("cancellation_data_8")}</td>
                </tr>
                <tr>
                  <td>
                    {t("cancellation_data_9")}
                  </td>
                  <td>{t("cancellation_data_10")}</td>
                </tr>
              </table>
            </p>
            <br />
            <h3 class="city">{t("YOU_AGREE_AND_CONFIRM")}</h3>
            <br />
            <p>
              <li>
                {t("confirm_para_1")}
              </li>
              <br />
              <li>
                {t("confirm_para_2")}
              </li>
              <br />
              <li>
                {t("confirm_para_3")}
              </li>
              <br />
              <li>
                {t("confirm_para_4")}
              </li>
            </p>
            <br />
            <h3 class="city">
              {t("not_use_for_these")}
            </h3>
            <br />
            <p>
              <li>
                {t("not_use_for_these_1")}
              </li>
              <li>
                {t("not_use_for_these_2")}
              </li>
              <li>{t("not_use_for_these_3")}</li>
              <li>
                {t("not_use_for_these_4")}
              </li>
              <li>{t("not_use_for_these_5")}</li>
              <li>
                {t("not_use_for_these_6")}
              </li>
              <li>
                {t("not_use_for_these_7")}
              </li>
            </p>
            <br />
            <h3 class="city">{t("modification_of_t_and_c")}</h3>
            <br />
            <p>
              {t("modification_t_and_c_1")}
            </p>
            <br />
            <h3 class="city">{t("COPYRIGHT_&_TRADEMARK")}</h3>
            <br />
            <p>
              {t("copyright_and_trademark_1")}
            </p>
            <br />
            <h3 class="city">{t("OBJECTIONABLE_MATERIAL")}</h3>
            <br />
            <p>
              {t("objectionable_material_1")}
            </p>
            <br />
            <h3 class="city">{t("INDEMNITY")} </h3>
            <br />
            <p>
              {t("indemnity_1")}
            </p>
            <br />
            <h3 class="city">{t("TERMINATION")}</h3>
            <br />
            <p>
              {t("termination_1")}
            </p>
            <br />
            <h3 class="city">{t("RESCHEDULING_OF_TICKET")}</h3>
            <br />
            <p>
              <li>
                {t("rescheduling_ticket_1")}
              </li>
              <li>
                {t("rescheduling_ticket_2")}
              </li>
              <li>
                {t("rescheduling_ticket_3")}
              </li>
              <li>
                {t("rescheduling_ticket_4")}
              </li>
              <li>
                {t("rescheduling_ticket_5")}
              </li>
            </p>
            <br />
            <h3 class="city">{t("responsibilities")}</h3>
            <br />
            <p>
              <li>
                {t("responsibilities_1")}
              </li>
              <li>
                {t("responsibilities_2")}
              </li>
              <li>
                {t("responsibilities_3")}
              </li>
              <li>
                {t("responsibilities_4")}
              </li>
              <li>
                {t("responsibilities_5")}
              </li>
            </p>
            <br />
            <h3 class="city">{t("MISCELLANEOUS")}</h3>
            <br />
            <p>
              <li>
                {t("MISCELLANEOUS_1")}
              </li>
              <li>
                {t("MISCELLANEOUS_2")}
              </li>
              <li>
                {t("MISCELLANEOUS_3")}
              </li>
              <li>
                {t("MISCELLANEOUS_4")}
              </li>
            </p>
            <br />
            <Divider className="divider" />
            <Button
              className="tnc_btn"
              onClick={() => {
                confirmBooking();
                handleClose();
              }}
            >
              {t("Confirm_Booking")}
            </Button>

            
          </div>
        </Box>
       
     
      </Modal>
      {/* )} */}
    </div>
  );
}
