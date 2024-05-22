import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "../styles/Farmer.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "60%",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ViewOffers({ handleOpen, handleClose, open, t, languages }) {
  return (
    <div style={{ textAlign: "center", backgroundColor: "white" }}>
      <button className="btn" onClick={handleOpen}>
        {t("View_Offers")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="offers_modal_component">
            <div className="offer-box">
              <p>{t("commodity")} {t("Tomato")}</p>
              <div className="quan-rate">
                <h6>
                  {t("Quantity")} <span>50kg</span>
                </h6>
                <h6>
                  {t("Rate")} <span>45Rs/kg</span>
                </h6>
              </div>
            </div>
            <div className="offer-box">
              <p>{t("commodity")} {t("Tomato")}</p>
              <div className="quan-rate">
                <h6>
                  {t("Quantity")} <span>50kg</span>
                </h6>
                <h6>
                  {t("Rate")} <span>45Rs/kg</span>
                </h6>
              </div>
            </div>
            <div className="offer-box">
              <p>{t("commodity")} {t("Tomato")}</p>
              <div className="quan-rate">
                <h6>
                  {t("Quantity")} <span>50kg</span>
                </h6>
                <h6>
                  {t("Rate")} <span>45Rs/kg</span>
                </h6>
              </div>
            </div>
            <div className="offer-box">
              <p>{t("commodity")} {t("Tomato")}</p>
              <div className="quan-rate">
                <h6>
                  {t("Quantity")} <span>50kg</span>
                </h6>
                <h6>
                  {t("Rate")} <span>45Rs/kg</span>
                </h6>
              </div>
            </div>
            <div className="offer-box">
              <p>{t("commodity")} {t("Tomato")}</p>
              <div className="quan-rate">
                <h6>
                  {t("Quantity")} <span>50kg</span>
                </h6>
                <h6>
                  {t("Rate")} <span>45Rs/kg</span>
                </h6>
              </div>
            </div>
            <div className="offer-box">
              <p>{t("commodity")} {t("Tomato")}</p>
              <div className="quan-rate">
                <h6>
                  {t("Quantity")} <span>50kg</span>
                </h6>
                <h6>
                  {t("Rate")} <span>45Rs/kg</span>
                </h6>
              </div>
            </div>
            <div className="offer-box">
              <p>{t("commodity")} {t("Tomato")}</p>
              <div className="quan-rate">
                <h6>
                  {t("Quantity")} <span>50kg</span>
                </h6>
                <h6>
                  {t("Rate")} <span>45Rs/kg</span>
                </h6>
              </div>
            </div>
            <div className="offer-box">
              <p>{t("commodity")} {t("Tomato")}</p>
              <div className="quan-rate">
                <h6>
                  {t("Quantity")} <span>50kg</span>
                </h6>
                <h6>
                  {t("Rate")} <span>45Rs/kg</span>
                </h6>
              </div>
            </div>
            <div className="offer-box">
              <p>{("commodity")} {t("Tomato")}</p>
              <div className="quan-rate">
                <h6>
                  {t("Quantity")} <span>50kg</span>
                </h6>
                <h6>
                  {t("Rate")} <span>45Rs/kg</span>
                </h6>
              </div>
            </div>
            <div className="offer-box">
              <p>{t("commodity")} {t("Tomato")}</p>
              <div className="quan-rate">
                <h6>
                  {t("Quantity")} <span>50kg</span>
                </h6>
                <h6>
                  {t("Rate")} <span>45Rs/kg</span>
                </h6>
              </div>
            </div>
            <div className="offer-box">
              <p>{t("commodity")} {t("Tomato")}</p>
              <div className="quan-rate">
                <h6>
                  {t("Quantity")} <span>50kg</span>
                </h6>
                <h6>
                  {t("Rate")} <span>45Rs/kg</span>
                </h6>
              </div>
            </div>
            <div className="offer-box">
              <p>{t("commodity")} {t("Tomato")}</p>
              <div className="quan-rate">
                <h6>
                  {t("Quantity")} <span>50kg</span>
                </h6>
                <h6>
                  {t("Rate")} <span>45Rs/kg</span>
                </h6>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}