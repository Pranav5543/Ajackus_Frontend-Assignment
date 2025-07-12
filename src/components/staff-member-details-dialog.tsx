"use client";

import type { StaffMember } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

const DepartmentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="url(#paint0_linear_1_2)"/>
    <path d="M12 7V17M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paint0_linear_1_2" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#89f7fe"/>
        <stop offset="1" stopColor="#66a6ff"/>
      </linearGradient>
    </defs>
  </svg>
);

const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="url(#paint0_linear_1_3)"/>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white"/>
    <defs>
      <linearGradient id="paint0_linear_1_3" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f5567b"/>
        <stop offset="1" stopColor="#fd6e6a"/>
      </linearGradient>
    </defs>
  </svg>
);

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="url(#paint0_linear_1_4)"/>
    <path d="M4 8l8 5 8-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 8v10h16V8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paint0_linear_1_4" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#764ba2"/>
        <stop offset="1" stopColor="#667eea"/>
      </linearGradient>
    </defs>
  </svg>
);


interface StaffMemberDetailsDialogProps {
  staffMember: StaffMember;
  isOpen: boolean;
  onVisibilityChange: (isOpen: boolean) => void;
  onEditRequest: (staffMember: StaffMember) => void;
}

export function StaffMemberDetailsDialog({ staffMember, isOpen, onVisibilityChange, onEditRequest }: StaffMemberDetailsDialogProps) {
  const initials = `${staffMember.firstName[0]}${staffMember.lastName[0]}`;

  return (
    <Dialog open={isOpen} onOpenChange={onVisibilityChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <Avatar className="w-28 h-28 mb-4 border-4 border-white shadow-lg">
            <AvatarImage src={staffMember.avatar} alt={`${staffMember.firstName} ${staffMember.lastName}`} data-ai-hint="person portrait" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <DialogTitle className="text-2xl">{`${staffMember.firstName} ${staffMember.lastName}`}</DialogTitle>
           <div className="gradient-badge mt-2">
            {staffMember.role}
          </div>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center">
            <DepartmentIcon />
            <div className="ml-4 flex items-center gap-2">
              <span className="font-semibold">Department:</span>
              <Badge 
                className={cn(
                  "border-transparent gradient-badge"
                )}
              >
                {staffMember.department}
              </Badge>
            </div>
          </div>
          <div className="flex items-center">
            <LocationIcon />
            <div className="ml-4">
              <span className="font-semibold">Location:</span> {staffMember.location}
            </div>
          </div>
          <div className="flex items-center">
            <EmailIcon />
            <div className="ml-4">
              <span className="font-semibold">Email:</span> <a href={`mailto:${staffMember.email}`} className="text-accent hover:underline">{staffMember.email}</a>
            </div>
          </div>
          {staffMember.bio && (
            <div>
              <h3 className="font-semibold mb-2">Biography</h3>
              <p className="text-sm text-muted-foreground bg-secondary p-3 rounded-md">{staffMember.bio}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => onEditRequest(staffMember)} className="btn-3d">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
