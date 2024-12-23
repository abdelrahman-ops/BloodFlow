// assets.js

// Importing all the front-end assets
import inventoryImage from './img/inventory.jpg';
import supportImage from './img/support.jpg';
import doctorsImage from './img/doctors.jpg';
import donorImage from './img/donor.jpg';
import hero from './img/hero.jpg';
import accident from './img/accident.png';
import child from './img/child.jpg';
import surgery1 from './img/surgery.png';
import surgery2 from './img/surgery.jpeg';
import support1 from './img/support1.jpg';
import hdonor from './img/Hdonor.jpg';
import unit from './img/bloodunit.jpg';


import arrow1Image from './icons/fromarrow.png';
import arrow2Image from './icons/toarrow.png';

import blood from './icons/blood.png';
import logo from './icons/logoF.png';
import logo1 from './icons/logo1.png';
import logo2 from './icons/logo2.png';
import logo3 from './icons/logo3.png';
import logo4 from './icons/lh.png';
import profile_icon from './icons/profile_icon.png';
import account from './icons/account.png'
import menu from './icons/menu.png'
import close from './icons/close.png'
import menu2 from './icons/menu.svg';
import profile from './icons/profile.svg';
import body from './img/body.png'
import emailUnread from './icons/emailUnread.svg'
import bb from './icons/body.svg'

// Exporting an object containing all assets
const assets = {
    images: {
        inventory: inventoryImage,
        support: supportImage,
        doctors: doctorsImage,
        donor: donorImage,
        hero: hero,
        accident: accident,
        child: child,
        surgery1: surgery1,
        surgery2: surgery2,
        support1: support1,
        hdonor:hdonor,
        unit: unit,
        body: body,
        
    },
    arrows: {
        down: arrow1Image,
        top: arrow2Image,
    },
    icons:{
        blood: blood,
        logo: logo,
        logo1: logo1,
        logo2: logo2,
        logo3: logo3,
        logo4: logo4,
        profile_icon:profile_icon,
        account:account,
        menu:menu,
        close: close,
        menu2:menu2,
        profile:profile,
        emailUnread: emailUnread,
        bb:bb,
    }
};

export default assets;
