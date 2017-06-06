import React, { Component } from 'react';
import UploadImage from './UploadImage';

/*
HOLLEEEEEHHHHHH Im passing this job on to you.
The user needs to be able to upload images to a trip.
The images that are uploaded will be saved into the trip and saved in an array.

1. When a user FIRST creates a trip, they should be able to add images.
These images are saved in the trip object. Keep in mind that when the user
clicks on "Save as New" button, that trip that was just created will be saved
inside of the Saved Trips object. If the user clicks on the "Start Trip" button
that trip will be saved in the current trips object.

2. Users should be able to DELETE IMAGES. Dont worry about the styling! Just add
the button when mapping through the images.

Thanks holy! If you have any questions slack me or text me or w.e!~

*/

export default class GalleryModal extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className="modal fade bs-example-modal-md" id="galleryModal" tabIndex='-1' role='dialog' aria-labelledby='mySmallModalLabel'>
        <div className='modal-dialog modal-md secondLevelModal' role='document'>
          <div className='modal-content thirdLevelModal'>
            <div className='fourthLevelModal' >
              <h2>Upload Image</h2>
              {
                // When the user clicks the upload image button the user should be able to
                // UPLOAD a file from THEIR COMPUTER.
              }
              <UploadImage />
              <h2>Gallery</h2>
              {
                // Don't worry about styling for now. Map through the array of images
                // here to render all of the images. We'll style it after we get the
                // funcionality down.
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
