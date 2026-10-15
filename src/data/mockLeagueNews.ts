import { ArticleItem } from '../types/football';

// Curated high quality football imagery
const NEWS_IMAGES = [
  "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=80"
];

const PREMIER_LEAGUE_NEWS: ArticleItem[] = [
  {
    id: "pl-1",
    leagueId: 39,
    title: "Man City đại chiến Arsenal: Cuộc thư hùng định đoạt ngôi vương Ngoại Hạng Anh",
    summary: "HLV Pep Guardiola và Mikel Arteta bước vào trận cầu tâm điểm với toan tính chiến thuật đỉnh cao, nơi từng mét vuông trên sân đều là điểm nóng tranh chấp nảy lửa.",
    image: NEWS_IMAGES[0],
    publishedAt: "25 phút trước",
    category: "Tiêu điểm",
    author: "Đỗ Tuấn",
    commentCount: 142,
    isHot: true
  },
  {
    id: "pl-2",
    leagueId: 39,
    title: "Erling Haaland lập kỷ lục 10 bàn sau 6 vòng: 'Cỗ máy ghi bàn' không thể cản phá",
    summary: "Tiền đạo người Na Uy tiếp tục xô đổ những cột mốc vĩ đại nhất lịch sử giải đấu với hiệu suất làm bàn đạt hơn 1.6 bàn mỗi trận.",
    image: NEWS_IMAGES[1],
    publishedAt: "1 giờ trước",
    category: "Ngôi sao",
    author: "Hồng Duy",
    commentCount: 88,
    isHot: true
  },
  {
    id: "pl-3",
    leagueId: 39,
    title: "HLV Ten Hag lên tiếng về áp lực tại Old Trafford: 'Chúng tôi đang đi đúng hướng'",
    summary: "Thuyền trưởng Quỷ Đỏ khẳng định phòng thay đồ Man Utd vẫn đoàn kết và tin tưởng toàn đội sẽ sớm bứt phá vào nhóm dự Champions League.",
    image: NEWS_IMAGES[2],
    publishedAt: "2 giờ trước",
    category: "Phỏng vấn",
    author: "Vy Anh",
    commentCount: 215
  },
  {
    id: "pl-4",
    leagueId: 39,
    title: "Liverpool tìm lại bản lĩnh ứng viên vô địch dưới thời tân HLV Arne Slot",
    summary: "Lối đá pressing hiện đại kết hợp kiểm soát bóng linh hoạt đang giúp The Kop duy trì chuỗi trận thăng hoa tại Premier League mùa này.",
    image: NEWS_IMAGES[3],
    publishedAt: "3 giờ trước",
    category: "Nhận định",
    author: "Quang Dũng",
    commentCount: 64
  },
  {
    id: "pl-5",
    leagueId: 39,
    title: "Cole Palmer tỏa sáng rực rỡ: Chelsea định hình bộ khung thế hệ mới",
    summary: "Cú poker lịch sử trong hiệp một của ngôi sao trẻ người Anh chứng minh anh là linh hồn không thể thay thế trong sơ đồ tấn công của The Blues.",
    image: NEWS_IMAGES[4],
    publishedAt: "4 giờ trước",
    category: "Góc chiến thuật",
    author: "Hoàng An",
    commentCount: 79
  },
  {
    id: "pl-6",
    leagueId: 39,
    title: "Aston Villa gây bất ngờ lớn: Khát vọng chen chân vào cuộc đua tam mã",
    summary: "Dưới bàn tay lão luyện của Unai Emery, đội bóng thành Birmingham thể hiện sự lì lợm và bản lĩnh ở những phút thi đấu bù giờ quyết định.",
    image: NEWS_IMAGES[5],
    publishedAt: "5 giờ trước",
    category: "Bình luận",
    author: "Anh Quân",
    commentCount: 31
  },
  {
    id: "pl-7",
    leagueId: 39,
    title: "Chấn thương của Rodri và bài toán kiểm soát tuyến giữa của Man City",
    summary: "Mất đi mỏ neo quan trọng nhất, các chuyên gia phân tích cách Man City sẽ xoay xở chiến thuật trước lịch thi đấu dày đặc 3 ngày một trận.",
    image: NEWS_IMAGES[6],
    publishedAt: "6 giờ trước",
    category: "Phân tích",
    author: "Xuân Bình",
    commentCount: 53
  },
  {
    id: "pl-8",
    leagueId: 39,
    title: "Tottenham của Postecoglou: Canh bạc tấn công tận hiến và cái giá phải trả",
    summary: "Lối chơi đẩy cao đội hình mang lại những trận cầu mãn nhãn nhưng cũng để lộ nhiều khoảng trống nguy hiểm nơi hàng phòng ngự Spurs.",
    image: NEWS_IMAGES[7],
    publishedAt: "8 giờ trước",
    category: "Nhận định",
    author: "Thanh Quý",
    commentCount: 42
  },
  {
    id: "pl-9",
    leagueId: 39,
    title: "Tranh cãi trọng tài và công nghệ VAR sau các quyết định phạt đền vòng 6",
    summary: "Ban điều hành trọng tài Premier League (PGMOL) tổ chức cuộc họp khẩn nhằm rà soát lại các pha thổi phạt penalty gây tranh cãi gay gắt.",
    image: NEWS_IMAGES[0],
    publishedAt: "10 giờ trước",
    category: "Hậu trường",
    author: "VnExpress",
    commentCount: 169
  },
  {
    id: "pl-10",
    leagueId: 39,
    title: "Brighton và triết lý đào tạo cầu thủ trẻ sinh lời hàng trăm triệu bảng",
    summary: "Mô hình tuyển trạch dựa trên dữ liệu thông minh tiếp tục biến đội bóng miền Nam nước Anh thành hình mẫu phát triển bền vững hàng đầu thế giới.",
    image: NEWS_IMAGES[1],
    publishedAt: "12 giờ trước",
    category: "Kinh doanh",
    author: "Minh Phương",
    commentCount: 27
  },
  // Page 2 (Older news: items 11 - 20)
  {
    id: "pl-11",
    leagueId: 39,
    title: "Newcastle nhọc nhằn chia điểm: Nỗi lo quá tải lực lượng trước thềm Cúp Quốc Gia",
    summary: "Chích Chòe đối mặt với cuộc khủng hoảng thể lực khi hàng loạt trụ cột vắng mặt trong giai đoạn thi đấu liên tục cả ở giải quốc nội lẫn cúp châu Âu.",
    image: NEWS_IMAGES[2],
    publishedAt: "Hôm qua 18:30",
    category: "Tin nhanh",
    author: "Đỗ Tuấn",
    commentCount: 19
  },
  {
    id: "pl-12",
    leagueId: 39,
    title: "Bukayo Saka cán mốc 50 đường kiến tạo tại Ngoại Hạng Anh ở tuổi 24",
    summary: "Ngôi sao trưởng thành từ học viện Hale End tiếp tục khẳng định vị thế một trong những cầu thủ chạy cánh phải hàng đầu thế giới hiện nay.",
    image: NEWS_IMAGES[3],
    publishedAt: "Hôm qua 15:45",
    category: "Ngôi sao",
    author: "Hồng Duy",
    commentCount: 47
  },
  {
    id: "pl-13",
    leagueId: 39,
    title: "Cục diện nhóm trụ hạng: Everton và Wolves chật vật tìm kiếm chiến thắng đầu tay",
    summary: "Áp lực ngàn cân đang đè nặng lên ghế nóng của các HLV khi giải đấu dần trôi qua 1/6 chặng đường và cuộc đua trụ hạng bắt đầu nóng lên.",
    image: NEWS_IMAGES[4],
    publishedAt: "Hôm qua 11:20",
    category: "Toàn cảnh",
    author: "Quang Dũng",
    commentCount: 38
  },
  {
    id: "pl-14",
    leagueId: 39,
    title: "Siêu máy tính Opta dự đoán tỷ lệ vô địch: Man City 51%, Arsenal 38%",
    summary: "Thuật toán mô phỏng 10.000 kịch bản mùa giải chỉ ra khoảng cách điểm số sít sao nhất lịch sử Ngoại Hạng Anh trong 5 mùa bóng gần đây.",
    image: NEWS_IMAGES[5],
    publishedAt: "28/09/2026",
    category: "Thống kê",
    author: "Hoàng An",
    commentCount: 112
  },
  {
    id: "pl-15",
    leagueId: 39,
    title: "Chuyển nhượng Ngoại Hạng Anh: Các ông lớn rục rịch kế hoạch cho phiên chợ Đông",
    summary: "Những mục tiêu phòng ngự và tiền vệ trụ đang được Chelsea, Liverpool và MU săn đón ráo riết chuẩn bị cho giai đoạn lượt về khốc liệt.",
    image: NEWS_IMAGES[6],
    publishedAt: "28/09/2026",
    category: "Chuyển nhượng",
    author: "Vy Anh",
    commentCount: 83
  },
  {
    id: "pl-16",
    leagueId: 39,
    title: "Mikel Arteta: 'Arsenal của hôm nay đã đủ bản lĩnh để bước lên đỉnh cao'",
    summary: "HLV người Tây Ban Nha tự tin về chiều sâu đội hình và tinh thần quật khởi của các học trò sau hai mùa bóng về nhì cay đắng.",
    image: NEWS_IMAGES[7],
    publishedAt: "27/09/2026",
    category: "Phỏng vấn",
    author: "Anh Quân",
    commentCount: 95
  },
  {
    id: "pl-17",
    leagueId: 39,
    title: "Son Heung-min và vai trò thủ lĩnh tinh thần tại Bắc London",
    summary: "Dù không còn duy trì tốc độ đỉnh cao, đội trưởng người Hàn Quốc vẫn là điểm tựa vững chãi nhất cho dàn sao trẻ của Tottenham Hotspur.",
    image: NEWS_IMAGES[0],
    publishedAt: "27/09/2026",
    category: "Chân dung",
    author: "Xuân Bình",
    commentCount: 36
  },
  {
    id: "pl-18",
    leagueId: 39,
    title: "Sức hút thương mại kỷ lục: Doanh thu bản quyền truyền hình Premier League vượt 7 tỷ bảng",
    summary: "Sức nóng toàn cầu từ những trận cầu đinh cuối tuần giúp giải bóng đá số một xứ sương mù tiếp tục nới rộng khoảng cách tài chính với phần còn lại của bóng đá châu Âu.",
    image: NEWS_IMAGES[1],
    publishedAt: "26/09/2026",
    category: "Kinh doanh",
    author: "Minh Phương",
    commentCount: 22
  },
  {
    id: "pl-19",
    leagueId: 39,
    title: "Phân tích: Cách các đội bóng nhỏ 'bắt bài' lối chơi chuyền bóng ngắn từ phần sân nhà",
    summary: "Bẫy việt vị và khối pressing tầm cao đồng bộ đang tạo ra khó khăn thật sự cho các đại gia yêu thích phong cách triển khai bóng từ thủ môn.",
    image: NEWS_IMAGES[2],
    publishedAt: "26/09/2026",
    category: "Chiến thuật",
    author: "Thanh Quý",
    commentCount: 18
  },
  {
    id: "pl-20",
    leagueId: 39,
    title: "Top 5 pha cứu thua xuất sắc nhất tháng 9 tại Ngoại Hạng Anh",
    summary: "Những phản xạ xuất thần của Alisson, Raya và Vicario làm nức lòng người hâm mộ túc cầu trên toàn thế giới.",
    image: NEWS_IMAGES[3],
    publishedAt: "25/09/2026",
    category: "Video",
    author: "VnExpress",
    commentCount: 45
  },
  // Page 3 (Older news: items 21 - 30)
  {
    id: "pl-21",
    leagueId: 39,
    title: "West Ham United sa thải trợ lý chiến thuật sau chuỗi 4 trận không biết thắng",
    summary: "Quyết định tái cấu trúc ban huấn luyện được đưa ra gấp rút nhằm xốc lại tinh thần thi đấu của toàn đội.",
    image: NEWS_IMAGES[4],
    publishedAt: "24/09/2026",
    category: "Tin nhanh",
    author: "Đỗ Tuấn",
    commentCount: 15
  },
  {
    id: "pl-22",
    leagueId: 39,
    title: "Kobe Mainoo và hành trình vươn tầm tiền vệ trung tâm thế hệ mới của bóng đá Anh",
    summary: "Sự điềm tĩnh và kỹ năng thoát pressing siêu hạng giúp tài năng trẻ Man United trở thành trụ cột của cả CLB lẫn tuyển quốc gia Tam Sư.",
    image: NEWS_IMAGES[5],
    publishedAt: "23/09/2026",
    category: "Chân dung",
    author: "Hồng Duy",
    commentCount: 71
  },
  {
    id: "pl-23",
    leagueId: 39,
    title: "Lịch thi đấu khắc nghiệt tháng 10: Thử thách cực đại cho các đội bóng tham dự cúp châu Âu",
    summary: "Với mật độ 7 trận trong 21 ngày, chiều sâu đội hình và khả năng xoay tua cầu thủ sẽ quyết định cục diện cả mùa giải.",
    image: NEWS_IMAGES[6],
    publishedAt: "22/09/2026",
    category: "Toàn cảnh",
    author: "Quang Dũng",
    commentCount: 29
  },
  {
    id: "pl-24",
    leagueId: 39,
    title: "Ngoại Hạng Anh thử nghiệm luật bóng lăn và rút ngắn thời gian bóng chết",
    summary: "Ủy ban bóng đá quốc tế IFAB phối hợp cùng ban tổ chức giải đấu nhằm tăng tính giải trí và nhịp độ thi đấu thực tế trên sân cỏ.",
    image: NEWS_IMAGES[7],
    publishedAt: "21/09/2026",
    category: "Quy định",
    author: "Hoàng An",
    commentCount: 52
  },
  {
    id: "pl-25",
    leagueId: 39,
    title: "Nhìn lại 10 bàn thắng đẹp nhất vòng đấu khai màn Ngoại Hạng Anh mùa giải 2026/27",
    summary: "Những siêu phẩm sút xa mu lai má và pha ngả người móc bóng ngoạn mục mở màn cho một mùa bóng nghẹt thở.",
    image: NEWS_IMAGES[0],
    publishedAt: "20/09/2026",
    category: "Bình luận",
    author: "VnExpress",
    commentCount: 63
  }
];

