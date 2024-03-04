import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './StoreInfo.css';

const BasicInfo = ({ title, description }) => {
  return (
    <div className="basic-info">
      <p className="info-title">{title}</p>
      <p className="info-description">{description}</p>
    </div>
  );
};

function StoreInfo() {
  const { t } = useTranslation(); 

  const iframeCode = `<iframe width="100%" height="400" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?q=place_id:Eks4IEhvYSBUcsOgLCBQaMaw4budbmcgNywgUGjDuiBOaHXhuq1uLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0iMBIuChQKEgkPxXsCzyh1MRErI-rB-gjFwBAIKhQKEgnLMnoCzyh1MREjRlCpsIkyEA&key=AIzaSyCKv1bxzW-8s1fbtZ8BeU_Q8RizRyJVcik"></iframe>`;

  return (
    <div className="store-info">
      <div className='map-container'>
        <div className='store-map' dangerouslySetInnerHTML={{ __html: iframeCode }} />
      </div>
      <div className='store-basic'>
        <BasicInfo title={t('addressTitle')} description={t('addressDescription')} />
        <BasicInfo title={t('phoneNumberTitle')} description={t('phoneNumberDescription')} />
        <BasicInfo title={t('businessHoursTitle')} description={t('businessHoursDescription')} />
        <BasicInfo title={t('priceTitle')} description={t('priceDescription')} />
        <BasicInfo title={t('amenitiesTitle')} description={t('amenitiesDescription')} />
      </div>
    </div>
  );
}

export default StoreInfo;


// import React, { useMemo } from 'react';
// import './StoreInfo.css';

// const BasicInfo = ({ title, description }) => {
//   return (
//     <div className="basic-info">
//       <p className="info-title">{title}</p>
//       <p className="info-description">{description}</p>
//     </div>
//   );
// };

// function StoreInfo() {

//   const iframeCode = `<iframe width="100%" height="400" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?q=place_id:Eks4IEhvYSBUcsOgLCBQaMaw4budbmcgNywgUGjDuiBOaHXhuq1uLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0iMBIuChQKEgkPxXsCzyh1MRErI-rB-gjFwBAIKhQKEgnLMnoCzyh1MREjRlCpsIkyEA&key=AIzaSyCKv1bxzW-8s1fbtZ8BeU_Q8RizRyJVcik"></iframe>`;

//   return (
//     <div className="store-info">
//           <div className='map-container'>
//           <h1>Store Information</h1>
//           <div className='store-map' dangerouslySetInnerHTML={{ __html: iframeCode }} />
//           </div>
//           <div className='store-basic'>
//           <BasicInfo title='Address' description={<>4th Floor, 8 Hoa Tra Street, Ward 7, Phu Nhuan Dist, HCMC</>}/>
//           <BasicInfo title='Phone Number' description='0961898942' />
//           <BasicInfo title='Business Hours'description={<>9:30 AM to 9:30 PM. Open all year-round.<br />No reservation required, please feel free to just walk-in.</>}/>
//           <BasicInfo title='Price' description={<>89,000 VND, VAT already included.<br />Unlimited playtime. Free Food & Beverage. Free parking.<br />No reservation required, please feel free to just walk-in.</>}/>
//           <BasicInfo title='Amenities' description={<>Diverse selection of board games for group bonding.<br />Charging station at each table for workspace.</>}/>

//           </div>
//     </div>
//   );
// }

// export default StoreInfo;

