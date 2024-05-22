import { FaStar } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import { ToastContainer, toast } from "react-toastify";

const colors = {
  orange: "#FFBA5A",
  green: "#3aa54b30",
};

function Feedback({t}) {
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(stars);
  const [feedback, setFeedback] = useState("");

  const [error, seterror] = useState("");

  /*const handleChange = (e) => {
    const { name, value } = e.target.value;
    setFeedback((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };*/

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleSubmit = (event) => {
    seterror("");
    event.preventDefault();
    //console.log(feedback);
    //const message = feedback;

    if (feedback.length === 0) {
      seterror("Please Provide Feedback");
    } else {
      seterror("no error");
      AuthService.feedback(feedback).then(() => {
        // Once posted, the user will be notified
        toast.success("Feedback Send", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },(error)=>{
        toast.warn("Feedback Not Send", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setFeedback("");
      });
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        color="success"
      />
      <ToastContainer />
      <p className="feedback-para">
        {t("feedback1")}
        <br /> {t("feedback2")}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="stars" style={styles.stars}>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                }}
                name="star"
                color={currentValue > index ? colors.orange : colors.green}
                onClick={() => handleClick(index + 1)}
              />
            );
          })}
        </div>
        <textarea
          name="feedback"
          value={feedback}
          //onChange={handleChange}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={t("feedback_placeholder")}
          style={styles.textarea}
        />

        <button style={styles.button}>{t("submit")}</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textarea: {
    border: "2px solid #a9a9a9",
    borderRadius: 15,
    width: 400,
    margin: "20px 0",
    minHeight: 200,
    padding: 10,
    display: "block",
    fontSize: 20,
  },
  button: {
    border: "none",
    borderRadius: 30,
    width: 100,
    height: 50,
    background: "linear-gradient(105.42deg, #3AA54B 33.61%, #107C55 80.31%)",
    color: "#fff",
    display: "block",
    margin: "auto",
    // padding: 10
  },
};

export default Feedback;
