
import React, { useState, useRef } from 'react';
import { Camera, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface ProfilePhotoEditorProps {
  currentPhotoUrl: string;
  onPhotoChange: (newPhotoUrl: string) => void;
}

const ProfilePhotoEditor: React.FC<ProfilePhotoEditorProps> = ({ 
  currentPhotoUrl, 
  onPhotoChange 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast("Please select an image file");
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast("Image size should be less than 5MB");
      return;
    }

    // Create a URL for the image
    const imageUrl = URL.createObjectURL(file);
    onPhotoChange(imageUrl);
    toast("Profile photo updated successfully");
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      <Avatar className="h-20 w-20 border-2 border-white shadow-md">
        {!imageError ? (
          <AvatarImage 
            src={currentPhotoUrl} 
            alt="Profile Photo" 
            onError={handleImageError}
          />
        ) : (
          <AvatarFallback className="bg-blue-50 text-blue-500">
            <User size={32} />
          </AvatarFallback>
        )}
      </Avatar>
      
      {/* Camera overlay on hover */}
      {isHovering && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-40">
          <Camera size={24} className="text-white" />
        </div>
      )}
      
      {/* Hidden file input */}
      <input 
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfilePhotoEditor;
