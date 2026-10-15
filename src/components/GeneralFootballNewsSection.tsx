import React, { useState } from 'react';
import { Newspaper, ChevronLeft, ChevronRight } from 'lucide-react';
import { ArticleItem } from '../types/football';
import { getAllFootballNews } from '../data/mockLeagueNews';

interface GeneralFootballNewsSectionProps {
  title?: string;
}

export const GeneralFootballNewsSection: React.FC<GeneralFootballNewsSectionProps> = ({
  title = "Tin tức Bóng đá"
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const allNews: ArticleItem[] = getAllFootballNews();
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
    <section id="general-football-news-section" className="mt-6 pt-5 border-t border-[#e5e5e5] space-y-3">
      {/* Block Header */}
      <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#9f224e] bg-white px-3.5 py-2 rounded-t-lg shadow-2xs font-bai">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-rose-50 text-[#9f224e] flex items-center justify-center font-bold">
            <Newspaper className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[#222222] uppercase tracking-tight">
            {title}
          </h2>
        </div>
      </div>

      {/* Main Content Card: Shows each item with Title, thumb image, and short description */}
      <div className="bg-white rounded-b-lg border border-[#e5e5e5] overflow-hidden shadow-xs p-3.5 sm:p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5 divide-y md:divide-y-0 divide-[#f0f0f0]">
          {currentNews.map((article, idx) => (
            <article
              key={article.id}
              className={`group cursor-pointer flex gap-3 sm:gap-3.5 items-start ${idx > 0 ? 'pt-3 md:pt-0' : ''}`}
            >
              {/* Ảnh thumb */}
              <div className="w-28 sm:w-36 aspect-[4/3] rounded-md overflow-hidden bg-gray-100 flex-shrink-0 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Title & Description ngắn gọn duy nhất */}
              <div className="flex-1 min-w-0 space-y-1">
                <h4 className="font-serif-vne text-xs sm:text-[13px] font-bold text-[#222222] group-hover:text-[#9f224e] transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-[#636B79] line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Phân trang: 20 tin một trang */}
        {totalPages > 1 && (
          <div className="pt-4 border-t border-[#f0f0f0] flex items-center justify-between font-bai">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs font-semibold rounded-md border border-[#e5e5e5] bg-white text-[#38404D] hover:bg-[#f7f8f9] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Trang trước</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
                <button
                  key={pNum}
                  onClick={() => handlePageChange(pNum)}
                  className={`w-7 h-7 rounded-md text-xs font-bold transition cursor-pointer ${
                    currentPage === pNum
                      ? 'bg-[#9f224e] text-white shadow-2xs'
                      : 'bg-[#f7f7f8] hover:bg-[#eceef0] text-[#38404D] border border-[#e5e5e5]'
                  }`}
                >
                  {pNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs font-semibold rounded-md border border-[#e5e5e5] bg-white text-[#38404D] hover:bg-[#f7f8f9] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition cursor-pointer"
            >
              <span>Trang sau</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
