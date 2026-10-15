import React, { useState, useMemo } from 'react';
import { Newspaper, X } from 'lucide-react';
import { ArticleItem, FixtureItem } from '../../types/football';
import { getTeamNews } from '../../data/mockLeagueNews';

interface TabMatchNewsProps {
  news?: ArticleItem[];
  matchHeadline?: string;
  fixture?: FixtureItem;
}

const formatPublishTime = (timeStr?: string): string => {
  if (!timeStr) return "Vừa xong";
  return timeStr
    .replace(/(\d+)\s*phút\s*trước/i, "$1' trước")
    .replace(/(\d+)\s*giờ\s*trước/i, "$1h trước");
};

export const TabMatchNews: React.FC<TabMatchNewsProps> = ({ news = [], fixture }) => {
  const [readingArticle, setReadingArticle] = useState<ArticleItem | null>(null);

  // Lấy tin tức của cả 2 đội bóng trong cặp đấu này, tối đa 20 tin
  const articlesList: ArticleItem[] = useMemo(() => {
    if (!fixture) return news.slice(0, 20);

    const homeNews = getTeamNews(fixture.teams.home.name, fixture.league.id);
    const awayNews = getTeamNews(fixture.teams.away.name, fixture.league.id);

    // Xen kẽ tin bài giữa 2 đội để tạo dòng sự kiện phong phú và cân bằng
    const combined: ArticleItem[] = [];
    const maxLen = Math.max(homeNews.length, awayNews.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < homeNews.length) combined.push(homeNews[i]);
      if (i < awayNews.length) combined.push(awayNews[i]);
      if (combined.length >= 20) break;
    }

    return combined.slice(0, 20);
  }, [fixture, news]);

  const leagueName = fixture?.league.vietnameseName || fixture?.league.name || 'Bóng đá';

  return (
    <div className="space-y-4 font-bai">
      {/* Danh sách tin tức của cả 2 đội: 1 hàng duy nhất theo format chuẩn VnExpress */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-3.5 sm:p-5">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9f224e]"></span>
            <h2 className="text-sm sm:text-base font-bold text-[#222222] uppercase tracking-tight">
              {fixture ? `Tin tức ${fixture.teams.home.name} & ${fixture.teams.away.name}` : 'Tin tức trận đấu'}
            </h2>
          </div>
          <span className="text-xs text-[#757575] font-mono">
            {articlesList.length} bài viết
          </span>
        </div>

        <div className="divide-y divide-[#f0f0f0]">
          {articlesList.map((item) => {
            const timeAgo = formatPublishTime(item.publishedAt);

            return (
              <article
                key={item.id}
                onClick={() => setReadingArticle(item)}
                className="py-3.5 sm:py-4 first:pt-0 last:pb-0 group cursor-pointer flex gap-3.5 sm:gap-4 md:gap-5 items-start"
              >
                {/* Thumbnail 16:10 */}
                <div className="w-32 sm:w-48 md:w-56 aspect-[16/10] rounded overflow-hidden bg-gray-100 flex-shrink-0 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Nội dung bên phải */}
                <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5">
                  <h3 className="font-serif-vne text-sm sm:text-base md:text-[17px] font-bold text-[#222222] group-hover:text-[#9f224e] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] md:text-sm text-[#4f4f4f] line-clamp-2 sm:line-clamp-3 leading-relaxed font-sans">
                    {item.summary}
                  </p>

                  {/* Meta: Thời gian + Thư mục giải đấu */}
                  <div className="flex items-center gap-3 text-xs text-[#757575] font-bai pt-0.5 sm:pt-1">
                    <span>{timeAgo}</span>
                    <span className="hover:text-[#9f224e] transition-colors">{leagueName}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Article Detail Reader Modal */}
      {readingArticle && (
        <div 
          onClick={() => setReadingArticle(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
              <div className="flex items-center gap-2 text-xs font-bold text-[#9f224e] uppercase">
                <Newspaper className="w-4 h-4" />
                <span>VnExpress Thể Thao</span>
              </div>
              <button
                onClick={() => setReadingArticle(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-gray-950 leading-tight">
                {readingArticle.title}
              </h2>

              <div className="flex items-center justify-between text-xs text-gray-500 pb-3 border-b border-gray-100">
                <span>{readingArticle.publishedAt} (GMT+7)</span>
              </div>

              <div className="rounded-xl overflow-hidden aspect-16/10">
                <img src={readingArticle.image} alt={readingArticle.title} className="w-full h-full object-cover" />
              </div>

              <p className="text-sm font-semibold text-gray-800 leading-relaxed bg-gray-50 p-3.5 rounded-xl border-l-3 border-[#9f224e]">
                {readingArticle.summary}
              </p>

              <div className="space-y-3 text-sm text-gray-700 leading-relaxed font-sans">
                <p>
                  Trận cầu đã diễn ra với tốc độ chóng mặt ngay từ những phút đầu tiên. Huấn luyện viên hai đội đã bố trí đội hình chiến thuật tối ưu, tạo nên những màn đối đầu nảy lửa trên khắp các vị trí mặt sân.
                </p>
                <p>
                  Các tình huống xử lý bóng chuẩn xác ở khu vực 1/3 cuối sân cùng khả năng chuyển trạng thái thần tốc đã định đoạt cục diện trận đấu. Khán giả trên các khán đài đã được chứng kiến một bữa tiệc bóng đá đỉnh cao đúng với kỳ vọng.
                </p>
                <p className="italic text-gray-600">
                  Phóng viên VnExpress sẽ tiếp tục cập nhật những phân tích chuyên môn và phản ứng tiếp theo từ phòng thay đồ.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setReadingArticle(null)}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition cursor-pointer"
                >
                  Đóng bài viết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
