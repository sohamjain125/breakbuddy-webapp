import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CheckCircle, Clock, Coffee, Calendar, MapPin, X, AlertCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/hooks/use-toast';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  available: boolean;
}

interface Booking {
  id: string;
  menuItem: MenuItem;
  date: string;
  status: 'pending' | 'confirmed' | 'completed';
  otp?: string;
}

const UserDashboard = () => {
  const [todaysBooking, setTodaysBooking] = useState<Booking | null>({
    id: '1',
    menuItem: {
      id: '1',
      name: 'Masala Dosa',
      description: 'Crispy South Indian crepe with spiced potato filling',
      category: 'South Indian',
      available: true
    },
    date: new Date().toDateString(),
    status: 'confirmed'
  });

  const [tomorrowsMenu] = useState<MenuItem[]>([
    {
      id: '2',
      name: 'Poha',
      description: 'Flattened rice with vegetables and spices',
      category: 'North Indian',
      available: true
    },
    {
      id: '3',
      name: 'Upma',
      description: 'Semolina porridge with vegetables',
      category: 'South Indian',
      available: true
    },
    {
      id: '4',
      name: 'Sandwich',
      description: 'Grilled vegetable sandwich with chutney',
      category: 'Continental',
      available: false
    }
  ]);

  const [tomorrowBooking, setTomorrowBooking] = useState<string | null>(null);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState('');

  const handleBookTomorrow = (menuId: string) => {
    const currentTime = new Date().getHours();
    if (currentTime >= 16) {
      toast({
        title: "Booking Closed",
        description: "Booking for tomorrow closes at 4 PM",
        variant: "destructive"
      });
      return;
    }

    setTomorrowBooking(menuId);
    toast({
      title: "Booking Confirmed!",
      description: "Your breakfast for tomorrow has been booked",
    });
  };

  const handleCancelTomorrow = () => {
    const currentTime = new Date().getHours();
    if (currentTime >= 16) {
      toast({
        title: "Cannot Cancel",
        description: "Cancellation closes at 4 PM",
        variant: "destructive"
      });
      return;
    }

    setTomorrowBooking(null);
    toast({
      title: "Booking Cancelled",
      description: "Your booking for tomorrow has been cancelled",
    });
  };

  const handleGetBreakfast = () => {
    // Generate OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    setShowOtpDialog(true);
    
    toast({
      title: "OTP Generated",
      description: `Your OTP is ${generatedOtp}. Show this to the chef.`,
    });
  };

  const currentTime = new Date().getHours();
  const isBookingOpen = currentTime < 16;

  return (
    <Layout userType="user">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Good Morning! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready for a delicious breakfast?
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Today's Booking */}
          <Card className="shadow-[var(--shadow-medium)]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Coffee className="h-5 w-5 mr-2" />
                Today's Breakfast
              </CardTitle>
              <CardDescription>
                {new Date().toDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todaysBooking ? (
                <div className="space-y-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <h3 className="font-semibold text-lg">{todaysBooking.menuItem.name}</h3>
                    <p className="text-muted-foreground">{todaysBooking.menuItem.description}</p>
                    <Badge variant="secondary" className="mt-2">
                      {todaysBooking.menuItem.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="text-sm font-medium">Confirmed</span>
                    </div>
                    {todaysBooking.status === 'confirmed' && (
                      <Button onClick={handleGetBreakfast} className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Get Breakfast
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Coffee className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No booking for today</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tomorrow's Menu */}
          <Card className="shadow-[var(--shadow-medium)]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Tomorrow's Menu
              </CardTitle>
              <CardDescription>
                Book before 4 PM today • {isBookingOpen ? 'Booking Open' : 'Booking Closed'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!isBookingOpen && (
                  <div className="flex items-center space-x-2 p-3 bg-warning/10 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-warning" />
                    <span className="text-sm text-warning">Booking closed for tomorrow</span>
                  </div>
                )}
                
                {tomorrowsMenu.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <Badge variant="outline" className="mt-1">
                          {item.category}
                        </Badge>
                      </div>
                      <div className="flex flex-col space-y-2">
                        {!item.available && (
                          <Badge variant="destructive">Unavailable</Badge>
                        )}
                        {item.available && isBookingOpen && (
                          <>
                            {tomorrowBooking === item.id ? (
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={handleCancelTomorrow}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            ) : tomorrowBooking === null ? (
                              <Button 
                                size="sm"
                                onClick={() => handleBookTomorrow(item.id)}
                              >
                                Book
                              </Button>
                            ) : null}
                          </>
                        )}
                      </div>
                    </div>
                    {tomorrowBooking === item.id && (
                      <div className="flex items-center space-x-2 mt-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm font-medium text-success">Booked for tomorrow</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-sm text-muted-foreground">Meals This Month</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-success">5</div>
            <div className="text-sm text-muted-foreground">Favorite Items</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-warning">2</div>
            <div className="text-sm text-muted-foreground">Pending Reviews</div>
          </Card>
        </div>

        {/* OTP Dialog */}
        <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Your Breakfast OTP</DialogTitle>
              <DialogDescription>
                Show this OTP to the chef to collect your breakfast
              </DialogDescription>
            </DialogHeader>
            <div className="text-center py-8">
              <div className="text-4xl font-bold text-primary mb-4 font-mono tracking-wider">
                {otp}
              </div>
              <p className="text-muted-foreground">
                Valid for the next 30 minutes
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default UserDashboard;