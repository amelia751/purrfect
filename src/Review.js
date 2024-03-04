import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';
import ReviewImg from './review-img.png';
import './Review.css'


const ReviewInfo = ({ profile, author, star, text }) => {
  const filledStars = Array(star).fill('★');
  const emptyStars = Array(5 - star).fill('☆');
  return (
    <div className='review-info'>
        <div className='review-head'>
          <img className='reviewer-photo' src={profile} alt={author}></img>
          <p className='reviewer-name'>{author}</p>
        </div>
        <div className="star-rating">
          <span style={{color: '#FFD700'}}>
            {filledStars.concat(emptyStars).join('')}
          </span>
        </div>        
        <p className='review-text'>{text}</p>
    </div>
  );
};

const reviewsEn = [
  {
    profile: 'https://lh3.googleusercontent.com/a-/ALV-UjX81uLKPxHeJvzLvL5rnC1dfatEu99wvZOVbQGImSt0su55=w120-h120-p-rp-mo-ba4-br100',
    author: 'Cat Nguyen Tran',
    star: 5,
    text: 'All you can eat snacks and drinks. Nice place to hangout and de-stress with the furry friends :D',
  },
  {
    profile: 'https://lh3.googleusercontent.com/a/ACg8ocKLx2wwFoYdwLsFeqUrfsm9uRY_00pTyDQNo2rKetHy=w120-h120-p-rp-mo-br100',
    author: 'Maria Stolbova',
    star: 5,
    text: 'Cute kitties, very clean, delicious unlimited drinks',
  },
  {
    profile: 'https://lh3.googleusercontent.com/a-/ALV-UjVyf0jFzfChIUiSNrznFiiV4ym9ingJjD5TP3Wh2h9Beg8=w120-h120-p-rp-mo-ba3-br100',
    author: 'Tim Giedraitis',
    star: 5,
    text: 'Ahhhhh it’s sooo cute! I love this place! I came in and it felt like home. Very comfortable and warm environment. Had some peach tea and pet the cats for a while.',
  },
  {
    profile: 'https://lh3.googleusercontent.com/a-/ALV-UjUstR6Z5jwx3OjJg0JCbJV1mfk9j-TSuRAntfhXNrfERv0=w120-h120-p-rp-mo-br100',
    author: 'TIEN BUI',
    star: 5,
    text: 'Pleasant atmosphere (morning Wednesday), the cats were friendly and calm. Kittens were energetic to play with, unlimited drinks and snacks for an affordable price imo (90k). Overall, my family and I had great experience here',
  },
  {
    profile: 'https://lh3.googleusercontent.com/a-/ALV-UjXXas6On6QMBew7T8cYWF0eOdmE2vCiaZSnQPhQ3wASZKg=w120-h120-p-rp-mo-ba5-br100',
    author: 'Alex Teng',
    star: 5,
    text: 'Cat lover must come... Entrance fee 89,000 dong per person with free drink and snack',
  },

  {
    profile: 'https://lh3.googleusercontent.com/a/ACg8ocKq-vf0nWOIOm8Az5_ryfWumkqEESSzO98WY4LqgLC5=w120-h120-p-rp-mo-br100',
    author: 'Ying Lin',
    star: 5,
    text: 'Amazing experience overall. The cats are incredibly cute and friendly and most importantly, the ventilators work extremely well, leaving no room for smell. You should definitely give it a try!',
  },

];

