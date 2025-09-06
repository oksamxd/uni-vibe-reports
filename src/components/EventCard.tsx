import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Star, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    type: 'Hackathon' | 'Workshop' | 'Tech Talk' | 'Fest' | 'Seminar';
    date: string;
    location: string;
    registrations: number;
    maxCapacity: number;
    rating: number;
    status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
    college: string;
  };
  onEdit?: (eventId: string) => void;
  onViewDetails?: (eventId: string) => void;
}

const statusColors = {
  'Upcoming': 'bg-info/10 text-info border-info/20',
  'Ongoing': 'bg-warning/10 text-warning border-warning/20',
  'Completed': 'bg-success/10 text-success border-success/20',
  'Cancelled': 'bg-destructive/10 text-destructive border-destructive/20',
};

const typeColors = {
  'Hackathon': 'bg-primary/10 text-primary',
  'Workshop': 'bg-success/10 text-success',
  'Tech Talk': 'bg-info/10 text-info',
  'Fest': 'bg-warning/10 text-warning',
  'Seminar': 'bg-accent/10 text-accent-foreground',
};

export function EventCard({ event, onEdit, onViewDetails }: EventCardProps) {
  const attendanceRate = Math.round((event.registrations / event.maxCapacity) * 100);
  
  return (
    <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {event.title}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className={typeColors[event.type]}>
                {event.type}
              </Badge>
              <Badge variant="outline" className={statusColors[event.status]}>
                {event.status}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>{event.registrations}/{event.maxCapacity} registered ({attendanceRate}%)</span>
          </div>
          {event.rating > 0 && (
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span>{event.rating}/5.0 rating</span>
            </div>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground">
          {event.college}
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails?.(event.id)}
          >
            View Details
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1 bg-gradient-primary hover:opacity-90"
            onClick={() => onEdit?.(event.id)}
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}