import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { EventCard } from "@/components/EventCard";
import { ReportsSection } from "@/components/ReportsSection";
import { CreateEventForm } from "@/components/CreateEventForm";
import { StudentsSection } from "@/components/StudentsSection";
import { SettingsSection } from "@/components/SettingsSection";
import { Calendar, Users, BarChart3, Trophy, TrendingUp, UserCheck } from "lucide-react";

// Mock data
const mockEvents = [
  {
    id: "1",
    title: "AI & Machine Learning Workshop",
    type: "Workshop" as const,
    date: "2024-09-15",
    location: "Tech Hub, IIT Delhi",
    registrations: 285,
    maxCapacity: 300,
    rating: 4.8,
    status: "Upcoming" as const,
    college: "IIT Delhi"
  },
  {
    id: "2", 
    title: "Hackathon 2024: Build the Future",
    type: "Hackathon" as const,
    date: "2024-09-20",
    location: "Innovation Center, NIT Trichy",
    registrations: 450,
    maxCapacity: 500,
    rating: 4.6,
    status: "Upcoming" as const,
    college: "NIT Trichy"
  },
  {
    id: "3",
    title: "Cloud Computing Tech Talk",
    type: "Tech Talk" as const,
    date: "2024-09-10",
    location: "Auditorium, BITS Pilani",
    registrations: 195,
    maxCapacity: 200,
    rating: 4.4,
    status: "Completed" as const,
    college: "BITS Pilani"
  },
  {
    id: "4",
    title: "Annual Tech Fest 2024",
    type: "Fest" as const,
    date: "2024-09-25",
    location: "Main Campus, VIT Vellore",
    registrations: 1200,
    maxCapacity: 1500,
    rating: 0,
    status: "Upcoming" as const,
    college: "VIT Vellore"
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Campus Event Management</h1>
        <p className="text-muted-foreground">Monitor and manage events across all college campuses</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Events"
          value="156"
          change="+12%"
          changeType="positive"
          icon={Calendar}
        />
        <StatsCard
          title="Active Students"
          value="24,580"
          change="+8%"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Average Rating"
          value="4.6"
          change="+0.2"
          changeType="positive"
          icon={Trophy}
        />
        <StatsCard
          title="Attendance Rate"
          value="87%"
          change="+5%"
          changeType="positive"
          icon={UserCheck}
        />
      </div>

      {/* Recent Events */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEvents.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-card border border-border rounded-lg p-6 shadow-card hover:shadow-glow transition-all duration-200 cursor-pointer"
             onClick={() => setActiveTab('events')}>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">View All Events</h3>
              <p className="text-sm text-muted-foreground">Manage your event portfolio</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-card border border-border rounded-lg p-6 shadow-card hover:shadow-glow transition-all duration-200 cursor-pointer"
             onClick={() => setActiveTab('reports')}>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-success/10 rounded-lg">
              <BarChart3 className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Analytics</h3>
              <p className="text-sm text-muted-foreground">Detailed reports and insights</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-card border border-border rounded-lg p-6 shadow-card hover:shadow-glow transition-all duration-200 cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-info/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-info" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Performance</h3>
              <p className="text-sm text-muted-foreground">Track event success metrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Events Management</h1>
        <button 
          onClick={() => setActiveTab('create-event')}
          className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Create New Event
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'events':
        return renderEvents();
      case 'reports':
        return <ReportsSection />;
      case 'create-event':
        return <CreateEventForm />;
      case 'students':
        return <StudentsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return renderDashboard();
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Index;