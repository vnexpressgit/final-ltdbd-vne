import React, { useState } from 'react';
import { Newspaper, MessageSquare, Clock, User, ChevronRight, X, ExternalLink } from 'lucide-react';
import { ArticleItem } from '../../types/football';

interface TabMatchNewsProps {
  news: ArticleItem[];
  matchHeadline?: string;
}

export const TabMatchNews: React.FC<TabMatchNewsProps> = ({ news, matchHeadline }) => {
  const [readingArticle, setReadingArticle] = useState<ArticleItem | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-4 sm:p-5">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-[#9f224e]" />
          Tin tức liên quan trước và sau trận đấu
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Dòng sự kiện, bài bình luận chuyên sâu và phát biểu của người trong cuộc từ phóng viên VnExpress
        </p>
      </div>

      {/* Featured Headline Article (Top 1) */}
      {news.length > 0 && (
        <div 
          onClick={() => setReadingArticle(news[0])}
          className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden cursor-pointer group hover:border-gray-300 transition-all"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Image (16:9 or 16:10) */}
            <div className="md:col-span-7 overflow-hidden aspect-16/10 bg-gray-900">
              <img 
                src={news[0].image} 
                alt={news[0].title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="md:col-span-5 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#9f224e] uppercase tracking-wider block mb-2">
                  Tiêu điểm sau trận
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#9f224e] transition leading-snug">
                  {news[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed line-clamp-3">
                  {news[0].summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">{news[0].author || 'Ban Thể Thao'}</span>
                  <span>•</span>
                  <span>{news[0].publishedAt}</span>
                </div>
                {news[0].commentCount && (
                  <span className="flex items-center gap-1 text-gray-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{news[0].commentCount}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other 3 News Cards (Grid 3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {news.slice(1).map((item) => (
          <div
            key={item.id}
            onClick={() => setReadingArticle(item)}
            className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden flex flex-col justify-between hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div>
              <div className="aspect-16/10 overflow-hidden bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-200"
                />
              </div>

              <div className="p-4">
                <span className="text-[10px] font-bold text-[#9f224e] uppercase tracking-wider block mb-1.5">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#9f224e] transition line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="px-4 pb-4 pt-2 flex items-center justify-between text-xs text-gray-400 border-t border-gray-50">
              <span className="text-[11px] truncate">{item.author || 'VnExpress'} · {item.publishedAt}</span>
              {item.commentCount && (
                <span className="flex items-center gap-1 text-gray-400 text-[11px]">
                  <MessageSquare className="w-3 h-3" />
                  <span>{item.commentCount}</span>
                </span>
              )}
            </div>
          </div>
        ))}
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
                <span>{readingArticle.category} · VnExpress Thể Thao</span>
              </div>
              <button
                onClick={() => setReadingArticle(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition"
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
                <span className="font-semibold text-gray-700">{readingArticle.author || 'Quang Dũng'}</span>
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
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition"
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
