
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingsContent: React.FC = () => {
  const navigate = useNavigate();
  const [smsEnabled, setSmsEnabled] = React.useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = React.useState(true);

  const handleDeleteAccount = () => {
    // In a real app, you would add confirmation dialog before deletion
    navigate('/');
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-2xl mx-auto pb-6">
      <div className="px-4 py-3 bg-primary-50/50 rounded-lg">
        <p className="text-sm text-gray-600 flex items-start">
          <AlertCircle size={16} className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
          Order related SMS cannot be disabled as they are critical to provide service.
        </p>
      </div>
      
      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-primary-50/80 px-4 py-3">
            <h2 className="font-medium text-gray-600 text-sm tracking-wide uppercase">Recommendations & Reminders</h2>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm text-gray-600">
              Keep this on to receive offer recommendations & timely reminders based on your interests.
            </p>
          </div>
          
          <Separator className="bg-gray-100" />
          
          <div className="px-4 py-4 flex items-center justify-between">
            <span className="font-medium text-gray-800">SMS</span>
            <Switch 
              checked={smsEnabled} 
              onCheckedChange={setSmsEnabled} 
              className="data-[state=checked]:bg-primary-500"
            />
          </div>
          
          <Separator className="bg-gray-100" />
          
          <div className="px-4 py-4 flex items-center justify-between">
            <span className="font-medium text-gray-800">WhatsApp</span>
            <Switch 
              checked={whatsappEnabled} 
              onCheckedChange={setWhatsappEnabled}
              className="data-[state=checked]:bg-primary-500"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-primary-50/80 px-4 py-3">
            <h2 className="font-medium text-gray-600 text-sm tracking-wide uppercase">Legal</h2>
          </div>
          
          <div 
            className="px-4 py-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between"
            onClick={() => navigate('/terms')}
          >
            <span className="font-medium text-gray-800">Terms & Conditions</span>
            <ChevronRight size={18} className="text-gray-500" />
          </div>
          
          <Separator className="bg-gray-100" />
          
          <div 
            className="px-4 py-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between"
            onClick={() => navigate('/privacy')}
          >
            <span className="font-medium text-gray-800">Privacy Policy</span>
            <ChevronRight size={18} className="text-gray-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-primary-50/80 px-4 py-3">
            <h2 className="font-medium text-gray-600 text-sm tracking-wide uppercase">Account Deletion</h2>
          </div>
          
          <div 
            className="px-4 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={handleDeleteAccount}
          >
            <span className="font-medium text-red-500">Delete Skawsh account</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsContent;