const reviewsVi = [
  {
    profile: 'https://lh3.googleusercontent.com/a-/ALV-UjVI0anVh9DwKB2XRDejbsT0-PtRdwQQF-XdTWpZ4m1-nOM=w120-h120-p-rp-mo-ba4-br100',
    author: 'Tính Thương',
    star: 5,
    text: 'Quán xịn nha các bạn . Đầy đủ với 7 loại nước uống ( Đào - Milo - dâu tằm - trà sữa - coffe - nước ngọt có gas - Gạo rang ) và đầy đủ món ăn vặt có cả bánh mềm . Máy lạnh phà phà.  Không gian sáng mát mẻ . Ổ điện đầy đủ mọi bàn , yên tĩnh cho sinh viên chạy deadline trừ T7 - CN . Đi sớm nhất có thể để có thời gian chơi với gần 20 cháu mèo đủ thể loại . Đây là lần 2 mình quay lại sau vài tháng và mèo rất to lớn nhanh và có mèo mới cũng như rất thân thiện .',
  },
  {
    profile: 'https://lh3.googleusercontent.com/a-/ALV-UjX312ts-mG4EU_xDwScBKL5OSjtLBVTyVY1-NHIyzPX_BM=w120-h120-p-rp-mo-ba2-br100',
    author: 'Khánh Ngọc',
    star: 5,
    text: 'Tr ơi nó dễ thương gì đâu!!!! Mèo không hề hôi, thơm tho, không nhát người. Mấy ẻm leo lên người tui nằm cái xịt keo cứng ngắc ngồi một chỗ ngắm mấy ẻm luôn tr ơi…. Refill nước và đồ ăn thoải mái hay sao á. Xứng đáng nha mng!!!! Nựng đã lắm mng, phê vãi mèooo 😇😇        🏻  🏻  🏻',
  },
  {
    profile: 'https://lh3.googleusercontent.com/a-/ALV-UjUptcN-3diWAJlN4BUNMp-81GKHtSczWWV5Gwfi9Q_J-No=w120-h120-p-rp-mo-ba3-br100',
    author: 'Thanh Vân',
    star: 5,
    text: 'Quán nằm trên căn hộ nhỏ, ở tầng 4. Mn đến gửi xe dưới nhà xong bấm cầu thang lên tầng 3 rồi để giày trong tú có khoá xong đi bộ lên tí là thấy thế giới bossssssss. Siêu cưng luôn. Bé nào cũng quậy cưng lắm lun. Giá vé 1 ng là 89 ka. Nước và đồ ăn nhăm nhi refill thoải mái. Không gian rất tốt ko hôi mùi mèo gì lunnn 10 điểm cho quán. Các bạn nhân viên nhiệt tình dễ thương lắm. Mình đã đến đây lần thứ 2 rui. giá cả hợp lý. Các mèo rất đẹppp và dễ thương đoáaaaaaaaa',
  },
  {
    profile: 'https://lh3.googleusercontent.com/a-/ALV-UjV5n16IDWq-ebVX5i26ApBOz6KLxdANaNR6h7BJQwKQ0A=w120-h120-p-rp-mo-br100',
    author: 'Thy Yến',
    star: 5,
    text: 'mèo xinh, ít rụng lông, đồ ăn và nước uống ngon, quán k có mùi hôi và decor quán rất là xinhh nhé   🏻 đây là quán mình ưng nhất trong số các quán cafe mèo mình đã đi . 100 điểm ✨',
  },
  {
    profile: 'https://lh3.googleusercontent.com/a-/ALV-UjXu5OsYRDjTVfKxiZoNx7yD4juYF8x8cok56xazhULHBA=w120-h120-p-rp-mo-ba2-br100',
    author: 'Itzel Nguyen',
    star: 5,
    text: '89k/ng ăn uống thoải mái. Nhiều board game. Mèo có tên, có in4 rõ ràng, cũng chịu khó phục vụ khách lắm nha các bạn  ',
  },
  {
    profile: 'https://lh3.googleusercontent.com/a-/ALV-UjVwSL9FnDU521bvJHMXlSRkAnxGdbYwEhL2SCwTsBuXuGm1=w120-h120-p-rp-mo-br100',
    author: 'Thùy Tiên Hà Thị',
    star: 5,
    text: 'mình mới đến lần đầu mà cảm thấy rất thích ,quán sạch sẽ ,giá nước rẻ , mấy em mèo dễ thương lắm nha , mình sẽ ghé quán thường xuyên hơn nữa,mọi người rảnh ghé ủng hộ quá nha',
  },
  {
    profile: 'https://lh3.googleusercontent.com/a/ACg8ocI8mOOvLR5kZDQ8sHor-Ou1rIK45ncd6viU0QMdFcTw=w120-h120-p-rp-mo-br100',
    author: 'Yến Linh Trần Nguyễn',
    star: 5,
    text: 'Mấy bé ở đây được chăm sóc tốt, quầy thức ăn nhiều lựa chọn, không gian decor tone hồng xinh xắn, không có mùi lạ, các em mèo khá chiều khách',
  },
  {
    profile: 'https://lh3.googleusercontent.com/a/ACg8ocJBxmFnA9velA-sgWk5sg2EZ5mxVizRf2yz3_B1MPIx=w120-h120-p-rp-mo-br100',
    author: 'Ha Nguyen',
    star: 5,
    text: 'Các bạn nhân viên dễ thương lịch sự, các bé mèo được chăm sóc kĩ càng và xinh xắn. Gửi xe bên dưới hầm, đi thang máy lên lầu 3 cất giày và lên lầu 4 mua buffet ăn uống và nựng mèo nha. Parking: Bác bảo vệ dễ thương và chu đáo nhiệt tình lắm đó',
  },
];

