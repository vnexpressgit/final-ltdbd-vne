import React, { useState, useEffect, useMemo } from 'react';
import { 
  RotateCw, 
  ArrowLeft, 
  Tv, 
  Video, 
  Share2, 
  Bookmark, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { FixtureItem, MatchFullDetails } from '../../types/football';
import { getMatchDetailsForFixture } from '../../data/matchDetailData';
import { updateMatchSEO } from '../../utils/matchRouting';

// Subcomponents
import { MatchHeroSection } from './MatchHeroSection';
import { MatchStickyBar, MatchSubTab } from './MatchStickyBar';
import { TabOverview } from './TabOverview';
import { TabLineups } from './TabLineups';
import { TabStats } from './TabStats';
import { TabMatchNews } from './TabMatchNews';

interface MatchDetailViewProps {
  fixture: FixtureItem;
  onBack: () => void;
  onOpenHighlightModal?: (fixture: FixtureItem) => void;
  onLeagueClick?: (leagueId: number) => void;
  allFixtures?: FixtureItem[];
  onNavigateToMatch?: (fixture: FixtureItem) => void;
}

export const MatchDetailView: React.FC<MatchDetailViewProps> = ({
  fixture,
  onBack,
  onOpenHighlightModal,
  onLeagueClick,
  allFixtures = [],
  onNavigateToMatch
}) => {
  const [activeTab, setActiveTab] = useState<MatchSubTab>('overview');
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('Vừa xong');

  // Match status check
  const isFinished = ['FT', 'AET', 'PEN'].includes(fixture.fixture.status.short) || fixture.fixture.status.long.includes('Finished');
  const isLive = !isFinished && ['1H', '2H', 'HT', 'ET', 'LIVE'].includes(fixture.fixture.status.short);

  // If match is upcoming and user was on 'lineups', automatically fallback to 'overview'
  useEffect(() => {
    if (!isFinished && !isLive && activeTab === 'lineups') {
      setActiveTab('overview');
    }
  }, [isFinished, isLive, activeTab]);

  // Load rich match details
  const matchDetails: MatchFullDetails = useMemo(() => {
    return getMatchDetailsForFixture(fixture);
  }, [fixture]);

  // Update SEO and Schema.org SportsEvent whenever fixture changes
  useEffect(() => {
    updateMatchSEO(fixture, matchDetails);
  }, [fixture, matchDetails]);

  // Scroll listener for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 240) {
        setIsStickyVisible(true);
      } else {
        setIsStickyVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      setLastRefreshedTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`);
    }, 600);
  };

  // Tabs navigation:
  // Finished matches: ['Tổng quan', 'Đội hình', 'Thống kê', 'Tin tức'] (Bỏ tab 'Cầu thủ')
  // Upcoming matches: ['Tổng quan', 'Thống kê', 'Tin tức'] (Không có tab 'Đội hình', Bỏ tab 'Cầu thủ')
  const navTabs: { id: MatchSubTab; label: string }[] = useMemo(() => {
    const tabs: { id: MatchSubTab; label: string }[] = [
      { id: 'overview', label: 'Tổng quan' }
    ];

    if (isFinished || isLive) {
      tabs.push({ id: 'lineups', label: 'Đội hình' });
    }

    tabs.push({ id: 'stats', label: 'Thống kê' });
    tabs.push({ id: 'news', label: 'Tin tức' });

    return tabs;
  }, [isFinished, isLive]);

  return (
    <div className="w-full min-h-screen bg-[#f7f7f8] pb-16">
      {/* Sticky Header Bar */}
      <MatchStickyBar
        visible={isStickyVisible}
        fixture={fixture}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={onBack}
      />

      {/* Main Container - 1130px centered */}
      <main className="max-w-[1130px] mx-auto px-3 sm:px-4 pt-4 sm:pt-6">
        
        {/* Top Hero Section */}
        <MatchHeroSection
          fixture={fixture}
          details={matchDetails}
          onBack={onBack}
          onLeagueClick={onLeagueClick}
        />

        {/* Sub-Tabs Navigation Bar */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs mb-6 px-2 sm:px-6">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar">
            
            {/* Tabs List */}
            <div className="flex items-center gap-1 sm:gap-6 border-b border-transparent">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-medium transition-all relative whitespace-nowrap ${
                      isActive
                        ? 'text-[#9f224e] font-bold border-b-2 border-[#9f224e]'
                        : 'text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Live Polling Refresh Button */}
            {isLive && (
              <div className="flex items-center gap-2 pl-3 py-2 flex-shrink-0">
                <span className="text-[11px] text-gray-400 hidden md:inline">
                  Cập nhật: {lastRefreshedTime}
                </span>
                <button
                  onClick={handleManualRefresh}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-gray-200 transition"
                  title="Làm mới số liệu trận đấu"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#9f224e]' : 'text-gray-500'}`} />
                  <span className="hidden sm:inline">Cập nhật</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="transition-opacity duration-200">
          {activeTab === 'overview' && (
            <TabOverview
              details={matchDetails}
              allFixtures={allFixtures}
              onOpenHighlight={() => onOpenHighlightModal && onOpenHighlightModal(fixture)}
              onOpenArticle={() => setActiveTab('news')}
              onLeagueClick={onLeagueClick}
              onNavigateToMatch={onNavigateToMatch}
            />
          )}

          {activeTab === 'lineups' && (isFinished || isLive) && (
            <TabLineups details={matchDetails} />
          )}

          {activeTab === 'stats' && (
            <TabStats details={matchDetails} />
          )}

          {activeTab === 'news' && (
            <TabMatchNews news={matchDetails.news} matchHeadline={matchDetails.headline} />
          )}
        </div>

      </main>
    </div>
  );
};
