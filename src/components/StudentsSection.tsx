import { useState } from "react";
import { Search, Filter, UserPlus, Mail, Phone, Calendar, GraduationCap, MapPin, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  branch: string;
  eventsAttended: number;
  eventsRegistered: number;
  avgRating: number;
  joinDate: string;
  avatar?: string;
  status: "active" | "inactive";
  interests: string[];
  achievements: string[];
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Arjun Patel",
    email: "arjun.patel@iitd.ac.in",
    phone: "+91 98765 43210",
    college: "IIT Delhi",
    year: "3rd Year",
    branch: "Computer Science",
    eventsAttended: 12,
    eventsRegistered: 15,
    avgRating: 4.8,
    joinDate: "2024-01-15",
    status: "active",
    interests: ["AI/ML", "Web Development", "Competitive Programming"],
    achievements: ["Hackathon Winner", "Top Performer"]
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@nitt.edu",
    phone: "+91 98765 43211",
    college: "NIT Trichy",
    year: "2nd Year",
    branch: "Electronics",
    eventsAttended: 8,
    eventsRegistered: 10,
    avgRating: 4.6,
    joinDate: "2024-02-20",
    status: "active",
    interests: ["IoT", "Robotics", "Hardware Design"],
    achievements: ["Innovation Award"]
  },
  {
    id: "3",
    name: "Rahul Singh",
    email: "rahul.singh@bitsp.ac.in",
    phone: "+91 98765 43212",
    college: "BITS Pilani",
    year: "4th Year",
    branch: "Mechanical",
    eventsAttended: 6,
    eventsRegistered: 8,
    avgRating: 4.4,
    joinDate: "2024-01-30",
    status: "active",
    interests: ["CAD Design", "Manufacturing", "Automation"],
    achievements: ["Design Excellence"]
  },
  {
    id: "4",
    name: "Sneha Gupta",
    email: "sneha.gupta@vitv.ac.in",
    phone: "+91 98765 43213",
    college: "VIT Vellore",
    year: "1st Year",
    branch: "Information Technology",
    eventsAttended: 4,
    eventsRegistered: 6,
    avgRating: 4.2,
    joinDate: "2024-03-10",
    status: "active",
    interests: ["Mobile Development", "UI/UX", "Data Science"],
    achievements: ["Rising Star"]
  }
];

export function StudentsSection() {
  const [students] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollege = selectedCollege === "all" || student.college === selectedCollege;
    const matchesYear = selectedYear === "all" || student.year === selectedYear;
    
    return matchesSearch && matchesCollege && matchesYear;
  });

  const colleges = Array.from(new Set(students.map(s => s.college)));
  const years = Array.from(new Set(students.map(s => s.year)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
          <p className="text-muted-foreground">Manage student profiles and track engagement</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-foreground">{students.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-success/10 rounded-lg">
                <Calendar className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold text-foreground">{students.filter(s => s.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-info/10 rounded-lg">
                <Award className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Events/Student</p>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(students.reduce((acc, s) => acc + s.eventsAttended, 0) / students.length)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-warning/10 rounded-lg">
                <Star className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-foreground">
                  {(students.reduce((acc, s) => acc + s.avgRating, 0) / students.length).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search students by name, email, or college..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-muted/50"
                />
              </div>
            </div>
            
            <Select value={selectedCollege} onValueChange={setSelectedCollege}>
              <SelectTrigger className="w-[200px] bg-muted/50">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="All Colleges" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colleges</SelectItem>
                {colleges.map(college => (
                  <SelectItem key={college} value={college}>{college}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[150px] bg-muted/50">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="bg-gradient-card border-border hover:shadow-glow transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-start space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{student.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{student.email}</p>
                  <div className="flex items-center mt-1">
                    <MapPin className="w-3 h-3 text-muted-foreground mr-1" />
                    <span className="text-xs text-muted-foreground">{student.college}</span>
                  </div>
                </div>
                <Badge variant={student.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                  {student.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Year & Branch</p>
                  <p className="font-medium text-foreground">{student.year}</p>
                  <p className="text-xs text-muted-foreground">{student.branch}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Events</p>
                  <p className="font-medium text-foreground">{student.eventsAttended}/{student.eventsRegistered}</p>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-warning mr-1" />
                    <span className="text-xs text-muted-foreground">{student.avgRating}</span>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Interests</p>
                <div className="flex flex-wrap gap-1">
                  {student.interests.slice(0, 3).map((interest, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              {student.achievements.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Achievements</p>
                  <div className="flex flex-wrap gap-1">
                    {student.achievements.slice(0, 2).map((achievement, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-success/10 text-success">
                        <Award className="w-3 h-3 mr-1" />
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Mail className="w-3 h-3 mr-1" />
                  Contact
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  Events
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card className="bg-gradient-card border-border">
          <CardContent className="text-center py-12">
            <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No students found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}