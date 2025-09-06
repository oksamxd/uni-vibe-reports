import { useState } from "react";
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database, 
  Mail, 
  Smartphone,
  Users,
  Calendar,
  BarChart3,
  Save,
  RefreshCw,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface SettingsState {
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    eventReminders: boolean;
    registrationUpdates: boolean;
    weeklyReports: boolean;
  };
  platform: {
    organizationName: string;
    supportEmail: string;
    timezone: string;
    language: string;
    dateFormat: string;
  };
  eventDefaults: {
    maxCapacity: string;
    registrationDeadline: string;
    reminderDays: string;
    requireApproval: boolean;
    allowWaitlist: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: string;
    passwordPolicy: string;
    auditLogs: boolean;
  };
  integrations: {
    emailService: string;
    smsService: string;
    analyticsService: string;
    calendarSync: boolean;
  };
}

const initialSettings: SettingsState = {
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
    registrationUpdates: true,
    weeklyReports: false,
  },
  platform: {
    organizationName: "Campus Events Platform",
    supportEmail: "support@campusevents.edu",
    timezone: "Asia/Kolkata",
    language: "English",
    dateFormat: "DD/MM/YYYY",
  },
  eventDefaults: {
    maxCapacity: "100",
    registrationDeadline: "1",
    reminderDays: "3",
    requireApproval: false,
    allowWaitlist: true,
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: "60",
    passwordPolicy: "standard",
    auditLogs: true,
  },
  integrations: {
    emailService: "gmail",
    smsService: "twilio",
    analyticsService: "google",
    calendarSync: true,
  },
};

