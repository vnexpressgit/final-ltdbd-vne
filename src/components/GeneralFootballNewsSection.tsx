import React, { useState, useEffect } from 'react';
import { Newspaper, ChevronLeft, ChevronRight } from 'lucide-react';
import { ArticleItem } from '../types/football';
import { getAllFootballNews, getNewsByLeague } from '../data/mockLeagueNews';

interface GeneralFootballNewsSectionProps {
  title?: string;
  leagueId?: number | null;
  leagueName?: string;
}

const LEAGUE_NAMES_MAP: Record<number, string> = {
  39: "Ngoại Hạng Anh",
  340: "V-League",
  2: "Cúp C1 Châu Âu",
  3: "Europa League",
  848: "Cúp C3 Châu Âu",
  140: "La Liga",
  135: "Serie A",
  78: "Bundesliga",
  61: "Ligue 1",
  253: "MLS",
  307: "Saudi Pro League",
  45: "FA Cup",
  48: "Carabao Cup",
  531: "UEFA Super Cup",
};

const getArticleLeagueName = (article: ArticleItem): string => {
  if (article.leagueId && LEAGUE_NAMES_MAP[article.leagueId]) {
    return LEAGUE_NAMES_MAP[article.leagueId];
  }
  if (article.category) {
    if (article.category === "Cúp C1") return "Cúp C1 Châu Âu";
    if (article.category === "Europa League" || article.category === "Cúp C2") return "Europa League";
    return article.category;
  }
  return "Bóng đá";
};

const formatPublishTime = (timeStr?: string): string => {
  if (!timeStr) return "Vừa xong";
  return timeStr
    .replace(/(\d+)\s*phút\s*trước/i, "$1' trước")
    .replace(/(\d+)\s*giờ\s*trước/i, "$1h trước");
};

export const GeneralFootballNewsSection: React.FC<GeneralFootballNewsSectionProps> = ({
  title = "Tin tức Bóng đá",
  leagueId,
  leagueName
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever leagueId changes
  useEffect(() => {
    setCurrentPage(1);
  }, [leagueId]);

  const allNews: ArticleItem[] = leagueId 
    ? getNewsByLeague(leagueId, leagueName || "Giải đấu")
    : getAllFootballNews();

  const sectionTitle = leagueName ? `Tin tức ${leagueName}` : title;
  const pageSize = 20;
  const totalPages = Math.ceil(allNews.length / pageSize) || 1;

  const currentNews = allNews.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById('general-football-news-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="general-football-news-section" className="mt-6 pt-5 border-t border-[#e5e5e5] space-y-3 font-bai">
      {/* Block Header */}
      <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#9f224e] bg-white px-3.5 py-2 rounded-t-lg shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-rose-50 text-[#9f224e] flex items-center justify-center font-bold">
            <Newspaper className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[#222222] uppercase tracking-tight">
            {sectionTitle}
          </h2>
        </div>
        <span className="text-xs text-[#757575] font-bai">
          Trang <span className="font-bold text-[#222222]">{currentPage}</span> / {totalPages} ({allNews.length} tin bài)
        </span>
      </div>

      {/* Main Content Card: 1 hàng duy nhất cho mỗi bài viết chuẩn mẫu thiết kế VnExpress */}
      <div className="bg-white rounded-b-lg border border-[#e5e5e5] overflow-hidden shadow-xs p-3.5 sm:p-5">
        <div className="divide-y divide-[#f0f0f0]">
          {currentNews.map((article) => {
            const league = getArticleLeagueName(article);
            const timeAgo = formatPublishTime(article.publishedAt);

            return (
              <article
                key={article.id}
                className="py-3.5 sm:py-4 first:pt-0 last:pb-0 group cursor-pointer flex gap-3.5 sm:gap-4 md:gap-5 items-start"
              >
                {/* Ảnh thumb bên trái */}
                <div className="w-32 sm:w-48 md:w-56 aspect-[16/10] rounded overflow-hidden bg-gray-100 flex-shrink-0 relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Nội dung bên phải */}
                <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5">
                  <h4 className="font-serif-vne text-sm sm:text-base md:text-[17px] font-bold text-[#222222] group-hover:text-[#9f224e] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h4>

                  <p className="text-xs sm:text-[13px] md:text-sm text-[#4f4f4f] line-clamp-2 sm:line-clamp-3 leading-relaxed font-sans">
                    {article.summary}
                  </p>

                  {/* Meta: Thời gian + Tên giải đấu (thư mục) */}
                  <div className="flex items-center gap-3 text-xs text-[#757575] font-bai pt-0.5 sm:pt-1">
                    <span>{timeAgo}</span>
                    <span className="hover:text-[#9f224e] transition-colors">{league}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Phân trang: 20 tin một trang */}
        {totalPages > 1 && (
          <div className="pt-4 mt-2 border-t border-[#f0f0f0] flex flex-col sm:flex-row items-center justify-between gap-3 font-bai text-xs">
            <span className="text-[#757575]">
              Hiển thị <span className="font-bold text-[#222222]">{(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, allNews.length)}</span> trên <span className="font-bold text-[#222222]">{allNews.length}</span> bài viết
            </span>

            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-2.5 py-1 rounded border border-[#e5e5e5] text-[#38404D] hover:bg-[#f7f8f9] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Trước</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
                <button
                  key={pNum}
                  onClick={() => handlePageChange(pNum)}
                  className={`w-7 h-7 rounded text-xs font-bold transition cursor-pointer ${
                    currentPage === pNum
                      ? 'bg-[#9f224e] text-white shadow-2xs'
                      : 'bg-[#f7f7f8] hover:bg-[#eceef0] text-[#38404D] border border-[#e5e5e5]'
                  }`}
                >
                  {pNum}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1 rounded border border-[#e5e5e5] text-[#38404D] hover:bg-[#f7f8f9] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition cursor-pointer"
              >
                <span>Sau</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
