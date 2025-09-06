import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, Award, Calendar } from "lucide-react";

// Mock data for reports
const eventPopularityData = [
  { name: 'AI Workshop', registrations: 450, attendance: 380, rating: 4.8 },
  { name: 'Hackathon 2024', registrations: 320, attendance: 285, rating: 4.6 },
  { name: 'Tech Talk: Cloud', registrations: 280, attendance: 245, rating: 4.4 },
  { name: 'Data Science Fest', registrations: 195, attendance: 175, rating: 4.2 },
  { name: 'Mobile Dev Workshop', registrations: 165, attendance: 150, rating: 4.5 },
];

const eventTypeData = [
  { name: 'Workshop', value: 35, count: 14 },
  { name: 'Hackathon', value: 25, count: 10 },
  { name: 'Tech Talk', value: 20, count: 8 },
  { name: 'Fest', value: 15, count: 6 },
  { name: 'Seminar', value: 5, count: 2 },
];

const topStudents = [
  { name: 'Raj Patel', events: 12, colleges: 'IIT Delhi', rating: 4.9 },
  { name: 'Priya Sharma', events: 11, colleges: 'NIT Trichy', rating: 4.8 },
  { name: 'Arjun Kumar', events: 10, colleges: 'BITS Pilani', rating: 4.7 },
];

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

export function ReportsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Analytics & Reports</h2>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export Reports
        </Button>
      </div>

      {/* Event Popularity Report */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Event Popularity Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventPopularityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="registrations" fill="hsl(var(--primary))" name="Registrations" />
                <Bar dataKey="attendance" fill="hsl(var(--success))" name="Attendance" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Type Distribution */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Event Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={eventTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {eventTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Active Students */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Top 3 Most Active Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStudents.map((student, index) => (
                <div key={student.name} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-warning text-warning-foreground' :
                      index === 1 ? 'bg-muted text-muted-foreground' :
                      'bg-primary/20 text-primary'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.colleges}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-1">
                      {student.events} events
                    </Badge>
                    <p className="text-sm text-muted-foreground">★ {student.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Event Table */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle>Detailed Event Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Event</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Registrations</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Attendance</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Attendance %</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Rating</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {eventPopularityData.map((event) => (
                  <tr key={event.name} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">{event.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{event.registrations}</td>
                    <td className="py-3 px-4 text-muted-foreground">{event.attendance}</td>
                    <td className="py-3 px-4">
                      <Badge variant={
                        Math.round((event.attendance / event.registrations) * 100) > 80 ? "default" : "secondary"
                      }>
                        {Math.round((event.attendance / event.registrations) * 100)}%
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">★ {event.rating}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        Completed
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}