const VLEAGUE_NEWS: ArticleItem[] = [
  {
    id: "vl-1",
    leagueId: 382,
    title: "Công An Hà Nội đánh bại Nam Định: Khẳng định sức mạnh ứng viên số 1 ngôi vương V-League",
    summary: "Sự cơ động của dàn tuyển thủ quốc gia Quang Hải, Văn Thanh cùng bản năng sát thủ của ngoại binh giúp CAHN thắng thuyết phục trên sân Hàng Đẫy.",
    image: NEWS_IMAGES[2],
    publishedAt: "40 phút trước",
    category: "Tiêu điểm",
    author: "Lâm Thỏa",
    commentCount: 89,
    isHot: true
  },
  {
    id: "vl-2",
    leagueId: 382,
    title: "Nguyễn Xuân Son (Rafaelson) tiếp tục bùng nổ: Niềm hy vọng số một của Thép Xanh Nam Định",
    summary: "Sau khi hoàn tất thủ tục nhập tịch, chân sút nhập tịch thi đấu đầy thăng hoa và cống hiến những bàn thắng đẳng cấp cho người hâm mộ thành Nam.",
    image: NEWS_IMAGES[3],
    publishedAt: "2 giờ trước",
    category: "Ngôi sao",
    author: "Đức Đồng",
    commentCount: 114,
    isHot: true
  },
  {
    id: "vl-3",
    leagueId: 382,
    title: "Hà Nội FC quyết tâm trở lại đường đua vô địch sau chuỗi trận khởi đầu chậm chạp",
    summary: "Đội bóng áo tím dần bắt nhịp với sơ đồ chiến thuật mới, sẵn sàng cho chặng tăng tốc quyết liệt trước khi giải đấu tạm nghỉ nhường chỗ cho ĐTQG.",
    image: NEWS_IMAGES[4],
    publishedAt: "4 giờ trước",
    category: "Phỏng vấn",
    author: "Hoàng Triều",
    commentCount: 52
  },
  {
    id: "vl-4",
    leagueId: 382,
    title: "Công nghệ VAR tại V-League: Nâng cao chất lượng chuyên môn và hạn chế tối đa tranh cãi",
    summary: "Việc phủ sóng xe VAR ở tất cả các trận đấu then chốt giúp các trọng tài đưa ra những quyết định công tâm và chính xác hơn.",
    image: NEWS_IMAGES[5],
    publishedAt: "6 giờ trước",
    category: "Hậu trường",
    author: "VnExpress",
    commentCount: 78
  },
  {
    id: "vl-5",
    leagueId: 382,
    title: "Thể Công Viettel và cuộc cách mạng trẻ hóa lực lượng ấn tượng",
    summary: "Khuất Văn Khang cùng lứa cầu thủ trẻ được trao cơ hội đá chính và để lại dấu ấn đậm nét bằng lối đá cống hiến, giàu thể lực.",
    image: NEWS_IMAGES[6],
    publishedAt: "8 giờ trước",
    category: "Góc chiến thuật",
    author: "Hiếu Lương",
    commentCount: 34
  },
  {
    id: "vl-6",
    leagueId: 382,
    title: "Hải Phòng biến Lạch Tray thành 'chảo lửa' không thể công phá",
    summary: "Sự cổ vũ cuồng nhiệt của hàng vạn cổ động viên đất Cảng tiếp thêm sức mạnh tinh thần to lớn cho thầy trò HLV Chu Đình Nghiêm.",
    image: NEWS_IMAGES[7],
    publishedAt: "10 giờ trước",
    category: "Toàn cảnh",
    author: "Lâm Thỏa",
    commentCount: 41
  },
  {
    id: "vl-7",
    leagueId: 382,
    title: "Hoàng Anh Gia Lai kiên trì với triết lý kỷ luật và phòng ngự chặt chẽ",
    summary: "Đội bóng phố Núi mùa giải này thi đấu thực dụng hơn, chắt chiu từng điểm số quý giá để duy trì vị trí an toàn ở nửa trên bảng xếp hạng.",
    image: NEWS_IMAGES[0],
    publishedAt: "12 giờ trước",
    category: "Nhận định",
    author: "Đức Đồng",
    commentCount: 65
  },
  {
    id: "vl-8",
    leagueId: 382,
    title: "Sông Lam Nghệ An vượt khó: Tinh thần xứ Nghệ rực lửa trong gian khó",
    summary: "Dù ngân sách hạn hẹp, truyền thống đào tạo trẻ bền vững tiếp tục cung cấp những viên ngọc thô tài năng cho bóng đá Việt Nam.",
    image: NEWS_IMAGES[1],
    publishedAt: "Hôm qua 16:20",
    category: "Chân dung",
    author: "Hoàng Triều",
    commentCount: 30
  },
  {
    id: "vl-9",
    leagueId: 382,
    title: "Bình Dương đón tân HLV ngoại với tham vọng tái thiết thời hoàng kim",
    summary: "Khoản đầu tư khủng vào cơ sở vật chất và nâng cấp dàn ngoại binh cho thấy khát khao trở lại đỉnh cao của đội bóng đất Thủ.",
    image: NEWS_IMAGES[2],
    publishedAt: "Hôm qua 14:10",
    category: "Tin nhanh",
    author: "Hiếu Lương",
    commentCount: 23
  },
  {
    id: "vl-10",
    leagueId: 382,
    title: "VFF và VPF đẩy mạnh công tác y tế, kiểm tra doping tại giải VĐQG",
    summary: "Quy chuẩn y tế chuyên nghiệp được áp dụng nghiêm ngặt theo tiêu chuẩn của Liên đoàn Bóng đá Châu Á (AFC).",
    image: NEWS_IMAGES[3],
    publishedAt: "Hôm qua 09:30",
    category: "Hậu trường",
    author: "VnExpress",
    commentCount: 16
  },
  // Page 2 (Items 11-20)
  {
    id: "vl-11",
    leagueId: 382,
    title: "Cuộc đua vua phá lưới V-League: Cuộc cạnh tranh khốc liệt giữa các chân sút ngoại",
    summary: "Những màn trình diễn chói sáng của Rimario, Rafaelson và Hendrio khiến bảng thành tích bàn thắng liên tục biến động.",
    image: NEWS_IMAGES[4],
    publishedAt: "28/09/2026",
    category: "Thống kê",
    author: "Lâm Thỏa",
    commentCount: 39
  },
  {
    id: "vl-12",
    leagueId: 382,
    title: "Đông Á Thanh Hóa: Ngựa ô ngổ ngáo sẵn sàng gieo sầu cho các ông lớn",
    summary: "Lối đá pressing không ngừng nghỉ dưới thời HLV Popov luôn là nỗi ác mộng đối với bất kỳ đối thủ nào hành quân đến xứ Thanh.",
    image: NEWS_IMAGES[5],
    publishedAt: "27/09/2026",
    category: "Bình luận",
    author: "Đức Đồng",
    commentCount: 44
  },
  {
    id: "vl-13",
    leagueId: 382,
    title: "HLV Kim Sang-sik dự khán các trận cầu đinh V-League để tuyển chọn nhân sự tuyển Việt Nam",
    summary: "Thuyền trưởng ĐTQG chăm chú ghi chép phong độ của các nhân tố mới nổi nhằm chuẩn bị cho chiến dịch AFF Cup cuối năm.",
    image: NEWS_IMAGES[6],
    publishedAt: "27/09/2026",
    category: "ĐTQG",
    author: "Hiếu Lương",
    commentCount: 92
  },
  {
    id: "vl-14",
    leagueId: 382,
    title: "SHB Đà Nẵng nỗ lực thoát khỏi đáy bảng sau màn trở lại giải đấu cao nhất",
    summary: "Kinh nghiệm thi đấu đỉnh cao và bản lĩnh ở những trận cầu 6 điểm sẽ là yếu tố sống còn cho đội bóng sông Hàn.",
    image: NEWS_IMAGES[7],
    publishedAt: "26/09/2026",
    category: "Toàn cảnh",
    author: "Hoàng Triều",
    commentCount: 19
  },
  {
    id: "vl-15",
    leagueId: 382,
    title: "Quảng Nam tạo địa chấn với chiến thắng quả cảm trước đội bóng thủ đô",
    summary: "Chiến thuật phòng ngự phản công mẫu mực mang về 3 điểm quý hơn vàng cho đại diện miền Trung.",
    image: NEWS_IMAGES[0],
    publishedAt: "25/09/2026",
    category: "Tin nhanh",
    author: "Lâm Thỏa",
    commentCount: 28
  },
  {
    id: "vl-16",
    leagueId: 382,
    title: "Khán giả đến sân tăng vọt: Tín hiệu tích cực cho ngày hội bóng đá nước nhà",
    summary: "Hiệu ứng truyền thông và chất lượng sân bãi cải thiện giúp các khán đài V-League luôn ngập tràn sắc màu và tiếng reo hò rộn rã.",
    image: NEWS_IMAGES[1],
    publishedAt: "24/09/2026",
    category: "Phóng sự",
    author: "VnExpress",
    commentCount: 51
  },
  {
    id: "vl-17",
    leagueId: 382,
    title: "Quy Nhơn Bình Định và bài toán giữ chân các trụ cột trước lời mời gọi triệu đô",
    summary: "Đội bóng đất Võ nỗ lực cân đối tài chính để duy trì đội hình giàu tính cạnh tranh ở mùa giải mới.",
    image: NEWS_IMAGES[2],
    publishedAt: "23/09/2026",
    category: "Kinh doanh",
    author: "Đức Đồng",
    commentCount: 14
  },
  {
    id: "vl-18",
    leagueId: 382,
    title: "Thủ môn Nguyễn Filip: Điểm tựa thép trong khung gỗ CAHN",
    summary: "Những pha cứu thua không tưởng của người gác đền Việt kiều mang lại sự an tâm tuyệt đối cho hàng thủ đội bóng ngành công an.",
    image: NEWS_IMAGES[3],
    publishedAt: "22/09/2026",
    category: "Chân dung",
    author: "Hiếu Lương",
    commentCount: 67
  },
  {
    id: "vl-19",
    leagueId: 382,
    title: "Hồng Lĩnh Hà Tĩnh giữ kỷ lục chuỗi trận hòa dài nhất lịch sử giải đấu",
    summary: "Hàng phòng ngự chặt chẽ giúp thầy trò Nguyễn Thành Công trở thành đội bóng khó bị đánh bại nhất giải đấu.",
    image: NEWS_IMAGES[4],
    publishedAt: "21/09/2026",
    category: "Thống kê",
    author: "Lâm Thỏa",
    commentCount: 22
  },
  {
    id: "vl-20",
    leagueId: 382,
    title: "Top 5 bàn thắng đẹp nhất tháng mở màn V-League 2026/27",
    summary: "Những cú sút cầu vồng đẹp mắt và pha dàn xếp phối hợp bóng ngắn đẳng cấp khiến người hâm mộ không khỏi trầm trồ.",
    image: NEWS_IMAGES[5],
    publishedAt: "20/09/2026",
    category: "Video",
    author: "VnExpress",
    commentCount: 35
  }
];

