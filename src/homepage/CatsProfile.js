import React from 'react';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import './CatsProfile.css';
import MonProfile from '../album/ourcats/profile/mon0.png';
import XiuProfile from '../album/ourcats/profile/xiu0.png';
import XamProfile from '../album/ourcats/profile/xam0.png';
import QuytProfile from '../album/ourcats/profile/quyt0.png';
import BapProfile from '../album/ourcats/profile/bap0.png';
import BaoProfile from '../album/ourcats/profile/bao0.png';
import SuaProfile from '../album/ourcats/profile/sua0.png';
import SoiProfile from '../album/ourcats/profile/soi0.png';
import TaoProfile from '../album/ourcats/profile/tao0.png';
import BunProfile from '../album/ourcats/profile/bun0.png';
import CaoProfile from '../album/ourcats/profile/cao0.png';
import TomProfile from '../album/ourcats/profile/tom0.png';
import PheProfile from '../album/ourcats/profile/phe0.png';
import NauProfile from '../album/ourcats/profile/nau0.png';
import XoiProfile from '../album/ourcats/profile/xoi0.png';
import HoProfile from '../album/ourcats/profile/ho0.png';
import ChonProfile from '../album/ourcats/profile/chon0.png';
import BeeProfile from '../album/ourcats/profile/bee0.png';
import ThonProfile from '../album/ourcats/profile/thon0.png';
import BimProfile from '../album/ourcats/profile/bim0.png';
import BoProfile from '../album/ourcats/profile/bo0.png';
import GauProfile from '../album/ourcats/profile/gau0.png';
import TitProfile from '../album/ourcats/profile/tit0.png';
import TepProfile from '../album/ourcats/profile/tep0.png';
import GungProfile from '../album/ourcats/profile/gung0.png';
import BongProfile from '../album/ourcats/profile/bong0.png';
import BongsProfile from '../album/ourcats/profile/bongs0.png';
import BowProfile from '../album/ourcats/profile/bow0.png';
import ComProfile from '../album/ourcats/profile/com0.png';
import MeProfile from '../album/ourcats/profile/me0.png';
import SocProfile from '../album/ourcats/profile/soc0.png';
import DauProfile from '../album/ourcats/profile/dau0.png';
import TamProfile from '../album/ourcats/profile/tam0.png';
import CamProfile from '../album/ourcats/profile/cam0.png';

const CatInfo = ({ profile, gender, name, speice, DOB }) => {

    const GenderIcon = () => {
        switch(gender) {
          case 'male':
            return <MaleIcon style={{ color: 'navy', transform: 'scale(1.6)'}} />;
          case 'female':
            return <FemaleIcon style={{ color: 'pink', transform: 'scale(1.6)' }} />;
          default:
            return null;
        }
      };
    return (
        <div className='cat-info'>
            <img className="cat-pics" src={profile} alt={`${name} profile`} />
            <h1 className="cat-names">{name}</h1>
            <div className="cat-genders"><GenderIcon gender={gender} /></div>
            <p className="cat-speices">{speice}</p>
            <p className="cat-DOBs">{DOB}</p>
        </div>
    );
};

