import { Flag, Calendar, Users, Newspaper, Camera, BookOpen, Zap, Smile } from "lucide-react";
import { CompactRaceCalendar } from "@/components/calendar/RaceCalendar";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: Calendar,
      title: "Race Calendar & Countdown",
      description: "Never miss a race with live countdowns and detailed schedules",
      status: "Available",
      href: "/calendar"
    },
    {
      icon: Users,
      title: "Driver & Team Tracker",
      description: "Follow your favorite drivers and teams with personalized stats",
      status: "Coming Soon"
    },
    {
      icon: Newspaper,
      title: "News Aggregator",
      description: "Latest F1 news from multiple trusted sources",
      status: "Coming Soon"
    },
    {
      icon: Camera,
      title: "Photo Gallery",
      description: "High-resolution F1 images with favorites and sharing",
      status: "Coming Soon"
    },
    {
      icon: BookOpen,
      title: "Rules & Facts Explorer",
      description: "Learn F1 rules, terminology, and strategies",
      status: "Coming Soon"
    },
    {
      icon: Zap,
      title: "Technical Insights",
      description: "Deep dive into car technology and race strategies",
      status: "Coming Soon"
    },
    {
      icon: Flag,
      title: "Live Timing",
      description: "Real-time race data and telemetry",
      status: "Coming Soon"
    },
    {
      icon: Smile,
      title: "Memes & Highlights",
      description: "Community-driven F1 entertainment content",
      status: "Coming Soon"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-red-50/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="racing-stripe"></div>
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <Flag className="w-8 h-8 text-red-600" />
              <span className="text-2xl font-bold text-red-600">F1 Companion</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Your Ultimate
              <span className="block text-red-600 f1-gradient-primary bg-clip-text text-transparent">
                Formula 1 Experience
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Stay up-to-date with races, drivers, teams, news, and more.
              Built for F1 fans, by F1 fans.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors">
              <span className="status-live">🔴 LIVE</span>
              <span>Development in Progress</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Features Coming Soon
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We&apos;re building the most comprehensive F1 companion app with all the features
            you need to stay connected to the world of Formula 1.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const FeatureCard = (
              <div
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <IconComponent className="w-5 h-5 text-red-600" />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    feature.status === 'Available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {feature.status}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            );

            return feature.href ? (
              <Link key={index} href={feature.href}>
                {FeatureCard}
              </Link>
            ) : (
              <div key={index}>
                {FeatureCard}
              </div>
            );
          })}
        </div>
      </div>

      {/* Race Calendar Preview */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Upcoming Races
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Stay up-to-date with the latest Formula 1 race schedule and never miss a Grand Prix
          </p>
          <Link
            href="/calendar"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            View Full Calendar
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <CompactRaceCalendar maxRaces={3} />
        </div>
      </div>

      {/* Development Status */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Development Progress
          </h2>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm font-medium text-red-600">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Race calendar feature now available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flag className="w-5 h-5 text-red-500" />
            <span className="font-semibold">F1 Companion</span>
          </div>
          <p className="text-gray-400 text-sm">
            Built with ❤️ for the F1 community. This is an unofficial fan project.
          </p>
        </div>
      </footer>
    </div>
  );
}