// Fallback generator for other leagues (La Liga, Champions League, Serie A, Bundesliga, etc.)
function generateLeagueNews(leagueId: number, leagueName: string): ArticleItem[] {
  const categories = ["Tiêu điểm", "Nhận định", "Ngôi sao", "Chuyển nhượng", "Chiến thuật", "Hậu trường", "Phỏng vấn", "Toàn cảnh"];
  const authors = ["Quang Dũng", "Hồng Duy", "Vy Anh", "Hoàng An", "Đỗ Tuấn", "Anh Quân", "VnExpress"];
  
  const newsList: ArticleItem[] = [];

  const headlines = [
    `${leagueName}: Đại chiến kinh điển định đoạt trật tự bảng xếp hạng`,
    `Tiêu điểm ${leagueName}: Phong độ thăng hoa của dàn sao trẻ hàng đầu`,
    `HLV trưởng lên tiếng sau chiến thắng kịch tính ở những giây bù giờ cuối cùng`,
    `Bản tin chuyển nhượng ${leagueName}: Những bản hợp đồng bom tấn mùa Đông`,
    `Phân tích chiến thuật: Bí quyết giúp đội bóng duy trì chuỗi bất bại thần kỳ`,
    `Cuộc đua Chiếc Giày Vàng ${leagueName} nóng bỏng sau từng vòng đấu`,
    `Người hâm mộ vỡ òa với siêu phẩm sút xa từ cự ly 35 mét`,
    `Siêu máy tính dự đoán cơ hội vô địch và vé dự cúp châu Âu mùa này`,
    `Công nghệ VAR và những tình huống gây tranh cãi nảy lửa ở vòng đấu vừa qua`,
    `Chấn thương của các trụ cột và bài toán chiều sâu lực lượng trước lịch đấu dày đặc`,
    `Nhìn lại 10 khoảnh khắc ấn tượng nhất giải đấu trong tuần qua`,
    `Đội bóng hiện tượng: Từ kẻ ngáng đường đến ứng viên sáng giá`,
    `Tương lai của ngôi sao số một tại giải đấu: Gia hạn hay ra đi tìm thử thách mới?`,
    `Những bất ngờ thú vị tại nhóm cuối bảng: Cuộc chiến trụ hạng không khoan nhượng`,
    `Cơn sốt bản quyền và lượng khán giả theo dõi trực tiếp kỷ lục`,
    `Tân binh gây ấn tượng mạnh với cú hat-trick ngay trận ra mắt`,
    `Chuyên gia nhận định trước vòng đấu tiếp theo: Điểm tựa sân nhà có làm nên chuyện?`,
    `Thủ môn xuất sắc nhất giải đấu với chuỗi 5 trận giữ sạch lưới liên tiếp`,
    `Bí mật phía sau phòng thay đồ của đội bóng đang dẫn đầu bảng`,
    `Nhịp đập ${leagueName}: Tổng hợp kết quả và video bàn thắng đẹp nhất tuần`,
    `Lịch thi đấu nảy lửa cuối tuần này: Đừng bỏ lỡ các trận cầu tâm điểm`,
    `Thống kê thú vị: Tỷ lệ ghi bàn trong hiệp hai cao kỷ lục`,
    `Khám phá chế độ dinh dưỡng và tập luyện chuẩn quốc tế của các cầu thủ`,
    `Các huyền thoại nhận định về cuộc đua vô địch năm nay`,
    `Top 5 tài năng trẻ đáng xem nhất giải đấu trong tương lai gần`
  ];

  headlines.forEach((title, idx) => {
    newsList.push({
      id: `${leagueId}-news-${idx + 1}`,
      leagueId,
      title,
      summary: `Toàn cảnh diễn biến sôi động tại ${leagueName} với những góc nhìn phân tích chuyên sâu từ các phóng viên, chuyên gia thể thao VnExpress.`,
      image: NEWS_IMAGES[idx % NEWS_IMAGES.length],
      publishedAt: idx === 0 ? "30 phút trước" : idx < 3 ? `${idx + 1} giờ trước` : idx < 10 ? `${idx + 2} giờ trước` : `${Math.floor(idx / 3)} ngày trước`,
      category: categories[idx % categories.length],
      author: authors[idx % authors.length],
      commentCount: 20 + ((idx * 17) % 150),
      isHot: idx < 2
    });
  });

  return newsList;
}

export function getNewsByLeague(leagueId: number, leagueName: string = "Giải đấu"): ArticleItem[] {
  if (leagueId === 39) {
    return PREMIER_LEAGUE_NEWS;
  }
  if (leagueId === 382 || leagueId === 340) {
    return VLEAGUE_NEWS;
  }
  return generateLeagueNews(leagueId, leagueName);
}

