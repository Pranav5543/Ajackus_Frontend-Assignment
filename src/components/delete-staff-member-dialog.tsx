"use client";

import type { StaffMember } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';

interface DeleteStaffMemberDialogProps {
  staffMember: StaffMember;
  isOpen: boolean;
  onVisibilityChange: (isOpen: boolean) => void;
  onConfirmDeletion: (staffMemberId: string) => void;
}

export function DeleteStaffMemberDialog({ staffMember, isOpen, onVisibilityChange, onConfirmDeletion }: DeleteStaffMemberDialogProps) {
  const { toast } = useToast();

  const handleDeletion = () => {
    onConfirmDeletion(staffMember.id);
    toast({
      title: 'Profile Deleted',
      description: `The profile for ${staffMember.firstName} ${staffMember.lastName} has been permanently removed.`,
      variant: 'destructive',
    });
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onVisibilityChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Permanent Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be reversed. Are you sure you want to permanently delete the profile for {staffMember.firstName} {staffMember.lastName}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeletion} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Confirm Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
