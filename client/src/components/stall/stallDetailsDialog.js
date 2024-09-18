import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const StallDetailsDialog = ({ modalStalls, showDetails, setShowDetails }) => {
  return (
    <Dialog
      header="Selected Stalls Details"
      visible={showDetails}
      style={{ width: '50vw', maxHeight: '80vh', overflowY: 'auto' }}
      onHide={() => setShowDetails(false)}
      footer={
        <Button
          label="Close"
          icon="pi pi-times"
          onClick={() => setShowDetails(false)}
        />
      }
    >
      <div className="selected-stalls-details">
        {Object.keys(modalStalls).map((marketName) => (
          <div key={marketName}>
            <h3>Market Name: {marketName}</h3>
            {Object.keys(modalStalls[marketName]).map((date) => (
              <div key={date}>
                <h4>Date: {date}</h4>
                {modalStalls[marketName][date] && (
                  <ul style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    {modalStalls[marketName][date].map((stall) => (
                      <li key={stall.id}>
                        <div>
                          <strong>Stall ID:</strong> {stall.id}
                        </div>
                        <div>
                          <strong>Stall Name:</strong> {stall.name}
                        </div>
                        <div>
                          <strong>Stall Price:</strong> {stall.price}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Dialog>
  );
};

export default StallDetailsDialog;