const MAN_UTD_DEDICATED_NEWS: ArticleItem[] = [
  {
    id: "mu-n-1",
    leagueId: 39,
    title: "Bruno Fernandes: 'Man Utd đã tìm lại bản sắc tấn công tốc độ và sự tự tin'",
    summary: "Đội trưởng Quỷ Đỏ ca ngợi tinh thần thi đấu quả cảm và khả năng chuyển đổi trạng thái chớp nhoáng của các đồng đội sau chuỗi trận ấn tượng gần đây.",
    image: NEWS_IMAGES[1],
    publishedAt: "20 phút trước",
    category: "Tiêu điểm",
    author: "Đỗ Tuấn",
    commentCount: 168,
    isHot: true
  },
  {
    id: "mu-n-2",
    leagueId: 39,
    title: "Man Utd xúc tiến đàm phán gia hạn hợp đồng dài hạn với Kobbie Mainoo",
    summary: "Ban lãnh đạo INEOS sẵn sàng nâng mức đãi ngộ xứng đáng nhằm biến tiền vệ 20 tuổi thành hạt nhân lâu dài trong dự án tái thiết Old Trafford.",
    image: NEWS_IMAGES[3],
    publishedAt: "45 phút trước",
    category: "Chuyển nhượng",
    author: "Vy Anh",
    commentCount: 94,
    isHot: true
  },
  {
    id: "mu-n-3",
    leagueId: 39,
    title: "Lisandro Martínez trở lại tập luyện trọn vẹn, sẵn sàng đá chính trận tới",
    summary: "Bộ phận y tế Man Utd thông báo tin vui cho người hâm mộ khi trung vệ người Argentina đã bình phục hoàn toàn chấn thương và đạt thể lực lý tưởng.",
    image: NEWS_IMAGES[2],
    publishedAt: "1 giờ trước",
    category: "Lực lượng",
    author: "Quang Dũng",
    commentCount: 82
  },
  {
    id: "mu-n-4",
    leagueId: 39,
    title: "Rasmus Højlund: 'Mục tiêu của tôi là ghi ít nhất 20 bàn thắng mùa giải này'",
    summary: "Chân sút người Đan Mạch chia sẻ về sự kết nối ăn ý với các vệ tinh xung quanh và khao khát khẳng định vị thế trung phong số một tại Premier League.",
    image: NEWS_IMAGES[0],
    publishedAt: "2 giờ trước",
    category: "Phỏng vấn",
    author: "Hồng Duy",
    commentCount: 115
  },
  {
    id: "mu-n-5",
    leagueId: 39,
    title: "Góc chiến thuật: Tuyến giữa Man Utd bứt phá nhờ sự ăn ý giữa Ugarte và Mainoo",
    summary: "Sự kết hợp giữa chất thép đánh chặn của Manuel Ugarte và khả năng thoát pressing mượt mà của Mainoo đang mang lại sự cân bằng hoàn hảo cho Quỷ Đỏ.",
    image: NEWS_IMAGES[4],
    publishedAt: "3 giờ trước",
    category: "Chiến thuật",
    author: "Hoàng An",
    commentCount: 65
  },
  {
    id: "mu-n-6",
    leagueId: 39,
    title: "Dự án siêu sân vận động Old Trafford mới 2 tỷ bảng tiến gần giai đoạn phê duyệt",
    summary: "Tập đoàn INEOS cùng chính quyền thành phố Manchester công bố bản quy hoạch chi tiết sân vận động mới với sức chứa 100.000 chỗ ngồi hiện đại bậc nhất thế giới.",
    image: NEWS_IMAGES[5],
    publishedAt: "4 giờ trước",
    category: "Hậu trường",
    author: "Anh Quân",
    commentCount: 142
  },
  {
    id: "mu-n-7",
    leagueId: 39,
    title: "Alejandro Garnacho lập cú đúp đẹp mắt: Ngòi nổ bùng nổ nơi hành lang cánh",
    summary: "Tài năng trẻ người Argentina tiếp tục chứng minh tầm ảnh hưởng bằng những pha đi bóng xé gió và các cú dứt điểm hiểm hóc vào góc cao khung thành.",
    image: NEWS_IMAGES[6],
    publishedAt: "5 giờ trước",
    category: "Ngôi sao",
    author: "Xuân Bình",
    commentCount: 77
  },
  {
    id: "mu-n-8",
    leagueId: 39,
    title: "Diogo Dalot nhận giải Cầu thủ xuất sắc nhất tháng của Man Utd",
    summary: "Hậu vệ người Bồ Đào Nha nhận được hơn 62% số phiếu bình chọn từ người hâm mộ toàn cầu nhờ sự bền bỉ và đóng góp cả trong phòng ngự lẫn hỗ trợ tấn công.",
    image: NEWS_IMAGES[7],
    publishedAt: "6 giờ trước",
    category: "Vinh danh",
    author: "VnExpress",
    commentCount: 53
  },
  {
    id: "mu-n-9",
    leagueId: 39,
    title: "Joshua Zirkzee: Mắt xích kết nối mềm mại trong sơ đồ tấn công biến hóa",
    summary: "Dù không phải mẫu tiền đạo săn bàn thuần túy, Zirkzee tạo ra khoảng trống mênh mông cho các tiền vệ băng lên dứt điểm nhờ khả năng làm tường tinh tế.",
    image: NEWS_IMAGES[0],
    publishedAt: "8 giờ trước",
    category: "Phân tích",
    author: "Hoàng An",
    commentCount: 46
  },
  {
    id: "mu-n-10",
    leagueId: 39,
    title: "Harry Maguire: Điểm tựa không chiến vững chắc trong các tình huống cố định",
    summary: "Kinh nghiệm trận mạc cùng bản lĩnh kiên cường giúp trung vệ người Anh luôn là chốt chặn đáng tin cậy mỗi khi được ban huấn luyện tung vào sân.",
    image: NEWS_IMAGES[1],
    publishedAt: "10 giờ trước",
    category: "Nhận định",
    author: "Đỗ Tuấn",
    commentCount: 61
  },
  {
    id: "mu-n-11",
    leagueId: 39,
    title: "Man Utd lên kế hoạch chiêu mộ thêm một hậu vệ trái đẳng cấp trong tháng Giêng",
    summary: "Các tuyển trạch viên Quỷ Đỏ đang theo dõi sát sao Patrick Dorgu và một số gương mặt tiềm năng tại châu Âu để tăng cường chiều sâu hành lang biên.",
    image: NEWS_IMAGES[2],
    publishedAt: "12 giờ trước",
    category: "Chuyển nhượng",
    author: "Vy Anh",
    commentCount: 88
  },
  {
    id: "mu-n-12",
    leagueId: 39,
    title: "Casemiro chia sẻ về vai trò thủ lĩnh và hướng dẫn dàn sao trẻ tại Carrington",
    summary: "Cựu tiền vệ Real Madrid khẳng định mong muốn cống hiến hết mình và truyền lửa kinh nghiệm thi đấu đỉnh cao cho thế hệ kế cận tại sân Old Trafford.",
    image: NEWS_IMAGES[3],
    publishedAt: "14 giờ trước",
    category: "Phỏng vấn",
    author: "Quang Dũng",
    commentCount: 50
  },
  {
    id: "mu-n-13",
    leagueId: 39,
    title: "Amad Diallo: Từ siêu dự bị đến vị trí chính thức trong đội hình xuất phát",
    summary: "Cầu thủ người Bờ Biển Ngà thể hiện sự tiến bộ vượt bậc về tư duy chiến thuật và khả năng pressing đồng bộ theo yêu cầu của ban huấn luyện.",
    image: NEWS_IMAGES[4],
    publishedAt: "1 ngày trước",
    category: "Góc nhìn",
    author: "Hồng Duy",
    commentCount: 39
  },
  {
    id: "mu-n-14",
    leagueId: 39,
    title: "Thống kê ấn tượng: Man Utd là đội tạo ra nhiều cơ hội ăn bàn nhất 3 vòng qua",
    summary: "Với chỉ số xG đạt 2.45 mỗi 90 phút, Quỷ Đỏ cho thấy sự sắc bén vượt trội khi chuyển đổi cơ hội thành những bàn thắng mãn nhãn.",
    image: NEWS_IMAGES[5],
    publishedAt: "1 ngày trước",
    category: "Thống kê",
    author: "Thanh Quý",
    commentCount: 71
  },
  {
    id: "mu-n-15",
    leagueId: 39,
    title: "Tình hình thể lực của Noussair Mazraoui: Khả năng ra sân tại đấu trường châu Âu",
    summary: "Hậu vệ người Maroc đã hoàn thành bài kiểm tra thể lực chuyên sâu và sẵn sàng cho những thử thách cam go tại vòng bảng Cúp C2 tuần này.",
    image: NEWS_IMAGES[6],
    publishedAt: "1 ngày trước",
    category: "Lực lượng",
    author: "Quang Dũng",
    commentCount: 34
  },
  {
    id: "mu-n-16",
    leagueId: 39,
    title: "Man Utd đạt thỏa thuận đối tác toàn cầu mới với thương hiệu công nghệ danh tiếng",
    summary: "Hợp đồng thương mại trị giá hàng chục triệu bảng mỗi năm tiếp tục củng cố tiềm lực tài chính vững mạnh của câu lạc bộ thành Manchester.",
    image: NEWS_IMAGES[7],
    publishedAt: "2 ngày trước",
    category: "Hậu trường",
    author: "VnExpress",
    commentCount: 42
  },
  {
    id: "mu-n-17",
    leagueId: 39,
    title: "Mason Mount nỗ lực tìm lại đỉnh cao phong độ sau chuỗi ngày hồi phục",
    summary: "Tiền vệ người Anh quyết tâm nắm bắt cơ hội tỏa sáng khi lịch thi đấu mùa giải bước vào giai đoạn dày đặc với mật độ 3 ngày một trận.",
    image: NEWS_IMAGES[0],
    publishedAt: "2 ngày trước",
    category: "Tiêu điểm",
    author: "Đỗ Tuấn",
    commentCount: 56
  },
  {
    id: "mu-n-18",
    leagueId: 39,
    title: "Chiến thuật chống bóng bổng của Man Utd: Bài học rút ra từ các vòng đấu trước",
    summary: "Ban huấn luyện Quỷ Đỏ dành nhiều thời lượng tại trung tâm Carrington để rèn giũa khả năng kèm người khu vực và tranh chấp bóng hai trong vòng cấm.",
    image: NEWS_IMAGES[1],
    publishedAt: "2 ngày trước",
    category: "Chiến thuật",
    author: "Hoàng An",
    commentCount: 29
  },
  {
    id: "mu-n-19",
    leagueId: 39,
    title: "Huyền thoại Gary Neville: 'Man Utd đang đi đúng hướng với dàn cầu thủ trẻ nhiệt huyết'",
    summary: "Cựu thủ quân Quỷ Đỏ tin tưởng sự kiên nhẫn cùng định hướng đúng đắn của giới chủ mới sẽ sớm đưa đội bóng trở lại đỉnh cao Premier League.",
    image: NEWS_IMAGES[2],
    publishedAt: "3 ngày trước",
    category: "Bình luận",
    author: "Vy Anh",
    commentCount: 91
  },
  {
    id: "mu-n-20",
    leagueId: 39,
    title: "Nhìn lại 5 siêu phẩm đẹp nhất của Bruno Fernandes trong màu áo Quỷ Đỏ",
    summary: "Từ những cú nã đại bác sấm sét ngoài vòng cấm đến pha đá phạt hàng rào mẫu mực làm nổ tung khán đài sân Old Trafford.",
    image: NEWS_IMAGES[3],
    publishedAt: "3 ngày trước",
    category: "Video",
    author: "VnExpress",
    commentCount: 84
  },
  // Page 2 news items
  {
    id: "mu-n-21",
    leagueId: 39,
    title: "Cựu danh thủ Roy Keane đánh giá cao tinh thần chiến đấu quả cảm của Man Utd",
    summary: "Dù nổi tiếng khắt khe, cựu tiền vệ Quỷ Đỏ thừa nhận đội bóng đã thể hiện được ngọn lửa khát khao chiến thắng vốn có trong những trận đấu gần đây.",
    image: NEWS_IMAGES[4],
    publishedAt: "4 ngày trước",
    category: "Bình luận",
    author: "Đỗ Tuấn",
    commentCount: 67
  },
  {
    id: "mu-n-22",
    leagueId: 39,
    title: "Man Utd triển khai công nghệ phân tích dữ liệu AI hỗ trợ phòng ngừa chấn thương",
    summary: "Ứng dụng các cảm biến thông minh và thuật toán học máy giúp đội ngũ y tế giám sát tải trọng vận động của từng cầu thủ theo thời gian thực.",
    image: NEWS_IMAGES[5],
    publishedAt: "4 ngày trước",
    category: "Công nghệ",
    author: "Hoàng An",
    commentCount: 38
  },
  {
    id: "mu-n-23",
    leagueId: 39,
    title: "Christian Eriksen khẳng định sẵn sàng cống hiến ở mọi vị trí ban huấn luyện yêu cầu",
    summary: "Nhãn quan chiến thuật cùng những đường chuyền dọn cỗ của tiền vệ người Đan Mạch luôn mang lại sự đột biến cao trong thế trận bế tắc.",
    image: NEWS_IMAGES[6],
    publishedAt: "5 ngày trước",
    category: "Phỏng vấn",
    author: "Xuân Bình",
    commentCount: 45
  },
  {
    id: "mu-n-24",
    leagueId: 39,
    title: "Học viện đào tạo Carrington: Vườn ươm tài năng tiếp tục sản sinh những 'viên ngọc thô'",
    summary: "Những sao mai như Ayden Heaven, Harry Amass và Ethan Wheatley đang được ban huấn luyện tạo điều kiện tối đa để cọ xát cùng đội một.",
    image: NEWS_IMAGES[7],
    publishedAt: "5 ngày trước",
    category: "Đào tạo trẻ",
    author: "Quang Dũng",
    commentCount: 52
  },
  {
    id: "mu-n-25",
    leagueId: 39,
    title: "Man Utd lên phương án chiến thuật đối phó lịch thi đấu 'hành xác' tháng 10 và 11",
    summary: "Xoay tua đội hình hợp lý và quản trị thể lực khoa học sẽ là chìa khóa then chốt giúp Quỷ Đỏ duy trì vị thế trong top 4 Ngoại Hạng Anh.",
    image: NEWS_IMAGES[0],
    publishedAt: "6 ngày trước",
    category: "Kế hoạch",
    author: "Vy Anh",
    commentCount: 36
  },
  {
    id: "mu-n-26",
    leagueId: 39,
    title: "Người hâm mộ Man Utd hào hứng với áo đấu phiên bản kỷ niệm đặc biệt mùa giải mới",
    summary: "Thiết kế hoài cổ gợi nhớ kỷ nguyên hoàng kim giành cú ăn ba lịch sử nhanh chóng cháy hàng tại các cửa hàng chính thức trên toàn cầu.",
    image: NEWS_IMAGES[1],
    publishedAt: "6 ngày trước",
    category: "Hậu trường",
    author: "VnExpress",
    commentCount: 79
  },
  {
    id: "mu-n-27",
    leagueId: 39,
    title: "Toàn cảnh chuyến làm khách đầy cam go tại đấu trường Cúp Liên đoàn Anh",
    summary: "Man Utd thể hiện bản lĩnh của một ông lớn khi kiểm soát thế trận và giành chiến thắng thuyết phục để đi tiếp vào vòng tứ kết.",
    image: NEWS_IMAGES[2],
    publishedAt: "7 ngày trước",
    category: "Cúp Quốc gia",
    author: "Hồng Duy",
    commentCount: 44
  },
  {
    id: "mu-n-28",
    leagueId: 39,
    title: "Chuyên gia vật lý trị liệu tiết lộ bí quyết hồi phục thần tốc của Lisandro Martínez",
    summary: "Chế độ dinh dưỡng nghiêm ngặt kết hợp bài tập trị liệu dưới nước giúp trung vệ số 6 lấy lại 100% sức mạnh cơ bắp chỉ sau vài tuần.",
    image: NEWS_IMAGES[3],
    publishedAt: "7 ngày trước",
    category: "Sức khỏe",
    author: "Quang Dũng",
    commentCount: 31
  },
  {
    id: "mu-n-29",
    leagueId: 39,
    title: "Marcus Rashford quyết tâm bùng nổ: 'Tôi khát khao cống hiến trọn vẹn cho câu lạc bộ'",
    summary: "Tiền đạo sinh năm 1997 tập luyện chăm chỉ gấp đôi trên sân tập để tìm lại bản năng sát thủ từng làm say đắm người hâm mộ Quỷ Đỏ.",
    image: NEWS_IMAGES[4],
    publishedAt: "8 ngày trước",
    category: "Phỏng vấn",
    author: "Đỗ Tuấn",
    commentCount: 88
  },
  {
    id: "mu-n-30",
    leagueId: 39,
    title: "Man Utd tổ chức chuỗi hoạt động tri ân các cổ động viên trung thành toàn cầu",
    summary: "Nhiều chương trình giao lưu trực tuyến và tặng quà kỷ niệm độc quyền được tổ chức nhằm gắn kết tình cảm với hàng triệu fan quốc tế.",
    image: NEWS_IMAGES[5],
    publishedAt: "8 ngày trước",
    category: "Cộng đồng",
    author: "VnExpress",
    commentCount: 63
  },
  {
    id: "mu-n-31",
    leagueId: 39,
    title: "Tầm ảnh hưởng của Sir Jim Ratcliffe sau gần một năm tiếp quản mảng bóng đá Man Utd",
    summary: "Từ cải tổ bộ máy quản lý cấp cao đến việc nâng cấp cơ sở vật chất, những thay đổi tích cực đang từng bước đem lại luồng sinh khí mới cho Quỷ Đỏ.",
    image: NEWS_IMAGES[6],
    publishedAt: "9 ngày trước",
    category: "Phân tích",
    author: "Vy Anh",
    commentCount: 110
  },
  {
    id: "mu-n-32",
    leagueId: 39,
    title: "Phân tích sơ đồ 4-2-3-1: Cách Man Utd khai thác tối đa khoảng trống nách trung lộ",
    summary: "Sự cơ động của Bruno Fernandes cùng các pha di chuyển không bóng thông minh của tiền đạo cắm mở ra vô số phương án tiếp cận cầu môn đối phương.",
    image: NEWS_IMAGES[7],
    publishedAt: "9 ngày trước",
    category: "Chiến thuật",
    author: "Hoàng An",
    commentCount: 41
  },
  {
    id: "mu-n-33",
    leagueId: 39,
    title: "Man Utd hướng đến mục tiêu vô địch Europa League để lấy vé dự Champions League",
    summary: "Đấu trường châu Âu là mục tiêu tối thượng mà thầy trò Quỷ Đỏ quyết tâm chinh phục bằng chiều sâu lực lượng đồng đều.",
    image: NEWS_IMAGES[0],
    publishedAt: "10 ngày trước",
    category: "Cúp C2",
    author: "Hồng Duy",
    commentCount: 75
  },
  {
    id: "mu-n-34",
    leagueId: 39,
    title: "Cặp trung vệ thép De Ligt - Martínez: Bức tường kiên cố trước khung thành Quỷ Đỏ",
    summary: "Sự dũng mãnh của De Ligt hòa quyện hoàn hảo cùng khả năng phán đoán và bọc lót tinh tế của 'Gã đồ tể' Lisandro Martínez.",
    image: NEWS_IMAGES[1],
    publishedAt: "10 ngày trước",
    category: "Ngôi sao",
    author: "Đỗ Tuấn",
    commentCount: 58
  },
  {
    id: "mu-n-35",
    leagueId: 39,
    title: "Man Utd tri ân thủ môn Tom Heaton với vai trò cố vấn chuyên môn và gương mẫu phòng thay đồ",
    summary: "Kinh nghiệm dày dặn của thủ thành kỳ cựu là điểm tựa tinh thần quý báu cho các thủ môn trẻ tại câu lạc bộ.",
    image: NEWS_IMAGES[2],
    publishedAt: "11 ngày trước",
    category: "Nhân vật",
    author: "Quang Dũng",
    commentCount: 28
  },
  {
    id: "mu-n-36",
    leagueId: 39,
    title: "Khám phá phòng truyền thống Old Trafford: Nơi lưu giữ hàng trăm chiếc cúp vô địch",
    summary: "Mỗi hiện vật, chiếc áo đấu và huy chương là một câu chuyện lịch sử hào hùng làm nên tên tuổi của câu lạc bộ vĩ đại nhất nước Anh.",
    image: NEWS_IMAGES[3],
    publishedAt: "11 ngày trước",
    category: "Lịch sử",
    author: "VnExpress",
    commentCount: 66
  },
  {
    id: "mu-n-37",
    leagueId: 39,
    title: "Man Utd sẵn sàng cạnh tranh chữ ký tài năng trẻ đắt giá tại Nam Mỹ",
    summary: "Mạng lưới tuyển trạch viên tại Brazil và Argentina tiếp tục tìm kiếm những tài năng triển vọng nhằm bổ sung sức mạnh cho tương lai.",
    image: NEWS_IMAGES[4],
    publishedAt: "12 ngày trước",
    category: "Chuyển nhượng",
    author: "Vy Anh",
    commentCount: 47
  },
  {
    id: "mu-n-38",
    leagueId: 39,
    title: "Bản lĩnh sân nhà Old Trafford: Tỷ lệ chiến thắng vượt mốc 75% mùa giải này",
    summary: "Sự cuồng nhiệt từ bốn góc khán đài luôn là nguồn động lực to lớn giúp Quỷ Đỏ áp đảo mọi vị khách viếng thăm Nhà Hát Của Những Giấc Mơ.",
    image: NEWS_IMAGES[5],
    publishedAt: "12 ngày trước",
    category: "Thống kê",
    author: "Thanh Quý",
    commentCount: 54
  },
  {
    id: "mu-n-39",
    leagueId: 39,
    title: "Thủ quân Bruno Fernandes cán mốc 100 bàn thắng và kiến tạo tại Ngoại Hạng Anh",
    summary: "Cột mốc chói lọi khẳng định vị thế của một trong những tiền vệ tấn công xuất sắc và hiệu quả nhất bóng đá hiện đại.",
    image: NEWS_IMAGES[6],
    publishedAt: "13 ngày trước",
    category: "Kỷ lục",
    author: "Hồng Duy",
    commentCount: 92
  },
  {
    id: "mu-n-40",
    leagueId: 39,
    title: "Man Utd khép lại tháng thi đấu thăng hoa với chuỗi 5 trận bất bại liên tiếp",
    summary: "Tín hiệu lạc quan từ lối chơi kỷ luật và tinh thần đoàn kết báo hiệu sự trở lại mạnh mẽ của Quỷ Đỏ trong chặng đua đường trường.",
    image: NEWS_IMAGES[7],
    publishedAt: "14 ngày trước",
    category: "Toàn cảnh",
    author: "Đỗ Tuấn",
    commentCount: 125,
    isHot: true
  }
];