export function SettingsSection() {
  const [settings, setSettings] = useState<SettingsState>(initialSettings);
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { toast } = useToast();

  const updateSetting = (category: keyof SettingsState, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    // Simulate API call
    setTimeout(() => {
      setHasUnsavedChanges(false);
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    }, 1000);
  };

  const handleResetSettings = () => {
    setSettings(initialSettings);
    setHasUnsavedChanges(false);
    toast({
      title: "Settings reset",
      description: "All settings have been reset to default values.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Platform Settings</h1>
          <p className="text-muted-foreground">Configure your campus event management platform</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleResetSettings}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button 
            onClick={handleSaveSettings}
            className="bg-gradient-primary hover:opacity-90"
            disabled={!hasUnsavedChanges}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
            {hasUnsavedChanges && <Badge variant="destructive" className="ml-2 px-1 py-0 text-xs">•</Badge>}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Configuration */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-primary" />
              <span>Platform Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                value={settings.platform.organizationName}
                onChange={(e) => updateSetting('platform', 'organizationName', e.target.value)}
                className="bg-muted/50"
              />
            </div>
            
            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.platform.supportEmail}
                onChange={(e) => updateSetting('platform', 'supportEmail', e.target.value)}
                className="bg-muted/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={settings.platform.timezone}
                  onValueChange={(value) => updateSetting('platform', 'timezone', value)}
                >
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                    <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                    <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language">Language</Label>
                <Select
                  value={settings.platform.language}
                  onValueChange={(value) => updateSetting('platform', 'language', value)}
                >
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">हिन्दी</SelectItem>
                    <SelectItem value="Spanish">Español</SelectItem>
                    <SelectItem value="French">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-primary" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <Switch
                id="emailNotifications"
                checked={settings.notifications.emailNotifications}
                onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="pushNotifications">Push Notifications</Label>
              <Switch
                id="pushNotifications"
                checked={settings.notifications.pushNotifications}
                onCheckedChange={(checked) => updateSetting('notifications', 'pushNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="eventReminders">Event Reminders</Label>
              <Switch
                id="eventReminders"
                checked={settings.notifications.eventReminders}
                onCheckedChange={(checked) => updateSetting('notifications', 'eventReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="registrationUpdates">Registration Updates</Label>
              <Switch
                id="registrationUpdates"
                checked={settings.notifications.registrationUpdates}
                onCheckedChange={(checked) => updateSetting('notifications', 'registrationUpdates', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="weeklyReports">Weekly Reports</Label>
              <Switch
                id="weeklyReports"
                checked={settings.notifications.weeklyReports}
                onCheckedChange={(checked) => updateSetting('notifications', 'weeklyReports', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Event Defaults */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Event Defaults</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="maxCapacity">Default Max Capacity</Label>
              <Input
                id="maxCapacity"
                type="number"
                value={settings.eventDefaults.maxCapacity}
                onChange={(e) => updateSetting('eventDefaults', 'maxCapacity', e.target.value)}
                className="bg-muted/50"
              />
            </div>

            <div>
              <Label htmlFor="registrationDeadline">Registration Deadline (days before event)</Label>
              <Input
                id="registrationDeadline"
                type="number"
                value={settings.eventDefaults.registrationDeadline}
                onChange={(e) => updateSetting('eventDefaults', 'registrationDeadline', e.target.value)}
                className="bg-muted/50"
              />
            </div>

            <div>
              <Label htmlFor="reminderDays">Reminder Days Before Event</Label>
              <Input
                id="reminderDays"
                type="number"
                value={settings.eventDefaults.reminderDays}
                onChange={(e) => updateSetting('eventDefaults', 'reminderDays', e.target.value)}
                className="bg-muted/50"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="requireApproval">Require Registration Approval</Label>
              <Switch
                id="requireApproval"
                checked={settings.eventDefaults.requireApproval}
                onCheckedChange={(checked) => updateSetting('eventDefaults', 'requireApproval', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="allowWaitlist">Allow Waitlist</Label>
              <Switch
                id="allowWaitlist"
                checked={settings.eventDefaults.allowWaitlist}
                onCheckedChange={(checked) => updateSetting('eventDefaults', 'allowWaitlist', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Security Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Enhance account security</p>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={settings.security.twoFactorAuth}
                onCheckedChange={(checked) => updateSetting('security', 'twoFactorAuth', checked)}
              />
            </div>

            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => updateSetting('security', 'sessionTimeout', e.target.value)}
                className="bg-muted/50"
              />
            </div>

            <div>
              <Label htmlFor="passwordPolicy">Password Policy</Label>
              <Select
                value={settings.security.passwordPolicy}
                onValueChange={(value) => updateSetting('security', 'passwordPolicy', value)}
              >
                <SelectTrigger className="bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard (8+ characters)</SelectItem>
                  <SelectItem value="strong">Strong (12+ chars, mixed case, numbers)</SelectItem>
                  <SelectItem value="strict">Strict (16+ chars, special characters)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auditLogs">Audit Logs</Label>
                <p className="text-sm text-muted-foreground">Track system activities</p>
              </div>
              <Switch
                id="auditLogs"
                checked={settings.security.auditLogs}
                onCheckedChange={(checked) => updateSetting('security', 'auditLogs', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integrations - Full Width */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-primary" />
            <span>Third-Party Integrations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <Label htmlFor="emailService">Email Service</Label>
              <Select
                value={settings.integrations.emailService}
                onValueChange={(value) => updateSetting('integrations', 'emailService', value)}
              >
                <SelectTrigger className="bg-muted/50">
                  <Mail className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gmail">Gmail API</SelectItem>
                  <SelectItem value="sendgrid">SendGrid</SelectItem>
                  <SelectItem value="mailgun">Mailgun</SelectItem>
                  <SelectItem value="ses">Amazon SES</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="smsService">SMS Service</Label>
              <Select
                value={settings.integrations.smsService}
                onValueChange={(value) => updateSetting('integrations', 'smsService', value)}
              >
                <SelectTrigger className="bg-muted/50">
                  <Smartphone className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="textlocal">TextLocal</SelectItem>
                  <SelectItem value="aws-sns">AWS SNS</SelectItem>
                  <SelectItem value="msg91">MSG91</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="analyticsService">Analytics Service</Label>
              <Select
                value={settings.integrations.analyticsService}
                onValueChange={(value) => updateSetting('integrations', 'analyticsService', value)}
              >
                <SelectTrigger className="bg-muted/50">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google Analytics</SelectItem>
                  <SelectItem value="mixpanel">Mixpanel</SelectItem>
                  <SelectItem value="amplitude">Amplitude</SelectItem>
                  <SelectItem value="custom">Custom Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="calendarSync">Calendar Sync</Label>
                <p className="text-xs text-muted-foreground">Google Calendar integration</p>
              </div>
              <Switch
                id="calendarSync"
                checked={settings.integrations.calendarSync}
                onCheckedChange={(checked) => updateSetting('integrations', 'calendarSync', checked)}
              />
            </div>
          </div>

          <Separator className="my-6" />

          {/* API Keys Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-foreground">API Keys & Credentials</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowApiKeys(!showApiKeys)}
              >
                {showApiKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showApiKeys ? "Hide" : "Show"} Keys
              </Button>
            </div>

            {showApiKeys && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emailApiKey">Email Service API Key</Label>
                  <Input
                    id="emailApiKey"
                    type="password"
                    placeholder="••••••••••••••••"
                    className="bg-muted/50"
                  />
                </div>
                <div>
                  <Label htmlFor="smsApiKey">SMS Service API Key</Label>
                  <Input
                    id="smsApiKey"
                    type="password"
                    placeholder="••••••••••••••••"
                    className="bg-muted/50"
                  />
                </div>
                <div>
                  <Label htmlFor="analyticsKey">Analytics Tracking ID</Label>
                  <Input
                    id="analyticsKey"
                    type="password"
                    placeholder="••••••••••••••••"
                    className="bg-muted/50"
                  />
                </div>
                <div>
                  <Label htmlFor="calendarKey">Calendar API Key</Label>
                  <Input
                    id="calendarKey"
                    type="password"
                    placeholder="••••••••••••••••"
                    className="bg-muted/50"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save/Reset Actions */}
      {hasUnsavedChanges && (
        <Card className="bg-warning/5 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                <span className="text-warning font-medium">You have unsaved changes</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleResetSettings}>
                  Discard Changes
                </Button>
                <Button size="sm" onClick={handleSaveSettings} className="bg-gradient-primary hover:opacity-90">
                  Save All Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}