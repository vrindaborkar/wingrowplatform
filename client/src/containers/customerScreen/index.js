import React from "react";
import CustomerComponent from "../../components/customer";
import { Container, Row, Col } from "react-bootstrap";

export default function CustomerScreen() {
  return (
    <>
     <div className=" w-full mt-2 border-0 text-center">
        <CustomerComponent />
      </div>
    </>
  );
}
