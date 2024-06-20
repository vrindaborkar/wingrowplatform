import React, { useState } from "react";
import { Rating } from "primereact/rating";
import { Col, Container, Row } from 'react-bootstrap'
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

export default function FeedbackComponent() {
    const [value, setValue] = useState(null);
    const [NotesValue, setNotesValue] = useState('');
    return (
        <>
            <Container>
                <h1>Feedback</h1>
                <hr />
                <Row className="flex-column">
                    <Col className="">
                        <div className="flex justify-content-center ">
                            <Rating value={value} onChange={(e) => setValue(e.value)} cancel={false} className="border border-green-500 p-3 border-round-3xl" />
                        </div>
                    </Col>
                    <Col>
                        <div className="card flex justify-content-center">
                            <InputTextarea autoResize value={NotesValue} onChange={(e) => setNotesValue(e.target.value)} rows={5} cols={30} />
                        </div>
                    </Col>
                    <div className="flex justify-content-center text-xs ">
                        <Button className='border-round-3xl' label="submit" />
                    </div>
                </Row>
            </Container>
        </>
    )
}
