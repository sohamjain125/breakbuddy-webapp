import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Building, Calendar, Settings, Edit3 } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/hooks/use-toast';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  department: string;
  joinDate: string;
  preferences: string[];
  allergies: string[];
}

const UserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+91 9876543210',
    employeeId: 'EMP001',
    department: 'Engineering',
    joinDate: '2023-01-15',
    preferences: ['Vegetarian', 'South Indian', 'Low Spice'],
    allergies: ['Nuts', 'Dairy']
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const addPreference = (preference: string) => {
    if (preference && !editForm.preferences.includes(preference)) {
      setEditForm({
        ...editForm,
        preferences: [...editForm.preferences, preference]
      });
    }
  };

  const removePreference = (preference: string) => {
    setEditForm({
      ...editForm,
      preferences: editForm.preferences.filter(p => p !== preference)
    });
  };

  const addAllergy = (allergy: string) => {
    if (allergy && !editForm.allergies.includes(allergy)) {
      setEditForm({
        ...editForm,
        allergies: [...editForm.allergies, allergy]
      });
    }
  };

  const removeAllergy = (allergy: string) => {
    setEditForm({
      ...editForm,
      allergies: editForm.allergies.filter(a => a !== allergy)
    });
  };

  const recentBookings = [
    { date: '2024-01-25', item: 'Masala Dosa', status: 'completed' },
    { date: '2024-01-24', item: 'Poha', status: 'completed' },
    { date: '2024-01-23', item: 'Upma', status: 'completed' },
    { date: '2024-01-22', item: 'Sandwich', status: 'completed' },
    { date: '2024-01-21', item: 'Idli Sambar', status: 'completed' }
  ];

  return (
    <Layout userType="user">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="history">Booking History</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card className="shadow-[var(--shadow-medium)]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Your basic profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={isEditing ? editForm.name : profile.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      value={profile.employeeId}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editForm.email : profile.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={isEditing ? editForm.phone : profile.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={isEditing ? editForm.department : profile.department}
                      onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Join Date</Label>
                    <Input
                      id="joinDate"
                      value={profile.joinDate}
                      disabled
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-[var(--shadow-medium)]">
                <CardHeader>
                  <CardTitle>Food Preferences</CardTitle>
                  <CardDescription>
                    Help us recommend meals you'll love
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {(isEditing ? editForm.preferences : profile.preferences).map((pref) => (
                        <Badge key={pref} variant="secondary" className="flex items-center gap-2">
                          {pref}
                          {isEditing && (
                            <button
                              onClick={() => removePreference(pref)}
                              className="ml-1 hover:text-destructive"
                            >
                              ×
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add preference..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addPreference(e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-[var(--shadow-medium)]">
                <CardHeader>
                  <CardTitle>Allergies & Restrictions</CardTitle>
                  <CardDescription>
                    Keep yourself safe with dietary restrictions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {(isEditing ? editForm.allergies : profile.allergies).map((allergy) => (
                        <Badge key={allergy} variant="destructive" className="flex items-center gap-2">
                          {allergy}
                          {isEditing && (
                            <button
                              onClick={() => removeAllergy(allergy)}
                              className="ml-1 hover:text-background"
                            >
                              ×
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add allergy..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addAllergy(e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="shadow-[var(--shadow-medium)]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Recent Bookings
                </CardTitle>
                <CardDescription>
                  Your breakfast booking history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBookings.map((booking, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{booking.item}</p>
                        <p className="text-sm text-muted-foreground">{booking.date}</p>
                      </div>
                      <Badge variant={booking.status === 'completed' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserProfile;