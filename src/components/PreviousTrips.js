import React from 'react';
import uuid from 'uuid';
import { Grid, Image, Segment, Loader, Accordion, Button } from 'semantic-ui-react'


export default function PreviousTrips(props) {
  let { previousTrips, modifyTrip, startTrip, removeTrip } = props;

  return (
    <div>
      {
        // currPage === 'Previous' && tripsData.length > 0 &&
        Object.keys(previousTrips).map((item) =>
          {
            console.log('TEST:', previousTrips[item].title);
            return (
              <div key={uuid()} className="userTripContainer">
                <Accordion className="userAccordion">
                  <Accordion.Title className="userTripsTitles">
                    <h4>{previousTrips[item].title}</h4>
                    <p>{previousTrips[item].description}</p>
                    <h5>{previousTrips[item].tags}</h5>
                  </Accordion.Title>
                  <Accordion.Content>

                    <Button onClick={() => startTrip('previous', item)} color="green" size="huge" className="startBtn">
                      <Button.Content>Start</Button.Content>
                    </Button>

                    <Button onClick={() => modifyTrip('previous', item)} color="blue" size="huge" className="modifyBtn">
                      <Button.Content>Modify</Button.Content>
                    </Button>

                    <Button onClick={() => removeTrip('previous', item)} color="red" size="huge" className="removeBtn">
                      <Button.Content>Remove</Button.Content>
                    </Button>

                  </Accordion.Content>
                </Accordion>
              </div>
            );
          })
      }
    </div>
  )
}
