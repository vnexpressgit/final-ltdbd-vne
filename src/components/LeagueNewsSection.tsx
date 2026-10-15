import React, { useState, useRef, useEffect } from 'react';
import { Newspaper, ChevronLeft, ChevronRight, MessageSquare, Clock, ArrowRight, Flame } from 'lucide-react';
import { ArticleItem } from '../types/football';
import { getNewsByLeague } from '../data/mockLeagueNews';

interface LeagueNewsSectionProps {
  leagueId: number;
  leagueName: string;
}

export const LeagueNewsSection: React.FC<LeagueNewsSectionProps> = ({
  leagueId,
  leagueName
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Reset to page 1 whenever league changes
  useEffect(() => {
    setCurrentPage(1);
  }, [leagueId]);

  const allNews = getNewsByLeague(leagueId, leagueName);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(allNews.length / itemsPerPage) || 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = allNews.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const leadStory = currentNews[0];
  const remainingNews = currentNews.slice(1);

  return (
    <div ref={sectionRef} className="mt-6 pt-5 border-t border-[#e5e5e5] space-y-3 font-bai">
      {/* Block Header */}
      <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#9f224e] bg-white px-3.5 py-2 rounded-t-lg shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-rose-50 text-[#9f224e] flex items-center justify-center font-bold">
            <Newspaper className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#222222] flex items-center gap-2 uppercase tracking-tight">
              <span>Tin tức {leagueName}</span>
              <span className="text-[10px] text-white bg-[#9f224e] px-1.5 py-0.2 rounded font-mono font-bold uppercase tracking-wider">
                Mới nhất
              </span>
            </h2>
            <p className="text-xs text-[#636B79]">
              Nhận định chuyên sâu, phỏng vấn độc quyền và video bàn thắng nổi bật
            </p>
          </div>
        </div>

        <span className="text-xs text-[#636B79] font-mono hidden sm:inline">
          Trang {currentPage} / {totalPages}
        </span>
      </div>

      {/* News List Container */}
      <div className="bg-white rounded-b-lg border border-[#e5e5e5] overflow-hidden shadow-xs p-3.5 sm:p-4 space-y-5">
        
        {/* 1. Lead Featured News Article (VnExpress Headline Style) */}
        {leadStory && (
          <article className="group cursor-pointer pb-5 border-b border-[#f0f0f0]">
            <div className="flex flex-col md:flex-row gap-3.5 sm:gap-4 items-start">
              <div className="w-full md:w-5/12 aspect-video md:aspect-[16/10] overflow-hidden rounded-md bg-gray-100 flex-shrink-0 relative">
                <img
                  src={leadStory.image}
                  alt={leadStory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {leadStory.isHot && (
                  <span className="absolute top-2 left-2 bg-[#DF4670] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm font-bai">
                    <Flame className="w-3 h-3 fill-white" />
                    TIÊU ĐIỂM
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] text-[#757575] font-bai">
                  <span className="text-[#9f224e] font-bold uppercase tracking-wider">
                    {leadStory.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {leadStory.publishedAt}
                  </span>
                  {leadStory.author && (
                    <>
                      <span>•</span>
                      <span className="text-[#38404D] font-medium">Bởi {leadStory.author}</span>
                    </>
                  )}
                </div>

                <h3 className="font-serif-vne text-base sm:text-lg font-bold text-[#222222] group-hover:text-[#9f224e] transition-colors leading-snug">
                  {leadStory.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#636B79] leading-relaxed line-clamp-3">
                  {leadStory.summary}
                </p>

                <div className="pt-1 flex items-center justify-between text-xs font-bai">
                  <span className="text-[#9f224e] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Đọc tiếp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  <span className="text-[#757575] flex items-center gap-1 text-[11px]">
                    <MessageSquare className="w-3 h-3" />
                    <span>{leadStory.commentCount} bình luận</span>
                  </span>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* 2. Remaining 9 News Articles in Clean Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 divide-y md:divide-y-0 divide-[#f0f0f0]">
          {remainingNews.map((article, idx) => (
            <article 
              key={article.id}
              className={`group cursor-pointer flex gap-3 sm:gap-3.5 items-start ${idx > 0 ? 'pt-3 md:pt-0' : ''}`}
            >
              {/* Thumbnail */}
              <div className="w-24 sm:w-28 aspect-[4/3] rounded-md overflow-hidden bg-gray-100 flex-shrink-0 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-[#757575] font-bai">
                  <span className="text-[#9f224e] font-semibold">{article.category}</span>
                  <span>•</span>
                  <span>{article.publishedAt}</span>
                </div>

                <h4 className="font-serif-vne text-xs sm:text-[13px] font-bold text-[#222222] group-hover:text-[#9f224e] transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h4>

                <p className="text-xs text-[#636B79] line-clamp-2 leading-relaxed hidden sm:block">
                  {article.summary}
                </p>

                <div className="flex items-center gap-3 pt-0.5 text-[10px] text-[#757575] font-bai">
                  {article.author && <span>{article.author}</span>}
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-2.5 h-2.5" />
                    <span>{article.commentCount}</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 3. Pagination Controls (Trang trước, 1, 2, 3..., Trang sau) */}
        {totalPages > 1 && (
          <div className="pt-4 border-t border-[#f0f0f0] flex flex-col sm:flex-row items-center justify-between gap-3 select-none font-bai">
            <span className="text-xs text-[#636B79] order-2 sm:order-1">
              Hiển thị tin <strong>{startIndex + 1} - {Math.min(startIndex + itemsPerPage, allNews.length)}</strong> trên tổng số <strong>{allNews.length}</strong> bài viết
            </span>

            <div className="flex items-center gap-1 order-1 sm:order-2">
              {/* Previous Page Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2.5 py-1 rounded-md border border-[#e5e5e5] text-xs font-semibold text-[#38404D] hover:bg-[#f7f8f9] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 transition cursor-pointer"
                title="Trang trước"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Trang trước</span>
              </button>

              {/* Numbered Page Buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-7 h-7 rounded-md text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-[#9f224e] text-white shadow-xs font-mono'
                      : 'bg-[#f7f7f8] hover:bg-[#eceef0] text-[#38404D] border border-[#e5e5e5] font-mono'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              {/* Next Page Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1 rounded-md border border-[#e5e5e5] text-xs font-semibold text-[#38404D] hover:bg-[#f7f8f9] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 transition cursor-pointer"
                title="Trang sau"
              >
                <span className="hidden sm:inline">Trang sau</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
