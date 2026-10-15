import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle, Search, ShieldCheck } from 'lucide-react';

interface SEOSectionProps {
  mode: 'schedule' | 'results';
  selectedDate: string;
}

export const SEOSection: React.FC<SEOSectionProps> = ({ mode, selectedDate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Lịch thi đấu bóng đá hôm nay trên VnExpress gồm những giải đấu nào?",
      a: "Chuyên mục Lịch thi đấu Thể thao VnExpress cung cấp đầy đủ lịch thi đấu của tất cả các giải đấu hàng đầu: Ngoại Hạng Anh (Premier League), Cúp C1 Châu Âu (UEFA Champions League), V-League Việt Nam, La Liga, Serie A, Bundesliga, Ligue 1, Cúp C2, FA Cup, ĐTQG Việt Nam, cùng các giải đấu của siêu sao Cristiano Ronaldo (Saudi Pro League) và Lionel Messi (MLS)."
    },
    {
      q: "Bóng đá hôm nay và tối nay được phát sóng trực tiếp trên những kênh truyền hình nào?",
      a: "Tất cả các trận đấu đều được cập nhật chính xác kênh phát sóng tiếp sóng tại Việt Nam: K+Sport1, K+Action (Ngoại Hạng Anh); FPT Play & TV360 (Cúp C1, C2, FA Cup); VTV5, VTV Cần Thơ (V-League, ĐT Việt Nam); SCTV15 & VTVcab (La Liga, Serie A, Bundesliga)."
    },
    {
      q: "Tại sao các trận đấu rạng sáng (00:00 - 05:00) vẫn được hiển thị trong tab Hôm nay?",
      a: "Theo quy chuẩn Chu kỳ Ngày bóng đá (The Football Day Cycle), một ngày bóng đá bắt đầu từ 06:00 sáng hôm nay đến 05:59 sáng ngày hôm sau. Nhờ vậy, độc giả tra cứu lịch vào buổi tối vẫn thấy trọn vẹn các trận cầu đỉnh cao diễn ra lúc 02:00 sáng mai (như Cúp C1) mà không bị mất dấu sang ngày khác."
    },
    {
      q: "Kết quả bóng đá (KQBD) và Video bàn thắng highlight cập nhật lúc nào?",
      a: "Tỷ số trực tiếp (Livescore) được cập nhật theo thời gian thực (phút thi đấu, thẻ đỏ, cầu thủ ghi bàn). Ngay khi trận đấu kết thúc, hệ thống tự động gắn nút Video Highlight chất lượng HD cùng bài tường thuật chuyên sâu của ban biên tập VnExpress."
    }
  ];

  // Structured Data Schema (JSON-LD) for SEO Top 3
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://vnexpress.net/the-thao/#website",
        "url": "https://vnexpress.net/the-thao/",
        "name": "VnExpress Thể Thao",
        "description": "Báo điện tử VnExpress - Tin nhanh bóng đá, lịch thi đấu, kết quả bóng đá, bảng xếp hạng"
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Trang chủ",
            "item": "https://vnexpress.net"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Thể thao",
            "item": "https://vnexpress.net/the-thao"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": mode === 'schedule' ? "Lịch thi đấu bóng đá" : "Kết quả bóng đá (KQBD)",
            "item": mode === 'schedule' ? "https://vnexpress.net/the-thao/lich-thi-dau" : "https://vnexpress.net/the-thao/du-lieu-bong-da/ket-qua"
          }
        ]
      }
    ]
  };

  return (
    <section className="mt-10 pt-8 border-t border-gray-200">
      {/* Hidden SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-2xs space-y-6">
        {/* SEO Editorial Content Block */}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2.5 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#9f224e]" />
            {mode === 'schedule' 
              ? 'Lịch thi đấu bóng đá hôm nay và tối nay - Cập nhật liên tục 24/7'
              : 'Kết quả bóng đá (KQBD) hôm nay, tỷ số đêm qua mới nhất'
            }
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Chuyên trang dữ liệu thể thao của <strong>VnExpress</strong> mang tới cho độc giả trải nghiệm theo dõi lịch bóng đá và kết quả trực tiếp với tốc độ tải trang tức thì. Dữ liệu được đồng bộ liên tục theo chuẩn giờ Việt Nam (GMT+7), hiển thị rõ ràng từng cặp đấu, kênh truyền hình tiếp sóng (K+Sport, FPT Play, TV360, VTV5) cùng video highlight bàn thắng độc quyền ngay sau trận đấu.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-2.5 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-[#9f224e]" />
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-tight">
              Câu hỏi thường gặp về Lịch thi đấu & Kết quả bóng đá
            </h3>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-4 py-3 bg-[#fdfdfd] hover:bg-gray-50 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-gray-800"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 py-3 bg-white text-xs sm:text-sm text-gray-600 border-t border-gray-100 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SEO Tags Cloud */}
        <div className="pt-3 border-t border-gray-100 flex items-center gap-2 flex-wrap text-[11px] text-gray-500">
          <span className="font-semibold text-gray-700">Từ khóa tìm kiếm phổ biến:</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded hover:bg-gray-200 cursor-pointer">lịch thi đấu ngoại hạng anh hôm nay</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded hover:bg-gray-200 cursor-pointer">kqbd anh</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded hover:bg-gray-200 cursor-pointer">kết quả cúp c1</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded hover:bg-gray-200 cursor-pointer">lịch bóng đá v-league</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded hover:bg-gray-200 cursor-pointer">kênh chiếu bóng đá</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded hover:bg-gray-200 cursor-pointer">tỷ số chelsea hôm nay</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded hover:bg-gray-200 cursor-pointer">kết quả mu</span>
        </div>
      </div>
    </section>
  );
};
