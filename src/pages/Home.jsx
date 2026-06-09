import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import ContentStrip from '../components/home/ContentStrip';
import Top10Movies from '../components/home/Top10Movies';
import AnimeJourneyStrip from '../components/home/AnimeJourneyStrip';
import PromoVideo from '../components/home/PromoVideo';
import UpcomingStrip from '../components/home/UpcomingStrip';
import GenreStrip from '../components/home/GenreStrip';
import { SportsStrip } from '../components/home/SportsStrip';
import CatchUpSection from '../components/home/CatchUpSection';

const Home = () => {

  const popularSports = [
    { id: 'sp1', name: 'Cricket', icon: 'https://cdn-icons-png.flaticon.com/512/5482/5482161.png' },
    { id: 'sp2', name: 'Football', icon: 'https://cdn-icons-png.flaticon.com/512/1165/1165187.png' },
    { id: 'sp3', name: 'Tennis', icon: 'https://cdn-icons-png.flaticon.com/512/751/751433.png' },
    { id: 'sp4', name: 'UFC', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/UFC_logo.svg/1200px-UFC_logo.svg.png' }
  ];

  const streamxOriginalsFree = [
    { id: 'ori1', title: "Gullak",     image: "/webseries/family_man.png", isPremium: true, age: "U/A 13+", duration: "4 Seasons", year: "2019", description: "A heartwarming slice-of-life series about the Mishra family." },
    { id: 'ori2', title: "Maharani",   image: "/webseries/hotel.png",      isPremium: true, age: "U/A 16+", duration: "3 Seasons", year: "2021", description: "A homemaker becomes the Chief Minister of Bihar, navigating politics and power." },
    { id: 'ori3', title: "Scam 2003",  image: "/webseries/lucifer.png",    isPremium: true, age: "A",       duration: "1 Season",  year: "2023", description: "The true story of Abdul Karim Telgi's multi-crore stamp paper scam." },
    { id: 'ori4', title: "Brinda",     image: "/webseries/money.png",      isPremium: true, age: "A",       duration: "1 Season",  year: "2024", description: "A police officer investigates a shocking case that challenges her beliefs." },
    { id: 'ori5', title: "Tanaav",     image: "/webseries/queen.png",      isPremium: true, age: "A",       duration: "1 Season",  year: "2022", description: "An Indian adaptation of the acclaimed Israeli series Fauda." },
    { id: 'ori6', title: "Scam 1992",  image: "/webseries/GOT.png",        isPremium: true, age: "A",       duration: "1 Season",  year: "2020", description: "The incredible story of Harshad Mehta, the stockbroker who took India by storm." }
  ];

  const latestMovies = [
    { id: 101, title: "Animal", image: "/latest/animal.png", age: "A 18+", duration: "3h 21m", year: "2023", description: "A son's obsessive love for his father leads him down a dark and violent path." },
    { id: 102, title: "Fighter", image: "/latest/fighter.png", age: "U/A 16+", duration: "2h 46m", year: "2024", description: "Top IAF aviators come together to form Air Dragons, facing imminent danger." },
    { id: 103, title: "Ramayana", image: "/latest/ramayana.png", age: "U", duration: "3h 10m", year: "2025", description: "An epic retelling of the ancient Indian mythological tale." },
    { id: 104, title: "Jatadhara", image: "/latest/jatadhara.png", age: "U/A", duration: "2h 30m", year: "2024", description: "A thrilling saga of mystery and divine intervention." },
    { id: 105, title: "The Witcher", image: "/latest/witcher.png", age: "A", duration: "3 Seasons", year: "2019", description: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny." },
    { id: 106, title: "Game of Thrones", image: "/latest/GOT.png", age: "A", duration: "8 Seasons", year: "2011", description: "Noble families vie for control of the Iron Throne of Westeros." },
    { id: 107, title: "Mirai", image: "/latest/mirai.png", age: "U/A", duration: "2h", year: "2024", description: "A futuristic action adventure that defies the laws of time." },
    { id: 108, title: "Bhoot Police", image: "/latest/bhootB.png", age: "U/A", duration: "2h 10m", year: "2021", description: "Two brothers whose job is to hunt ghosts are put to the ultimate test." },
    { id: 109, title: "Dhurandhar", image: "/latest/dhurandhar.png", age: "U/A", duration: "2h 20m", year: "2024", description: "An intense drama of power, politics, and survival." },
    { id: 110, title: "The Great", image: "/latest/Great.png", age: "A", duration: "3 Seasons", year: "2020", description: "A satirical, comedic drama about the rise of Catherine the Great." },
    { id: 111, title: "Sky Force", image: "/latest/skyF.png", age: "U/A", duration: "2h 35m", year: "2024", description: "An untold true story of India's first and deadliest airstrike." }
  ];

  const topWebSeries = [
    { id: 201, title: "Game of Thrones", image: "/webseries/GOT.png", age: "A", duration: "8 Seasons", year: "2011", description: "Noble families vie for control of the Iron Throne." },
    { id: 202, title: "Squid Game", image: "/webseries/Squad.png", age: "A", duration: "1 Season", year: "2021", description: "Hundreds of cash-strapped players accept a strange invitation." },
    { id: 203, title: "All of Us Are Dead", image: "/webseries/dead.png", age: "A", duration: "1 Season", year: "2022", description: "A high school becomes ground zero for a zombie virus outbreak." },
    { id: 204, title: "The Family Man", image: "/webseries/family_man.png", age: "U/A 16+", duration: "2 Seasons", year: "2019", description: "A working man from the National Investigation Agency tries to protect the nation." },
    { id: 205, title: "Hotel Del Luna", image: "/webseries/hotel.png", age: "U/A 16+", duration: "1 Season", year: "2019", description: "A mystical hotel caters only to spirits." },
    { id: 206, title: "Lucifer", image: "/webseries/lucifer.png", age: "A", duration: "6 Seasons", year: "2016", description: "Lucifer Morningstar has decided he's had enough of being the dutiful servant in Hell." },
    { id: 207, title: "Money Heist", image: "/webseries/money.png", age: "A", duration: "5 Parts", year: "2017", description: "Eight thieves take hostages and lock themselves in the Royal Mint of Spain." },
    { id: 208, title: "The Queen's Gambit", image: "/webseries/queen.png", age: "A", duration: "1 Season", year: "2020", description: "Orphaned at the tender age of nine, Beth Harmon discovers and masters chess." },
    { id: 209, title: "Sweet Home", image: "/webseries/sweet.png", age: "A", duration: "2 Seasons", year: "2020", description: "As humans turn into savage monsters, one troubled teenager fights to survive." },
    { id: 210, title: "Snowpiercer", image: "/webseries/train.png", age: "A", duration: "3 Seasons", year: "2020", description: "Set more than seven years after the world has become a frozen wasteland." },
    { id: 211, title: "Wednesday", image: "/webseries/wednesday.png", age: "U/A 16+", duration: "1 Season", year: "2022", description: "Wednesday Addams investigates a murder spree while making new friends." }
  ];

  const upcomingLive = [
    { id: 301, title: "Gullak 5", image: "/latest/animal.png", date: "5TH JUNE" },
    { id: 302, title: "Hastinapur Ke Veer", image: "/latest/ramayana.png", date: "2ND JUN | 9:00 PM" },
    { id: 303, title: "India's Best Dancer Season 5", image: "/latest/fighter.png", date: "6TH JUN | 9:30 PM" },
    { id: 304, title: "Entertainment Ka Hitman", image: "/latest/bhootB.png", date: "JALD AA RAHA HAI" },
    { id: 305, title: "Perricard VS Djokovic", image: "/latest/skyF.png", date: "TONIGHT | 11:45 PM" },
    { id: 306, title: "ENG VS IND 3 T20Is", image: "/latest/mirai.png", date: "STARTS 28TH MAY" },
    { id: 307, title: "PSG VS Arsenal", image: "/latest/jatadhara.png", date: "30TH MAY | 8:00 PM" }
  ];

  const genres = [
    { id: 1, name: "Romance", image: "/webseries/hotel.png", color: "from-green-800" },
    { id: 2, name: "Action", image: "/latest/fighter.png", color: "from-gray-700" },
    { id: 3, name: "Thriller", image: "/latest/bhootB.png", color: "from-red-900" },
    { id: 4, name: "Drama", image: "/latest/animal.png", color: "from-orange-800" },
    { id: 5, name: "Comedy", image: "/latest/Great.png", color: "from-red-600" },
    { id: 6, name: "Historic & Mythology", image: "/latest/ramayana.png", color: "from-teal-800" },
    { id: 7, name: "Reality", image: "/latest/mirai.png", color: "from-blue-800" },
    { id: 8, name: "Documentary", image: "/latest/skyF.png", color: "from-cyan-900" }
  ];

  return (
    <div className="bg-background pb-20 overflow-hidden">
      <HeroBanner />

      {/* ── Main Content Area ── */}
      <div className="z-20 relative mt-12 md:mt-16">
        <Top10Movies />

        <GenreStrip title="Browse by Genre" items={genres} />

        <ContentStrip title="Latest Movies" items={latestMovies} />

        {/* Promo Video */}
        <PromoVideo />

        <UpcomingStrip title="Upcoming on StreamX" items={upcomingLive} />

        <ContentStrip title="Top Web Series" items={topWebSeries} />
      </div>

      {/* ── Bottom Feature Sections ── */}
      <div className="z-20 relative mt-4">

        {/* Anime Journey */}
        <AnimeJourneyStrip />

        {/* Popular Sports */}
        <SportsStrip title="Popular Sports" items={popularSports} />

        {/* StreamX Originals: 1st Episode Free */}
        <ContentStrip title="StreamX Originals: 1st Episode Free" items={streamxOriginalsFree} />
        
        {/* Catch Up Section */}
        <div className="mt-8">
          <CatchUpSection />
        </div>

      </div>
    </div>
  );
};

export default Home;