function CatsProfile() {
  return (
    <div className='cats-profiles'>
        <CatInfo profile={MonProfile} gender="male" name="Mon" speice="Ragdoll" DOB="Born Dec 19, 2020"  />
        <CatInfo profile={XiuProfile} gender="male" name="Xíu (Little)" speice="Sphynx" DOB="Born Mar 16, 2022"  />
        <CatInfo profile={XamProfile} gender="male" name="Xám (Grey)" speice="British Shorthair" DOB="Born Jun 7, 2020" />
        <CatInfo profile={QuytProfile} gender="female" name="Quýt (Tangerine)" speice="Kinkalow" DOB="Born Aug 16, 2022" />
        <CatInfo profile={BapProfile} gender="female" name="Bắp (Corny)" speice="Munchkin" DOB="Born Aug 1, 2021"  />
        <CatInfo profile={SuaProfile} gender="female" name="Sữa (Milk)" speice="Munchkin" DOB="Born Dec 27, 2021" />
        <CatInfo profile={SoiProfile} gender="male" name="Sói (Wolf)" speice="Maine Coon" DOB="Born Jul 27, 2022" />
        <CatInfo profile={TaoProfile} gender="female" name="Táo (Apple)" speice="British Shorthair" DOB="Born Jun 7, 2020"  />
        <CatInfo profile={BunProfile} gender="male" name="Bun" speice="Bambino" DOB="Born Mar 3, 2023"  />        
        <CatInfo profile={HoProfile} gender="male" name="Hổ (Tiger)" speice="Toyger" DOB="Born Jul 4, 2023" />
        <CatInfo profile={BaoProfile} gender="male" name="Báo (Cheetah)" speice="Snow Bengal" DOB="Born Oct 5, 2021" />
        <CatInfo profile={CaoProfile} gender="female" name="Cáo (Fox)" speice="Somali" DOB="Born Dec 23, 2022" />
        <CatInfo profile={ChonProfile} gender="male" name="Chồn (Raccoon)" speice="Somali" DOB="Born Dec 23, 2022" />
        <CatInfo profile={BeeProfile} gender="male" name="Bee (Bumblebee)" speice="Somali" DOB="Born Dec 24, 2019" />
        <CatInfo profile={TomProfile} gender="female" name="Tôm (Shrimp)" speice="British Shorthair" DOB="Born Jan 16, 2023" />
        <CatInfo profile={PheProfile} gender="female" name="Phê (Coffee)" speice="British Shorthair" DOB="Born Dec 27, 2021" />
        <CatInfo profile={NauProfile} gender="male" name="Nâu (Brown)" speice="Himalayan" DOB="Born May 9, 2022" />
        <CatInfo profile={XoiProfile} gender="male" name="Xôi (Sticky Rice)" speice="Maine Coon" DOB="Born Feb 8, 2022" />
        <CatInfo profile={ThonProfile} gender="male" name="Thộn (Goofy)" speice="British Longhair" DOB="Born Aug 18, 2018" />
        <CatInfo profile={BimProfile} gender="male" name="Bim" speice="British Shorthair" DOB="Born Aug 1, 2021" />
        <CatInfo profile={BoProfile} gender="female" name="Bo" speice="Munchkin" DOB="Born Dec 27, 2021" />
        <CatInfo profile={GauProfile} gender="female" name="Gấu (Bear)" speice="Munchkin" DOB="Born Dec 24, 2021" />
        <CatInfo profile={TitProfile} gender="female" name="Tít (Sleepy)" speice="Persian" DOB="Born Jan 28, 2022" />
        <CatInfo profile={TepProfile} gender="female" name="Tép (Baby Shrimp)" speice="Munchkin" DOB="Born Jan 16, 2023" />
        <CatInfo profile={GungProfile} gender="male" name="Gừng (Ginger)" speice="Abyssinian" DOB="Born Feb 28, 2023" />
        <CatInfo profile={BongProfile} gender="female" name="Bông (Cotton)" speice="Kinkalow" DOB="Born Feb 2, 2023" />
        <CatInfo profile={BongsProfile} gender="female" name="Bống (Goby)" speice="Shorthair Oriental" DOB="Born Sep 1, 2022" />
        <CatInfo profile={BowProfile} gender="female" name="Bơ (Butter)" speice="Golden" DOB="Born April 4, 2023" />
        <CatInfo profile={ComProfile} gender="male" name="Cơm (Rice)" speice="American Curl" DOB="Born May 19, 2023" />
        <CatInfo profile={MeProfile} gender="male" name="Mè (Sesame)" speice="British Longhair" DOB="Born May 6, 2023" />
        <CatInfo profile={MeProfile} gender="male" name="Mè (Sesame)" speice="British Longhair" DOB="Born May 6, 2023" />
        <CatInfo profile={SocProfile} gender="female" name="Sóc (Squirrel)" speice="Toyger" DOB="Born May 6, 2023" />
        <CatInfo profile={DauProfile} gender="male" name="Đậu (Bean)" speice="Brown Bengal" DOB="Born April 18, 2023" />
        <CatInfo profile={TamProfile} gender="female" name="Tấm (Grain)" speice="Calico" DOB="Born March 15, 2023" />
        <CatInfo profile={CamProfile} gender="female" name="Cám (Bran)" speice="Calico" DOB="Born March 15, 2023" />
    </div>
)}
export default CatsProfile
