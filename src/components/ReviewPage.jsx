'use client';

import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import FadeImage from './FadeImage';
import Reveal from './Reveal';
import ReviewerIcon from './ReviewerIcon';
import './Review.css';

const ReviewInfo = ({ iconIndex, author, star, text }) => {
  const filledStars = Array(star).fill('★');
  const emptyStars = Array(5 - star).fill('☆');
  return (
    <div className="review-info">
      <div className="review-head">
        <ReviewerIcon index={iconIndex} />
        <p className="reviewer-name">{author}</p>
      </div>
      <div className="star-rating">
        <span style={{ color: '#FFD700' }}>
          {filledStars.concat(emptyStars).join('')}
        </span>
      </div>
      <p className="review-text">{text}</p>
    </div>
  );
};

const reviewsEn = [
  {
    author: 'Cat Nguyen Tran',
    star: 5,
    text: 'All you can eat snacks and drinks. Nice place to hangout and de-stress with the furry friends :D',
  },
  {
    author: 'Maria Stolbova',
    star: 5,
    text: 'Cute kitties, very clean, delicious unlimited drinks',
  },
  {
    author: 'Tim Giedraitis',
    star: 5,
    text: 'Ahhhhh it’s sooo cute! I love this place! I came in and it felt like home. Very comfortable and warm environment. Had some peach tea and pet the cats for a while.',
  },
  {
    author: 'TIEN BUI',
    star: 5,
    text: 'Pleasant atmosphere (morning Wednesday), the cats were friendly and calm. Kittens were energetic to play with, unlimited drinks and snacks for an affordable price imo (90k). Overall, my family and I had great experience here',
  },
  {
    author: 'Alex Teng',
    star: 5,
    text: 'Cat lover must come... Entrance fee 89,000 dong per person with free drink and snack',
  },
  {
    author: 'Ying Lin',
    star: 5,
    text: 'Amazing experience overall. The cats are incredibly cute and friendly and most importantly, the ventilators work extremely well, leaving no room for smell. You should definitely give it a try!',
  },
];

const reviewsVi = [
  {
    author: 'Tính Thương',
    star: 5,
    text: 'Quán xịn nha các bạn . Đầy đủ với 7 loại nước uống ( Đào - Milo - dâu tằm - trà sữa - coffe - nước ngọt có gas - Gạo rang ) và đầy đủ món ăn vặt có cả bánh mềm . Máy lạnh phà phà.  Không gian sáng mát mẻ . Ổ điện đầy đủ mọi bàn , yên tĩnh cho sinh viên chạy deadline trừ T7 - CN . Đi sớm nhất có thể để có thời gian chơi với gần 20 cháu mèo đủ thể loại . Đây là lần 2 mình quay lại sau vài tháng và mèo rất to lớn nhanh và có mèo mới cũng như rất thân thiện .',
  },
  {
    author: 'Khánh Ngọc',
    star: 5,
    text: 'Tr ơi nó dễ thương gì đâu!!!! Mèo không hề hôi, thơm tho, không nhát người. Mấy ẻm leo lên người tui nằm cái xịt keo cứng ngắc ngồi một chỗ ngắm mấy ẻm luôn tr ơi…. Refill nước và đồ ăn thoải mái hay sao á. Xứng đáng nha mng!!!! Nựng đã lắm mng, phê vãi mèooo 😇😇        🏻  🏻  🏻',
  },
  {
    author: 'Thanh Vân',
    star: 5,
    text: 'Quán nằm trên căn hộ nhỏ, ở tầng 4. Mn đến gửi xe dưới nhà xong bấm cầu thang lên tầng 3 rồi để giày trong tú có khoá xong đi bộ lên tí là thấy thế giới bossssssss. Siêu cưng luôn. Bé nào cũng quậy cưng lắm lun. Giá vé 1 ng là 89 ka. Nước và đồ ăn nhăm nhi refill thoải mái. Không gian rất tốt ko hôi mùi mèo gì lunnn 10 điểm cho quán. Các bạn nhân viên nhiệt tình dễ thương lắm. Mình đã đến đây lần thứ 2 rui. giá cả hợp lý. Các mèo rất đẹppp và dễ thương đoáaaaaaaaa',
  },
  {
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
    author: 'Thùy Tiên Hà Thị',
    star: 5,
    text: 'mình mới đến lần đầu mà cảm thấy rất thích ,quán sạch sẽ ,giá nước rẻ , mấy em mèo dễ thương lắm nha , mình sẽ ghé quán thường xuyên hơn nữa,mọi người rảnh ghé ủng hộ quá nha',
  },
  {
    author: 'Yến Linh Trần Nguyễn',
    star: 5,
    text: 'Mấy bé ở đây được chăm sóc tốt, quầy thức ăn nhiều lựa chọn, không gian decor tone hồng xinh xắn, không có mùi lạ, các em mèo khá chiều khách',
  },
  {
    author: 'Ha Nguyen',
    star: 5,
    text: 'Các bạn nhân viên dễ thương lịch sự, các bé mèo được chăm sóc kĩ càng và xinh xắn. Gửi xe bên dưới hầm, đi thang máy lên lầu 3 cất giày và lên lầu 4 mua buffet ăn uống và nựng mèo nha. Parking: Bác bảo vệ dễ thương và chu đáo nhiệt tình lắm đó',
  },
];

function ReviewPage() {
  const { t, i18n } = useTranslation();
  const reviews = i18n.language === 'en' ? reviewsEn : reviewsVi;

  return (
    <div className="review">
      <Header />
      <div className="review-banner">
        <FadeImage className="review-img" src="/review-img.png" alt="Review" priority optimizeWidth={1920} sizes="100vw" fit="cover" />
        <h1>{t('menuOptions.review')}</h1>
      </div>
      <div className="review-body">
        {reviews.map((review, index) => (
          <Reveal key={index} delay={index * 50}>
            <ReviewInfo
              iconIndex={index}
              author={review.author}
              star={review.star}
              text={review.text}
            />
          </Reveal>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ReviewPage;
