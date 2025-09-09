import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, Users, AlertCircle } from 'lucide-react';

const mockEvents = [
  {
    id: 1,
    title: 'Loan Review Meeting',
    date: '2024-02-15',
    time: '10:00 AM',
    type: 'meeting',
    participants: ['Sarah Williams', 'Michael Chen']
  },
  {
    id: 2,
    title: 'Payment Due - John Smith',
    date: '2024-02-15',
    time: '11:30 AM',
    type: 'payment',
    amount: 'K832.50'
  },
  {
    id: 3,
    title: 'Credit Assessment - Emily Davis',
    date: '2024-02-16',
    time: '2:00 PM',
    type: 'assessment',
    borrower: 'Emily Davis'
  },
  {
    id: 4,
    title: 'Branch Audit',
    date: '2024-02-20',
    time: '9:00 AM',
    type: 'audit',
    location: 'Main Branch'
  }
];

const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
const todayDate = 15; // Example current date

export function CalendarTab() {
  const [currentMonth, setCurrentMonth] = useState('February 2024');
  const [selectedDate, setSelectedDate] = useState(15);

  const getEventsForDate = (date: number) => {
    return mockEvents.filter(event => {
      const eventDate = new Date(event.date).getDate();
      return eventDate === date;
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'payment': return 'bg-green-100 text-green-800';
      case 'assessment': return 'bg-purple-100 text-purple-800';
      case 'audit': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Events</p>
                <p className="text-2xl font-semibold">{getEventsForDate(todayDate).length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-semibold">12</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Meetings</p>
                <p className="text-2xl font-semibold">8</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue Items</p>
                <p className="text-2xl font-semibold">3</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {currentMonth}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New Event
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={`empty-${i}`} className="p-2 h-16"></div>
                ))}
                
                {/* Days of the month */}
                {daysInMonth.map(date => {
                  const events = getEventsForDate(date);
                  const isToday = date === todayDate;
                  const isSelected = date === selectedDate;
                  
                  return (
                    <div 
                      key={date} 
                      className={`p-2 h-16 border rounded cursor-pointer hover:bg-muted/50 ${
                        isSelected ? 'bg-primary/10 border-primary' : 
                        isToday ? 'bg-blue-50 border-blue-200' : 'border-border'
                      }`}
                      onClick={() => setSelectedDate(date)}
                    >
                      <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>
                        {date}
                      </div>
                      <div className="mt-1 space-y-1">
                        {events.slice(0, 2).map(event => (
                          <div key={event.id} className="w-full h-1 bg-primary rounded-full"></div>
                        ))}
                        {events.length > 2 && (
                          <div className="text-xs text-muted-foreground">+{events.length - 2}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Events for {currentMonth.split(' ')[0]} {selectedDate}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map(event => (
                  <div key={event.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {event.time}
                    </div>
                    {event.participants && (
                      <div className="text-sm">
                        <strong>Participants:</strong> {event.participants.join(', ')}
                      </div>
                    )}
                    {event.amount && (
                      <div className="text-sm">
                        <strong>Amount:</strong> {event.amount}
                      </div>
                    )}
                    {event.borrower && (
                      <div className="text-sm">
                        <strong>Borrower:</strong> {event.borrower}
                      </div>
                    )}
                    {event.location && (
                      <div className="text-sm">
                        <strong>Location:</strong> {event.location}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No events scheduled for this date</p>
                <Button className="mt-4" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}