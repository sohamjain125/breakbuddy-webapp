import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChefHat, Users, Calendar, Plus, Bell, CheckCircle, X } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/hooks/use-toast';

interface TodayBooking {
  id: string;
  employeeName: string;
  employeeId: string;
  menuItem: string;
  department: string;
  status: 'pending' | 'served';
  otp?: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
}

const ChefDashboard = () => {
  const [todayBookings, setTodayBookings] = useState<TodayBooking[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      menuItem: 'Masala Dosa',
      department: 'Engineering',
      status: 'pending'
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      employeeId: 'EMP002',
      menuItem: 'Masala Dosa',
      department: 'Marketing',
      status: 'pending'
    },
    {
      id: '3',
      employeeName: 'Mike Johnson',
      employeeId: 'EMP003',
      menuItem: 'Masala Dosa',
      department: 'HR',
      status: 'served'
    }
  ]);

  const [tomorrowMenu] = useState<MenuItem[]>([
    {
      id: '2',
      name: 'Poha',
      description: 'Flattened rice with vegetables and spices',
      category: 'North Indian'
    },
    {
      id: '3',
      name: 'Upma',
      description: 'Semolina porridge with vegetables',
      category: 'South Indian'
    }
  ]);

  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    category: ''
  });

  const [otpInput, setOtpInput] = useState<{ [key: string]: string }>({});

  const handleVerifyOtp = (bookingId: string) => {
    const enteredOtp = otpInput[bookingId];
    if (!enteredOtp) {
      toast({
        title: "OTP Required",
        description: "Please enter the OTP provided by the employee",
        variant: "destructive"
      });
      return;
    }

    // Mock OTP verification - in real app, verify against backend
    setTodayBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'served' as const }
        : booking
    ));

    setOtpInput(prev => ({ ...prev, [bookingId]: '' }));

    toast({
      title: "Meal Served",
      description: "Breakfast has been marked as served successfully",
    });
  };

  const handleAddMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.description || !newMenuItem.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Menu Item Added",
      description: `${newMenuItem.name} has been added to tomorrow's menu`,
    });

    setNewMenuItem({ name: '', description: '', category: '' });
  };

  const notifyUsers = () => {
    toast({
      title: "Notification Sent",
      description: "All employees have been notified that breakfast is ready",
    });
  };

  const pendingCount = todayBookings.filter(b => b.status === 'pending').length;
  const servedCount = todayBookings.filter(b => b.status === 'served').length;

  return (
    <Layout userType="chef">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Chef Dashboard 👨‍🍳
            </h1>
            <p className="text-muted-foreground">
              Manage today's breakfast service
            </p>
          </div>
          <Button onClick={notifyUsers} className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notify: Breakfast Ready
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-primary">{todayBookings.length}</div>
            <div className="text-sm text-muted-foreground">Total Bookings</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-warning">{pendingCount}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-success">{servedCount}</div>
            <div className="text-sm text-muted-foreground">Served</div>
          </Card>
        </div>

        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today's Menu</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow's Menu</TabsTrigger>
            <TabsTrigger value="manage">Manage Menu</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            <Card className="shadow-[var(--shadow-medium)]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Today's Bookings - Masala Dosa
                </CardTitle>
                <CardDescription>
                  {new Date().toDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayBookings.map((booking) => (
                    <div key={booking.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-semibold">{booking.employeeName}</h3>
                              <p className="text-sm text-muted-foreground">
                                {booking.employeeId} • {booking.department}
                              </p>
                            </div>
                            <Badge 
                              variant={booking.status === 'served' ? 'default' : 'secondary'}
                              className="ml-auto"
                            >
                              {booking.status === 'served' ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : null}
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                        
                        {booking.status === 'pending' && (
                          <div className="flex items-center space-x-2 ml-4">
                            <Input
                              placeholder="Enter OTP"
                              value={otpInput[booking.id] || ''}
                              onChange={(e) => setOtpInput(prev => ({
                                ...prev,
                                [booking.id]: e.target.value
                              }))}
                              className="w-32"
                            />
                            <Button 
                              size="sm"
                              onClick={() => handleVerifyOtp(booking.id)}
                            >
                              Verify
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tomorrow" className="space-y-6">
            <Card className="shadow-[var(--shadow-medium)]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Tomorrow's Menu
                </CardTitle>
                <CardDescription>
                  {new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tomorrowMenu.map((item) => (
                    <div key={item.id} className="p-4 bg-secondary rounded-lg">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                      <Badge variant="outline" className="mt-2">
                        {item.category}
                      </Badge>
                    </div>
                  ))}
                  {tomorrowMenu.length === 0 && (
                    <div className="text-center py-8">
                      <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No menu set for tomorrow</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <Card className="shadow-[var(--shadow-medium)]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Menu Item for Tomorrow
                </CardTitle>
                <CardDescription>
                  Create new breakfast options for employees
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="itemName">Item Name</Label>
                    <Input
                      id="itemName"
                      placeholder="e.g., Masala Dosa"
                      value={newMenuItem.name}
                      onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      placeholder="e.g., South Indian"
                      value={newMenuItem.category}
                      onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the dish..."
                    value={newMenuItem.description}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddMenuItem} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Tomorrow's Menu
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-[var(--shadow-medium)]">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks for managing breakfast service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Send Menu Reminder (3 PM daily)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  View All Employee Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Generate Weekly Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ChefDashboard;