function Review() {
  const { t, i18n } = useTranslation();

  const reviews = i18n.language === 'en' ? reviewsEn : reviewsVi;

    return (
      <div className='review'>
        <Header />
        <div className='review-banner'>
          <img className='review-img' src={ReviewImg} alt="Review"></img>
          <h1>{t('menuOptions.review')}</h1>
      </div>
        <div className='review-body'>
          {reviews.map((review, index) => (
            <ReviewInfo 
              key={index}
              profile={review.profile}
              author={review.author}
              star={review.star}
              text={review.text}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  };

export default Review

// Quota limit on API free plan ...
// import React, { useEffect, useState } from 'react';
// import { Loader } from '@googlemaps/js-api-loader';
// import { useTranslation } from 'react-i18next';
// import Header from './Header';

// function Review() {
//   const { i18n } = useTranslation();
//   const [reviews, setReviews] = useState([]);
//   const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
//   const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

//   useEffect(() => {
//     const loader = new Loader({
//       apiKey: apiKey,
//       libraries: ["places"],
//       language: i18n.language,
//     });

//     loader.load().then(() => {
//       setIsGoogleMapsLoaded(true); 
//     });
//   }, [i18n.language, apiKey]);

//   useEffect(() => {
//     if (isGoogleMapsLoaded) { 
//       const map = new window.google.maps.Map(document.createElement('div'));
//       const service = new window.google.maps.places.PlacesService(map);

//       service.getDetails({
//         placeId: 'ChIJ5027tRUpdTER8HEPtYVg90g',
//       }, (place, status) => {
//         if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//           const fiveStarReviews = place.reviews.filter(review => review.rating === 5);
//           setReviews(fiveStarReviews);
//         }
//       });
//     }
//   }, [isGoogleMapsLoaded]);
  
//   const renderStars = (rating) => {
//     let stars = [];
//     for (let i = 0; i < 5; i++) {
//       stars.push(
//         <span key={i} className="star" style={{color: i < rating ? '#FFD700' : '#E0E0E0'}}>
//           ★
//         </span>
//       );
//     }

//     return stars;
//   };

//   return (
//     <div>
//       <Header />
//       <h2>Reviews</h2>
//       <ul>
//         {reviews.map((review, index) => (
//           <li key={index}>
//             {review.profile_photo_url && (
//             <img src={review.profile_photo_url} alt={review.author_name} style={{width: "50px", height: "50px", borderRadius: "50%"}} />
//             )}
//             <p>{review.author_name}</p>
//             <div className="star-rating">{renderStars(review.rating)}</div>
//             <p>{review.text}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Review;

