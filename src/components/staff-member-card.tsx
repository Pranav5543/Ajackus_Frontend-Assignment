"use client";

import type { StaffMember } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { useRef } from 'react';

interface StaffMemberCardProps {
  staffMember: StaffMember;
  onCardSelect: (staffMember: StaffMember) => void;
  onEditRequest: (staffMember: StaffMember) => void;
  onDeleteRequest: (staffMember: StaffMember) => void;
}

const EditActionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.9415 20.9997H19.9415" stroke="#4A4A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M16.9411 3.5C17.4411 3 18.2411 3 18.7411 3.5L20.9411 5.7C21.4411 6.2 21.4411 7 20.9411 7.5L9.44111 19C9.24111 19.2 8.94111 19.3 8.74111 19.3L3.74111 19.3C3.34111 19.3 2.94111 19 2.94111 18.6L2.94111 13.6C2.94111 13.4 3.04111 13.1 3.24111 12.9L14.7411 1.4C14.9911 1.15 15.3411 1 15.7411 1C16.1411 1 16.5411 1.15 16.8411 1.4L16.9411 1.5L16.9411 3.5Z" stroke="#4A4A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DeleteActionIcon = () => (
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.165 9.58211L18.395 18.9921C18.305 20.1021 17.415 20.9921 16.295 20.9921H7.705C6.585 20.9921 5.695 20.1021 5.605 18.9921L4.835 9.58211" stroke="#E5484D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.3648 6.47211H3.63477" stroke="#4A4A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M9.48828 6.47211C9.48828 6.47211 9.48828 3.47211 12.0003 3.47211C14.5123 3.47211 14.5123 6.47211 14.5123 6.47211H9.48828Z" stroke="#4A4A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export function StaffMemberCard({ staffMember, onCardSelect, onEditRequest, onDeleteRequest }: StaffMemberCardProps) {
  const initials = `${staffMember.firstName[0]}${staffMember.lastName[0]}`;
  const cardElementRef = useRef<HTMLDivElement>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardElementRef.current) return;
    const { left, top, width, height } = cardElementRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    const rotateY = x * 10;
    const rotateX = -y * 10;
    cardElementRef.current.style.transform = `scale(1.05) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleCardMouseLeave = () => {
    if (!cardElementRef.current) return;
    cardElementRef.current.style.transform = 'scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };
  
  return (
    <div 
      ref={cardElementRef}
      className="animated-border-card"
      onMouseMove={handleCardMouseMove}
      onMouseLeave={handleCardMouseLeave}
    >
      <Card className="relative flex flex-col items-center text-center p-0 border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-full">
         <div className="absolute top-2 right-2 z-20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEditRequest(staffMember); }}>
                  <EditActionIcon />
                  <span className="ml-2">Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDeleteRequest(staffMember); }} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                  <DeleteActionIcon />
                  <span className="ml-2">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        <div className="card-content-wrapper">
          <div onClick={() => onCardSelect(staffMember)} className="w-full cursor-pointer flex flex-col items-center pt-6">
            <Avatar className="w-24 h-24 mb-4" style={{ transform: 'translateZ(40px)' }}>
              <AvatarImage src={staffMember.avatar} alt={`${staffMember.firstName} ${staffMember.lastName}`} data-ai-hint="person portrait" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <CardHeader className="p-0">
              <CardTitle className="text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                {`${staffMember.firstName} ${staffMember.lastName}`}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-1">
              <p className="text-muted-foreground text-sm">{staffMember.role}</p>
            </CardContent>
          </div>
           <Badge 
              className={cn(
                "mt-4 border-transparent gradient-badge"
              )}
            >
              <span>{staffMember.department}</span>
            </Badge>
        </div>
      </Card>
    </div>
  );
}
