// assets.js

// Importing all the front-end assets
import inventoryImage from './img/inventory.jpg';
import supportImage from './img/support.jpg';
import doctorsImage from './img/doctors.jpg';
import donorImage from './img/donor.jpg';
import hero from './img/hero.jpg';

import arrow1Image from './icons/fromarrow.png';
import arrow2Image from './icons/toarrow.png';

import blood from './icons/blood.png';

// Exporting an object containing all assets
const assets = {
    images: {
        inventory: inventoryImage,
        support: supportImage,
        doctors: doctorsImage,
        donor: donorImage,
        hero: hero,
    },
    arrows: {
        down: arrow1Image,
        top: arrow2Image,
    },
    icons:{
        blood: blood,
    }
};

export default assets;