export function getTeamNews(teamName: string, leagueId: number = 39): ArticleItem[] {
  const normalized = teamName.toLowerCase();
  if (normalized.includes('manchester united') || normalized.includes('man utd') || normalized.includes('mu')) {
    return MAN_UTD_DEDICATED_NEWS;
  }

  // Generate 40 tailored news articles for any other team
  const categories = ["Tiêu điểm", "Nhận định", "Ngôi sao", "Chuyển nhượng", "Chiến thuật", "Hậu trường", "Phỏng vấn", "Toàn cảnh"];
  const authors = ["Quang Dũng", "Hồng Duy", "Vy Anh", "Hoàng An", "Đỗ Tuấn", "Anh Quân", "VnExpress Thể Thao"];
  const headlines = [
    `HLV trưởng khẳng định ${teamName} đang bước vào giai đoạn thăng hoa nhất`,
    `${teamName} xúc tiến gia hạn hợp đồng với các trụ cột không thể thay thế`,
    `Góc chiến thuật: Lối đá tấn công rực lửa và kỷ luật của ${teamName}`,
    `Dàn sao ${teamName} quyết tâm giành trọn 3 điểm trong trận cầu tâm điểm sắp tới`,
    `Tình hình lực lượng ${teamName}: Trụ cột bình phục chấn thương và sẵn sàng đá chính`,
    `${teamName} lên kế hoạch bổ sung tân binh chất lượng trong kỳ chuyển nhượng`,
    `Người hâm mộ ${teamName} vỡ òa với bàn thắng quyết định ở những phút bù giờ`,
    `Thống kê ấn tượng: ${teamName} duy trì chuỗi bất bại đáng nể trên sân nhà`,
    `Đội trưởng ${teamName} chia sẻ về tinh thần đoàn kết và khát khao danh hiệu`,
    `Khám phá chế độ tập luyện cường độ cao của các cầu thủ ${teamName}`,
    `Chuyên gia nhận định cơ hội bứt phá của ${teamName} trong cuộc đua vô địch`,
    `${teamName} đạt thỏa thuận hợp tác thương mại mới nâng tầm thương hiệu`,
    `Tài năng trẻ ${teamName} tỏa sáng rực rỡ và ghi điểm với ban huấn luyện`,
    `Toàn cảnh phòng thay đồ ${teamName} sau chiến thắng giòn giã cuối tuần qua`,
    `Điểm tựa sân nhà tiếp tục là pháo đài bất khả xâm phạm của ${teamName}`,
    `Phân tích các tình huống cố định: Vũ khí lợi hại giúp ${teamName} định đoạt trận đấu`,
    `Thủ môn ${teamName} nhận giải Cầu thủ xuất sắc nhất tháng với chuỗi trận sạch lưới`,
    `${teamName} sẵn sàng đối đầu các thử thách cam go tại đấu trường cúp`,
    `Nhìn lại những khoảnh khắc đáng nhớ nhất của ${teamName} từ đầu mùa giải`,
    `Huyền thoại ca ngợi bản lĩnh thi đấu và chiều sâu lực lượng của ${teamName}`,
    `Cổ động viên ${teamName} tiếp tục phủ kín các khán đài trong mọi trận đấu`,
    `${teamName} áp dụng công nghệ phân tích dữ liệu thể thao hiện đại bậc nhất`,
    `Cặp tiền vệ trung tâm ${teamName} làm chủ hoàn toàn tuyến giữa`,
    `Chiến thuật pressing tầm cao mang lại hiệu quả vượt bậc cho ${teamName}`,
    `${teamName} tăng tốc trên bảng xếp hạng với lối chơi biến hóa linh hoạt`,
    `Hậu vệ cánh ${teamName} tạo dấu ấn với khả năng lên công về thủ bền bỉ`,
    `Khát khao chiến thắng là động lực đưa ${teamName} vượt qua mọi áp lực`,
    `${teamName} tổ chức ngày hội giao lưu ấm áp cùng cộng đồng người hâm mộ`,
    `Tiền đạo chủ lực ${teamName} nhắm đến danh hiệu Vua phá lưới mùa giải này`,
    `Nhịp đập ${teamName}: Tổng hợp các bàn thắng đẹp nhất trong tuần`,
    `Bí quyết giúp hàng thủ ${teamName} hóa giải các ngòi nổ nguy hiểm của đối phương`,
    `Ban lãnh đạo ${teamName} khẳng định định hướng phát triển bền vững lâu dài`,
    `${teamName} sẵn sàng bước vào giai đoạn tăng tốc với lịch thi đấu dày đặc`,
    `Những bài học chiến thuật quý giá giúp ${teamName} ngày càng hoàn thiện`,
    `Tiếng nói từ các cựu danh thủ về tương lai tươi sáng của ${teamName}`,
    `${teamName} chuẩn bị kỹ lưỡng cho trận đại chiến nảy lửa cuối tuần này`,
    `Tỷ lệ kiểm soát bóng vượt trội phản ánh đẳng cấp vượt bậc của ${teamName}`,
    `Đội ngũ y tế ${teamName} đảm bảo thể lực sung mãn nhất cho toàn đội`,
    `Cột mốc lịch sử mới được các cầu thủ ${teamName} thiết lập mùa giải năm nay`,
    `${teamName} khép lại chặng đường khởi đầu ấn tượng với niềm tin mãnh liệt`
  ];

  return headlines.map((title, idx) => ({
    id: `team-news-${idx + 1}`,
    leagueId,
    title,
    summary: `Toàn cảnh phong độ, chiến thuật và thông tin độc quyền mới nhất của CLB ${teamName} được cập nhật liên tục trên VnExpress Thể Thao.`,
    image: NEWS_IMAGES[idx % NEWS_IMAGES.length],
    publishedAt: idx === 0 ? "20 phút trước" : idx < 3 ? `${idx + 1} giờ trước` : idx < 20 ? `${Math.floor(idx / 2)} giờ trước` : `${Math.floor(idx / 5)} ngày trước`,
    category: categories[idx % categories.length],
    author: authors[idx % authors.length],
    commentCount: 25 + ((idx * 13) % 120),
    isHot: idx < 2
  }));
}

