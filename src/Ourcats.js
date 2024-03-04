import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import CatsDetail from './CatsDetail';
import './Ourcats.css';
import CatsBanner from './ourcats.jpeg';
import MonProfile from './album/ourcats/profile/mon0.png';
import XiuProfile from './album/ourcats/profile/xiu0.png';
import XamProfile from './album/ourcats/profile/xam0.png';
import QuytProfile from './album/ourcats/profile/quyt0.png';
import BapProfile from './album/ourcats/profile/bap0.png';
import BaoProfile from './album/ourcats/profile/bao0.png';
import SuaProfile from './album/ourcats/profile/sua0.png';
import SoiProfile from './album/ourcats/profile/soi0.png';
import TaoProfile from './album/ourcats/profile/tao0.png';
import BunProfile from './album/ourcats/profile/bun0.png';
import CaoProfile from './album/ourcats/profile/cao0.png';
import TomProfile from './album/ourcats/profile/tom0.png';
import PheProfile from './album/ourcats/profile/phe0.png';
import NauProfile from './album/ourcats/profile/nau0.png';
import XoiProfile from './album/ourcats/profile/xoi0.png';
import HoProfile from './album/ourcats/profile/ho0.png';
import ChonProfile from './album/ourcats/profile/chon0.png';
import BeeProfile from './album/ourcats/profile/bee0.png';
import ThonProfile from './album/ourcats/profile/thon0.png';
import BimProfile from './album/ourcats/profile/bim0.png';
import BoProfile from './album/ourcats/profile/bo0.png';
import GauProfile from './album/ourcats/profile/gau0.png';
import TitProfile from './album/ourcats/profile/tit0.png';
import TepProfile from './album/ourcats/profile/tep0.png';
import GungProfile from './album/ourcats/profile/gung0.png';

const importImage = async (folderName, imageId) => {
  try {
    const image = await import(`./album/ourcats/${folderName}/${imageId}.png`);
    return image.default;
  } catch (error) {
    console.error(`Failed to load image: ${folderName}/${imageId}`, error);
    return null;
  }
};

