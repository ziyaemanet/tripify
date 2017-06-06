import React from 'react';
import uuid from 'uuid';
import { Grid, Image, Segment, Loader, Accordion, Button } from 'semantic-ui-react'


export default function SavedTrips(props) {
  let { savedTrips, modifyTrip, startTrip, removeTrip } = props;
  return (
    <div>
      {
        // currPage === 'Saved' && tripsData !== undefined &&
        Object.keys(savedTrips || {}).map((item) =>
          {
            console.log('TEST:', savedTrips[item].title);
            return (
              <div key={uuid()} className="userTripContainer">
                <Accordion className="userAccordion">
                  <Accordion.Title className="userTripsTitles">
                    <h4>{savedTrips[item].title}</h4>
                    <p>{savedTrips[item].description}</p>
                    <h5>{savedTrips[item].tags}</h5>
                  </Accordion.Title>
                  <Accordion.Content>

                    <Button onClick={() => startTrip('saved', item)} color="green" size="huge" className="startBtn">
                      <Button.Content>Start</Button.Content>
                    </Button>

                    <Button onClick={() => modifyTrip('saved', item)} color="blue" size="huge" className="modifyBtn">
                      <Button.Content>Modify</Button.Content>
                    </Button>

                    <Button onClick={() => removeTrip('saved', item)} color="red" size="huge" className="removeBtn">
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