export function getAllFootballNews(): ArticleItem[] {
  return [
    {
      id: "gen-1",
      leagueId: 39,
      title: "Man City đại chiến Arsenal: Cuộc thư hùng định đoạt ngôi vương Ngoại Hạng Anh",
      summary: "HLV Pep Guardiola và Mikel Arteta bước vào trận cầu tâm điểm với toan tính chiến thuật đỉnh cao, nơi từng mét vuông trên sân đều là điểm nóng tranh chấp nảy lửa.",
      image: NEWS_IMAGES[0],
      publishedAt: "15 phút trước",
      category: "Ngoại Hạng Anh",
      author: "Đỗ Tuấn",
      commentCount: 142,
      isHot: true
    },
    {
      id: "gen-2",
      leagueId: 340,
      title: "Công An Hà Nội đánh bại Nam Định: Khẳng định sức mạnh ứng viên số 1 ngôi vương V-League",
      summary: "Sự cơ động của dàn tuyển thủ quốc gia Quang Hải, Văn Thanh cùng bản năng sát thủ của ngoại binh giúp CAHN thắng thuyết phục trên sân Hàng Đẫy.",
      image: NEWS_IMAGES[2],
      publishedAt: "30 phút trước",
      category: "V-League",
      author: "Lâm Thỏa",
      commentCount: 89,
      isHot: true
    },
    {
      id: "gen-3",
      leagueId: 2,
      title: "Cúp C1 Châu Âu: Real Madrid và Bayern Munich so kè từng điểm số tại vòng phân hạng mới",
      summary: "Thể thức thi đấu mới của UEFA Champions League mang lại sự kịch tính nghẹt thở khi các ông lớn châu Âu không còn đường lùi ở mỗi lượt trận.",
      image: NEWS_IMAGES[1],
      publishedAt: "45 phút trước",
      category: "Cúp C1",
      author: "Hồng Duy",
      commentCount: 168,
      isHot: true
    },
    {
      id: "gen-4",
      leagueId: 140,
      title: "El Clasico rực lửa: Barcelona và Real Madrid cạnh tranh ngôi đầu La Liga",
      summary: "Lamine Yamal cùng dàn sao trẻ Barca đối đầu Mbappe và Vinicius trong trận siêu kinh điển được hàng trăm triệu tín đồ túc cầu trông đợi.",
      image: NEWS_IMAGES[4],
      publishedAt: "1 giờ trước",
      category: "La Liga",
      author: "Quang Dũng",
      commentCount: 135
    },
    {
      id: "gen-5",
      leagueId: 39,
      title: "Erling Haaland lập kỷ lục 10 bàn sau 6 vòng: 'Cỗ máy ghi bàn' không thể cản phá",
      summary: "Tiền đạo người Na Uy tiếp tục xô đổ những cột mốc vĩ đại nhất lịch sử giải đấu với hiệu suất làm bàn đạt hơn 1.6 bàn mỗi trận.",
      image: NEWS_IMAGES[3],
      publishedAt: "1 giờ trước",
      category: "Ngoại Hạng Anh",
      author: "Vy Anh",
      commentCount: 88
    },
    {
      id: "gen-6",
      leagueId: 135,
      title: "Serie A rực lửa: Inter Milan và Juventus so kè quyết liệt trong cuộc đua Scudetto",
      summary: "Sự trỗi dậy của các hàng thủ thép cùng những đòn phản công chớp nhoáng đang định hình diện mạo kịch tính tại giải bóng đá số một nước Ý.",
      image: NEWS_IMAGES[5],
      publishedAt: "2 giờ trước",
      category: "Serie A",
      author: "Hoàng An",
      commentCount: 64
    },
    {
      id: "gen-7",
      leagueId: 78,
      title: "Bundesliga: Bayern Munich lấy lại vị thế thống trị dưới sự dẫn dắt của Harry Kane",
      summary: "Hàng công Hùm Xám xứ Bavaria ghi trung bình hơn 3.5 bàn mỗi trận, bỏ xa các đối thủ bám đuổi như Leverkusen hay Dortmund.",
      image: NEWS_IMAGES[6],
      publishedAt: "3 giờ trước",
      category: "Bundesliga",
      author: "Anh Quân",
      commentCount: 52
    },
    {
      id: "gen-8",
      leagueId: 61,
      title: "Ligue 1: PSG tăng tốc, Marseille và Monaco bám đuổi nghẹt thở",
      summary: "Dù chia tay những siêu sao lớn, tập thể PSG dưới bàn tay Luis Enrique thi đấu gắn kết và kiểm soát thế trận vượt trội.",
      image: NEWS_IMAGES[7],
      publishedAt: "4 giờ trước",
      category: "Ligue 1",
      author: "Xuân Bình",
      commentCount: 41
    },
    {
      id: "gen-9",
      leagueId: 340,
      title: "Nguyễn Xuân Son (Rafaelson) tiếp tục bùng nổ: Niềm hy vọng số một của Thép Xanh Nam Định",
      summary: "Sau khi hoàn tất thủ tục nhập tịch, chân sút thi đấu đầy thăng hoa và cống hiến những bàn thắng đẳng cấp cho người hâm mộ thành Nam.",
      image: NEWS_IMAGES[2],
      publishedAt: "5 giờ trước",
      category: "V-League",
      author: "Đức Đồng",
      commentCount: 114
    },
    {
      id: "gen-10",
      leagueId: 253,
      title: "Lionel Messi dẫn dắt Inter Miami chinh phục chiếc cúp Supporters' Shield lịch sử",
      summary: "Những siêu phẩm đá phạt hàng rào và đường kiến tạo thiên tài của siêu sao người Argentina tạo nên cơn sốt bóng đá chưa từng có tại Mỹ.",
      image: NEWS_IMAGES[0],
      publishedAt: "6 giờ trước",
      category: "MLS",
      author: "Minh Phương",
      commentCount: 180
    },
    {
      id: "gen-11",
      leagueId: 307,
      title: "Cristiano Ronaldo chạm mốc 915 bàn thắng: Huyền thoại không tuổi của làng túc cầu",
      summary: "CR7 tiếp tục thể hiện tinh thần thi đấu bền bỉ và bản lĩnh ghi bàn thượng thừa trong màu áo Al Nassr tại giải VĐQG Ả Rập Xê Út.",
      image: NEWS_IMAGES[1],
      publishedAt: "7 giờ trước",
      category: "Saudi League",
      author: "Thanh Quý",
      commentCount: 195
    },
    {
      id: "gen-12",
      leagueId: 3,
      title: "Europa League: Những bất ngờ thú vị và cuộc cạnh tranh vé vào vòng knock-out",
      summary: "Các CLB giàu truyền thống như Manchester United, Tottenham và Roma đang phải chiến đấu cật lực để khẳng định vị thế tại đấu trường hạng hai châu Âu.",
      image: NEWS_IMAGES[3],
      publishedAt: "8 giờ trước",
      category: "Cúp C2",
      author: "VnExpress",
      commentCount: 77
    },
    {
      id: "gen-13",
      leagueId: 39,
      title: "Liverpool thăng hoa dưới thời Arne Slot: Bí quyết nằm ở sự cân bằng công thủ",
      summary: "The Kop duy trì vị thế dẫn đầu nhờ hàng phòng ngự thép do Van Dijk chỉ huy cùng phong độ ghi bàn đều đặn của Mohamed Salah.",
      image: NEWS_IMAGES[4],
      publishedAt: "9 giờ trước",
      category: "Ngoại Hạng Anh",
      author: "Quang Dũng",
      commentCount: 92
    },
    {
      id: "gen-14",
      leagueId: 39,
      title: "Cole Palmer nhận giải Cầu thủ xuất sắc nhất tháng: Niềm tự hào của Chelsea",
      summary: "Tài năng trẻ người Anh in dấu giày vào hơn 70% số bàn thắng của The Blues kể từ đầu mùa giải với khả năng kiến thiết thượng thặng.",
      image: NEWS_IMAGES[5],
      publishedAt: "10 giờ trước",
      category: "Ngoại Hạng Anh",
      author: "Đỗ Tuấn",
      commentCount: 84
    },
    {
      id: "gen-15",
      leagueId: 140,
      title: "Kylian Mbappe tìm lại bản năng sát thủ trong màu áo Real Madrid",
      summary: "Cú đúp vào lưới đối thủ tại vòng đấu gần nhất giải tỏa áp lực đè nặng lên tiền đạo người Pháp, mở ra giai đoạn bùng nổ tiếp theo.",
      image: NEWS_IMAGES[6],
      publishedAt: "11 giờ trước",
      category: "La Liga",
      author: "Vy Anh",
      commentCount: 110
    },
    {
      id: "gen-16",
      leagueId: 140,
      title: "Hansi Flick biến Barcelona thành cỗ máy pressing nghẹt thở tại La Liga",
      summary: "Sự kết hợp giữa kinh nghiệm của Lewandowski và sức trẻ của Lamine Yamal, Pedri tạo nên sức ép khổng lồ lên mọi đối thủ.",
      image: NEWS_IMAGES[7],
      publishedAt: "12 giờ trước",
      category: "La Liga",
      author: "Hồng Duy",
      commentCount: 98
    },
    {
      id: "gen-17",
      leagueId: 78,
      title: "Bayer Leverkusen quyết tâm bảo vệ ngôi vương trước sự bám đuổi của Bayern",
      summary: "HLV Xabi Alonso giữ nguyên triết lý bóng đá quyến rũ và tinh thần không bỏ cuộc cho đến những giây bù giờ cuối cùng.",
      image: NEWS_IMAGES[0],
      publishedAt: "13 giờ trước",
      category: "Bundesliga",
      author: "Hoàng An",
      commentCount: 45
    },
    {
      id: "gen-18",
      leagueId: 135,
      title: "Napoli hồi sinh thần tốc dưới sự chỉ đạo sắt đá của Antonio Conte",
      summary: "Đội bóng miền Nam nước Ý leo lên vị trí dẫn đầu Serie A nhờ lối chơi thực dụng và phong độ chói sáng của Romelu Lukaku.",
      image: NEWS_IMAGES[1],
      publishedAt: "14 giờ trước",
      category: "Serie A",
      author: "Anh Quân",
      commentCount: 63
    },
    {
      id: "gen-19",
      leagueId: 340,
      title: "Hà Nội FC quyết tâm trở lại đường đua vô địch V-League sau kỳ nghỉ FIFA Days",
      summary: "HLV và ban huấn luyện tích cực cải thiện khâu dứt điểm và củng cố hàng thủ nhằm hướng tới chuỗi trận toàn thắng.",
      image: NEWS_IMAGES[2],
      publishedAt: "15 giờ trước",
      category: "V-League",
      author: "Lâm Thỏa",
      commentCount: 73
    },
    {
      id: "gen-20",
      leagueId: 340,
      title: "Sông Lam Nghệ An trao cơ hội cho lứa cầu thủ trẻ tài năng tại V-League",
      summary: "Bản sắc đào tạo trẻ xứ Nghệ tiếp tục được phát huy khi các mầm non tương lai từng bước khẳng định năng lực tại giải đấu cao nhất.",
      image: NEWS_IMAGES[3],
      publishedAt: "16 giờ trước",
      category: "V-League",
      author: "Đức Đồng",
      commentCount: 57
    },
    {
      id: "gen-21",
      leagueId: 39,
      title: "Aston Villa sẵn sàng gây địa chấn trước các thế lực truyền thống Ngoại Hạng Anh",
      summary: "Unai Emery chứng minh đẳng cấp chiến thuật khi đưa Aston Villa cạnh tranh sòng phẳng ở cả giải quốc nội lẫn cúp C1 châu Âu.",
      image: NEWS_IMAGES[4],
      publishedAt: "1 ngày trước",
      category: "Ngoại Hạng Anh",
      author: "Xuân Bình",
      commentCount: 39
    },
    {
      id: "gen-22",
      leagueId: 2,
      title: "Thể thức Champions League mới: Các cuộc đối đầu rực lửa ngay từ vòng bảng",
      summary: "Người hâm mộ được chứng kiến những cặp đấu thượng đỉnh giữa Man City, Real Madrid, PSG và Bayern Munich ngay từ giai đoạn đầu.",
      image: NEWS_IMAGES[5],
      publishedAt: "1 ngày trước",
      category: "Cúp C1",
      author: "Hồng Duy",
      commentCount: 154
    },
    {
      id: "gen-23",
      leagueId: 39,
      title: "Tottenham và triết lý bóng đá vị nghệ thuật của HLV Ange Postecoglou",
      summary: "Dù gặp nhiều rủi ro trong phòng ngự phản công, lối đá cống hiến của Spurs vẫn nhận được sự tán thưởng nồng nhiệt từ người hâm mộ.",
      image: NEWS_IMAGES[6],
      publishedAt: "1 ngày trước",
      category: "Ngoại Hạng Anh",
      author: "Quang Dũng",
      commentCount: 66
    },
    {
      id: "gen-24",
      leagueId: 140,
      title: "Atletico Madrid củng cố hàng phòng ngự với sự chỉ đạo của Diego Simeone",
      summary: "Đội chủ sân Metropolitano luôn là đối thủ khó nhằn nhất châu Âu với khối phòng ngự kỷ luật cùng những pha phản công sắc bén.",
      image: NEWS_IMAGES[7],
      publishedAt: "1 ngày trước",
      category: "La Liga",
      author: "Đỗ Tuấn",
      commentCount: 42
    },
    {
      id: "gen-25",
      leagueId: 78,
      title: "Borussia Dortmund đẩy mạnh phát triển tài năng trẻ tại Signal Iduna Park",
      summary: "Bức tường vàng luôn là bệ phóng hoàn hảo cho những ngôi sao trẻ triển vọng vươn tầm đẳng cấp thế giới.",
      image: NEWS_IMAGES[0],
      publishedAt: "2 ngày trước",
      category: "Bundesliga",
      author: "Hoàng An",
      commentCount: 33
    },
    {
      id: "gen-26",
      leagueId: 135,
      title: "AC Milan tìm lại phong độ chiến thắng nhờ sự cơ động nơi hành lang cánh",
      summary: "Rafael Leao và các đồng đội thi đấu bùng nổ, mang lại niềm tin lớn cho các CĐV áo sọc đỏ đen thành Milano.",
      image: NEWS_IMAGES[1],
      publishedAt: "2 ngày trước",
      category: "Serie A",
      author: "Vy Anh",
      commentCount: 48
    },
    {
      id: "gen-27",
      leagueId: 61,
      title: "Monaco thể hiện phong độ ấn tượng trong cuộc đua song mã với PSG tại Ligue 1",
      summary: "Dàn cầu thủ trẻ trung đầy nhiệt huyết của đội bóng công quốc thi đấu mạch lạc và sẵn sàng thách thức ngôi vương nước Pháp.",
      image: NEWS_IMAGES[2],
      publishedAt: "2 ngày trước",
      category: "Ligue 1",
      author: "Xuân Bình",
      commentCount: 29
    },
    {
      id: "gen-28",
      leagueId: 340,
      title: "Becamex Bình Dương củng cố vị trí nửa trên bảng xếp hạng với lối chơi chặt chẽ",
      summary: "Tiến Linh cùng các đồng đội thi đấu kỷ luật và tận dụng triệt để những cơ hội phản công sắc bén trên sân nhà Gò Đậu.",
      image: NEWS_IMAGES[3],
      publishedAt: "2 ngày trước",
      category: "V-League",
      author: "Lâm Thỏa",
      commentCount: 61
    },
    {
      id: "gen-29",
      leagueId: 307,
      title: "Al Hilal duy trì mạch trận toàn thắng kỷ lục tại giải VĐQG Ả Rập Xê Út",
      summary: "Sức mạnh vượt trội từ dàn ngoại binh đẳng cấp châu Âu giúp Al Hilal độc chiếm ngôi đầu bảng xếp hạng Saudi Pro League.",
      image: NEWS_IMAGES[4],
      publishedAt: "3 ngày trước",
      category: "Saudi League",
      author: "Thanh Quý",
      commentCount: 71
    },
    {
      id: "gen-30",
      leagueId: 253,
      title: "MLS đón nhận làn sóng chú ý toàn cầu nhờ sự xuất hiện của các siêu sao thế giới",
      summary: "Số lượng khán giả đến sân và lượng người theo dõi truyền hình trực tiếp tăng vọt tạo nên bước ngoặt lịch sử cho bóng đá Bắc Mỹ.",
      image: NEWS_IMAGES[5],
      publishedAt: "3 ngày trước",
      category: "MLS",
      author: "Minh Phương",
      commentCount: 88
    },
    {
      id: "gen-31",
      leagueId: 45,
      title: "FA Cup: Những câu chuyện cổ tích và bất ngờ thú vị của các đội bóng hạng dưới",
      summary: "Giải đấu lâu đời nhất hành tinh tiếp tục mang lại những phút giây nghẹt thở nơi tinh thần quả cảm đánh bại mọi toan tính tiền bạc.",
      image: NEWS_IMAGES[6],
      publishedAt: "3 ngày trước",
      category: "FA Cup",
      author: "Anh Quân",
      commentCount: 43
    },
    {
      id: "gen-32",
      leagueId: 48,
      title: "Carabao Cup bước vào vòng đấu loại trực tiếp căng thẳng và quyết liệt",
      summary: "Các đội bóng Ngoại Hạng Anh dồn lực chinh phục danh hiệu cúp đầu tiên của mùa giải với toan tính nhân sự kỹ lưỡng.",
      image: NEWS_IMAGES[7],
      publishedAt: "3 ngày trước",
      category: "Carabao Cup",
      author: "Đỗ Tuấn",
      commentCount: 35
    },
    {
      id: "gen-33",
      leagueId: 39,
      title: "Newcastle United đặt mục tiêu trở lại đấu trường cúp châu Âu mùa tới",
      summary: "Lối đá giàu thể lực và áp sát quyết liệt tại St James' Park tiếp tục là vũ khí lợi hại của Chích Chòe vùng Đông Bắc.",
      image: NEWS_IMAGES[0],
      publishedAt: "4 ngày trước",
      category: "Ngoại Hạng Anh",
      author: "Quang Dũng",
      commentCount: 50
    },
    {
      id: "gen-34",
      leagueId: 39,
      title: "Brighton tiếp tục là hiện tượng thú vị với khả năng phát hiện tài năng phi thường",
      summary: "Mô hình vận hành thông minh giúp Chim Mòng Biển duy trì sự ổn định và lối chơi hấp dẫn dù liên tục chia tay các trụ cột.",
      image: NEWS_IMAGES[1],
      publishedAt: "4 ngày trước",
      category: "Ngoại Hạng Anh",
      author: "Vy Anh",
      commentCount: 41
    },
    {
      id: "gen-35",
      leagueId: 140,
      title: "Girona khẳng định năng lực thi đấu đỉnh cao sau mùa giải lịch sử",
      summary: "Đại diện xứ Catalunya tiếp tục cống hiến lối chơi tấn công phóng khoáng và tự tin trước mọi đối thủ tại La Liga.",
      image: NEWS_IMAGES[2],
      publishedAt: "4 ngày trước",
      category: "La Liga",
      author: "Hồng Duy",
      commentCount: 28
    },
    {
      id: "gen-36",
      leagueId: 78,
      title: "RB Leipzig duy trì thế bám đuổi quyết liệt trong nhóm dự Champions League",
      summary: "Sức trẻ và tốc độ trong các pha chuyển đổi trạng thái giúp RB Leipzig tạo nên những chiến thắng thuyết phục trên sân nhà.",
      image: NEWS_IMAGES[3],
      publishedAt: "4 ngày trước",
      category: "Bundesliga",
      author: "Hoàng An",
      commentCount: 22
    },
    {
      id: "gen-37",
      leagueId: 135,
      title: "Lazio và AS Roma chuẩn bị cho trận derby thành Rome rực lửa",
      summary: "Bầu không khí căng thẳng và thù địch truyền thống hứa hẹn một trận cầu nảy lửa không khoan nhượng tại thánh địa Olimpico.",
      image: NEWS_IMAGES[4],
      publishedAt: "5 ngày trước",
      category: "Serie A",
      author: "Anh Quân",
      commentCount: 65
    },
    {
      id: "gen-38",
      leagueId: 340,
      title: "Hải Phòng FC và chảo lửa Lạch Tray: Nguồn năng lượng bất tận cho bóng đá đất Cảng",
      summary: "Sự cổ vũ cuồng nhiệt từ người hâm mộ biến sân Lạch Tray thành điểm đến đầy cạm bẫy với bất kỳ đội bóng nào tại V-League.",
      image: NEWS_IMAGES[5],
      publishedAt: "5 ngày trước",
      category: "V-League",
      author: "Đức Đồng",
      commentCount: 49
    },
    {
      id: "gen-39",
      leagueId: 2,
      title: "Cuộc đua vua phá lưới Champions League nóng bỏng với sự góp mặt của các siêu sao",
      summary: "Kane, Haaland, Mbappe và Lewandowski so kè từng bàn thắng trên hành trình tìm kiếm vinh quang cá nhân và tập thể.",
      image: NEWS_IMAGES[6],
      publishedAt: "5 ngày trước",
      category: "Cúp C1",
      author: "Quang Dũng",
      commentCount: 105
    },
    {
      id: "gen-40",
      leagueId: 39,
      title: "Toàn cảnh vòng đấu Ngoại Hạng Anh: Kịch tính đến những phút bù giờ cuối cùng",
      summary: "Những bàn thắng vàng ở phút 90+ tiếp tục chứng minh sự hấp dẫn và khó lường bậc nhất của giải bóng đá hấp dẫn nhất hành tinh.",
      image: NEWS_IMAGES[7],
      publishedAt: "5 ngày trước",
      category: "Ngoại Hạng Anh",
      author: "Đỗ Tuấn",
      commentCount: 138,
      isHot: true
    }
  ];
}