const catsInfo = [
  { name: 'Mon', fullname: 'Mon', profile: MonProfile, gender: 'male', species: 'Ragdoll', DOB: 'Born Dec 19, 2020', imageIds: ['mon1', 'mon2', 'mon3', 'mon4', 'mon5', 'mon6', 'mon7'] },
  { name: 'Xiu', fullname: 'Xíu (Little)', profile: XiuProfile, gender: 'male', species: 'Sphynx', DOB: 'Born Mar 16, 2022', imageIds: ['xiu1', 'xiu2', 'xiu3', 'xiu4', 'xiu5', 'xiu6', 'xiu7', 'xiu8', 'xiu9', 'xiu10', 'xiu11'] },
  { name: 'Xam', fullname: 'Xám (Grey)',profile: XamProfile, gender: 'male', species: 'British Shorthair', DOB: 'Born Jun 7, 2020', imageIds: ['xam1', 'xam2', 'xam3', 'xam4', 'xam5', 'xam6', 'xam7','xam8'] },
  { name: 'Quyt', fullname: 'Quýt (Tangerine)', profile: QuytProfile, gender: 'female', species: 'Kinkalow', DOB: 'Born Aug 16, 2022', imageIds: ['quyt1', 'quyt2', 'quyt3', 'quyt4', 'quyt5', 'quyt6', 'quyt7'] },
  { name: 'Bap', fullname: 'Bắp (Corny)', profile: BapProfile, gender: 'female', species: 'Munchkin', DOB: 'Born Aug 1, 2021', imageIds: ['bap1', 'bap2', 'bap3', 'bap4', 'bap5', 'bap6', 'bap7', 'bap8', 'bap9', 'bap10', 'bap11','bap12'] },
  { name: 'Ho', fullname: 'Hổ (Tiger)', profile: HoProfile, gender: 'male', species: 'Toyger', DOB: 'Born Jul 4, 2023', imageIds: ['ho1', 'ho2'] },
  { name: 'Bao', fullname: 'Báo (Cheetah)', profile: BaoProfile, gender: 'male', species: 'Snow Bengal', DOB: 'Born Oct 5, 2021', imageIds: ['bao1', 'bao2', 'bao3', 'bao4', 'bao5'] },
  { name: 'Cao', fullname: 'Cáo (Fox)', profile: CaoProfile, gender: 'female', species: 'Somali', DOB: 'Born Dec 23, 2022', imageIds: ['cao1', 'cao2'] },
  { name: 'Chon', fullname: 'Chồn (Raccoon)', profile: ChonProfile, gender: 'male', species: 'Somali', DOB: 'Born Dec 23, 2022', imageIds: ['chon1'] },
  { name: 'Bee', fullname: 'Bee (Bumblebee)', profile: BeeProfile, gender: 'male', species: 'Somali', DOB: 'Born Dec 24, 2019', imageIds: ['bee1', 'bee2','bee3','bee4','bee5'] }, 
  { name: 'Sua', fullname: 'Sữa (Milk)', profile: SuaProfile, gender: 'female', species: 'Munchkin', DOB: 'Born Dec 27, 2021', imageIds: ['sua1', 'sua2', 'sua3', 'sua4', 'sua5', 'sua6', 'sua7', 'sua8', 'sua9', 'sua10','sua11','sua12','sua13'] },
  { name: 'Soi', fullname: 'Sói (Wolf)', profile: SoiProfile, gender: 'male', species: 'Maine Coon', DOB: 'Born Jul 27, 2022', imageIds: ['soi1', 'soi2', 'soi3', 'soi4', 'soi5', 'soi6', 'soi7', 'soi8', 'soi9', 'soi10', 'soi11', 'soi12'] },
  { name: 'Tao', fullname: 'Táo (Apple)', profile: TaoProfile, gender: 'female', species: 'British Shorthair', DOB: 'Born Jun 7, 2020', imageIds: ['tao1', 'tao2', 'tao3'] },
  { name: 'Bun', fullname: 'Bun', profile: BunProfile, gender: 'male', species: 'Bambino', DOB: 'Born Mar 3, 2023', imageIds: ['bun1', 'bun2'] },
  { name: 'Tom', fullname: 'Tôm (Shrimp)', profile: TomProfile, gender: 'female', species: 'British Shorthair', DOB: 'Born Jan 16, 2023', imageIds: ['tom1', 'tom2', 'tom3', 'tom4', 'tom5','tom6','tom7'] },
  { name: 'Phe', fullname: 'Phê (Coffee)', profile: PheProfile, gender: 'female', species: 'British Shorthair', DOB: 'Born Dec 27, 2021', imageIds: ['phe1', 'phe2', 'phe3', 'phe4'] },
  { name: 'Nau', fullname: 'Nâu (Brown)', profile: NauProfile, gender: 'male', species: 'Himalayan', DOB: 'Born May 9, 2022', imageIds: ['nau1', 'nau2', 'nau3', 'nau4', 'nau5','nau6'] },
  { name: 'Xoi', fullname: 'Xôi (Sticky Rice)', profile: XoiProfile, gender: 'male', species: 'Maine Coon', DOB: 'Born Feb 8, 2022', imageIds: ['xoi1', 'xoi2','xoi3'] },
  { name: 'Thon', fullname: 'Thộn (Goofy)', profile: ThonProfile, gender: 'male', species: 'British Longhair', DOB: 'Born Aug 18, 2018', imageIds: ['thon1', 'thon2','thon3','thon4','thon5','thon6','thon7','thon8'] },
  { name: 'Bim', fullname: 'Bim', profile: BimProfile, gender: 'male', species: 'British Shorthair', DOB: 'Born Aug 1, 2021', imageIds: ['bim1', 'bim2','bim3','bim4','bim5'] },
  { name: 'Bo', fullname: 'Bo', profile: BoProfile, gender: 'female', species: 'Munchkin', DOB: 'Born Dec 27, 2021', imageIds: ['bo1'] },
  { name: 'Gau', fullname: 'Gấu (Bear)', profile: GauProfile, gender: 'female', species: 'Munchkin', DOB: 'Born Dec 24, 2021', imageIds: ['gau1', 'gau2'] },
  { name: 'Tit', fullname: 'Tít (Sleepy)', profile: TitProfile, gender: 'female', species: 'Persian', DOB: 'Born Jan 28, 2022', imageIds: ['tit1', 'tit2','tit3'] },
  { name: 'Tep', fullname: 'Tép (Baby Shrimp)', profile: TepProfile, gender: 'female', species: 'Munchkin', DOB: 'Born Jan 16, 2023', imageIds: ['tep1', 'tep2'] },
  { name: 'Gung', fullname: 'Gừng (Ginger)', profile: GungProfile, gender: 'male', species: 'Abyssinian', DOB: 'Born Feb 28, 2023', imageIds: ['gung1'] },
  { name: 'Bong', fullname: 'Bông (Cotton)', profile: GungProfile, gender: 'female', species: 'Kinkalow', DOB: 'Born Feb 2, 2023', imageIds: ['bong1','bong2','bong3','bong4','bong5','bong6','bong7','bong8','bong9'] },
  { name: 'Bongs', fullname: 'Bống (Goby)', profile: GungProfile, gender: 'female', species: 'Shorthair Oriental', DOB: 'Born Sep 1, 2022', imageIds: ['bongs1','bongs2','bongs3','bongs4'] },

]

function Ourcats() {
  const { t } = useTranslation();
  const [catImages, setCatImages] = useState({});

  useEffect(() => {
    catsInfo.forEach(cat => {
      const loadImages = async () => {
        const images = await Promise.all(cat.imageIds.map(id => importImage(cat.name.toLowerCase(), id)));
        setCatImages(prevImages => ({ ...prevImages, [cat.name]: images.filter(Boolean) }));
      };
      loadImages();
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="banner-container">
        <img className='ourcats-banner' src={CatsBanner} alt='cats-banner' />
        <div className='slogan-container'>
          <h1>{t('menuOptions.ourCats')}</h1>
        </div>
      </div>
      {catsInfo.map(cat => (
        <CatsDetail 
          key={cat.name}
          profile={cat.profile}
          gender={cat.gender}
          name={cat.fullname}
          species={cat.species}
          DOB={cat.DOB}
          images={catImages[cat.name] || []}
        />
      ))}
      <Footer />

    </div>
  );
}

export default Ourcats;

