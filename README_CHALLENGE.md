# Campus Event Management Platform - Challenge Implementation

## Overview
This is a comprehensive web-based admin portal prototype for a Campus Event Management Platform, designed as part of the Webknight coding challenge. The platform focuses on event reporting, analytics, and management across multiple college campuses.

## My Approach & Design Decisions

### 1. Architecture Choices
- **Frontend-First Approach**: Built a responsive web application that serves as the admin portal
- **Component-Based Design**: Modular React components for scalability and maintainability  
- **Design System**: Implemented a cohesive design system with semantic tokens for consistent theming
- **Mock Data Integration**: Used realistic mock data to demonstrate functionality

### 2. Key Features Implemented

#### Dashboard & Analytics
- **Event Statistics**: Total events, active students, ratings, attendance rates
- **Event Cards**: Visual representation of events with key metrics
- **Interactive Charts**: Bar charts for event popularity, pie charts for event type distribution
- **Top Students**: Leaderboard of most active participants

#### Event Management
- **Event Creation Form**: Complete form with validation for creating new events
- **Event Types**: Support for Hackathons, Workshops, Tech Talks, Fests, Seminars
- **Status Tracking**: Upcoming, Ongoing, Completed, Cancelled event states
- **Capacity Management**: Registration limits and attendance tracking

#### Reporting System
- **Event Popularity Report**: Sorted by registrations with attendance comparison
- **Student Participation**: Most active students across multiple events
- **Attendance Analytics**: Percentage-based attendance tracking
- **Rating System**: 5-star rating system with averages

### 3. Technical Implementation

#### Database Schema (Conceptual)
Based on the requirements, the following entities would be needed:

**Events Table**
- event_id (Primary Key)
- title, type, date, location, description
- max_capacity, college_id
- status, rating_average

**Students Table**  
- student_id (Primary Key)
- name, email, college_id
- registration_date, total_events_attended

**Registrations Table**
- registration_id (Primary Key)
- student_id (Foreign Key)
- event_id (Foreign Key)
- registration_date, attendance_status

**Feedback Table**
- feedback_id (Primary Key)
- student_id, event_id (Foreign Keys)
- rating (1-5), comments

#### Scale Considerations (50 colleges, 500 students each, 20 events per semester)

**Multi-tenancy Approach**:
- **Separate College Data**: Each college has isolated data for security
- **Global Event IDs**: Unique identifiers across all colleges (UUID format)
- **Federated Reporting**: Cross-college analytics while maintaining data isolation

**Performance Optimizations**:
- Indexed queries on frequently accessed fields (college_id, event_date)
- Cached statistics for dashboard metrics
- Pagination for large datasets

### 4. API Design (Conceptual)

```
POST /api/events - Create new event
GET /api/events?college_id=X - List events for college
POST /api/events/{id}/register - Register student for event
PUT /api/events/{id}/attendance - Mark attendance
GET /api/reports/popularity?college_id=X - Event popularity report
GET /api/reports/students/active?limit=3 - Top active students
```

### 5. Assumptions Made

1. **User Roles**: Admin users have full access to create/edit events and view reports
2. **Event Lifecycle**: Events progress through defined states (Upcoming → Ongoing → Completed)
3. **Registration System**: Students can register for events within capacity limits
4. **Attendance Tracking**: Manual check-in process during events
5. **Rating System**: Post-event feedback collection with 1-5 star ratings
6. **Multi-College**: Platform supports multiple colleges with isolated data

### 6. Edge Cases Considered

- **Duplicate Registrations**: Prevented through unique constraints
- **Cancelled Events**: Status tracking with appropriate notifications
- **Capacity Overflow**: Registration cutoff at max capacity
- **Missing Feedback**: Optional ratings, averages calculated from available data
- **Cross-College Events**: Support for inter-college collaborative events

## Technology Stack

- **React 18** with TypeScript for type safety
- **Tailwind CSS** with custom design system
- **Shadcn/UI** components customized for the platform
- **Recharts** for data visualization
- **React Router** for navigation
- **React Query** for data management (ready for API integration)

## Next Steps for Full Implementation

1. **Backend Development**: Implement REST APIs with proper authentication
2. **Database Setup**: Create tables with proper relationships and indexes  
3. **Real-time Updates**: WebSocket integration for live attendance tracking
4. **Mobile App**: Student-facing mobile application for event browsing
5. **Email Notifications**: Automated event reminders and updates
6. **Advanced Analytics**: Predictive insights and trend analysis

## Running the Application

This is a frontend prototype. To see the full functionality:
1. The app loads with a dashboard showing event statistics
2. Navigate through different sections using the sidebar
3. Create new events using the form
4. View detailed analytics and reports
5. All data is currently mocked but demonstrates the complete user flow

The design is fully responsive and follows modern UI/UX principles with a dark theme optimized for extended use by administrators.