"use client";

import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { departments, roles } from '@/lib/data';
import type { StaffMember } from '@/lib/types';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

const staffMemberSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('A valid email address is required'),
  department: z.string().min(1, 'Department selection is required'),
  role: z.string().min(1, 'Role selection is required'),
  location: z.string().min(1, 'Location is required'),
  bio: z.string().optional(),
});

type EditStaffMemberValues = z.infer<typeof staffMemberSchema>;

interface EditStaffMemberDialogProps {
  staffMember: StaffMember;
  isOpen: boolean;
  onVisibilityChange: (isOpen: boolean) => void;
  onCommit: (staffMember: StaffMember) => void;
}

export function EditStaffMemberDialog({ staffMember, isOpen, onVisibilityChange, onCommit }: EditStaffMemberDialogProps) {
  const { toast } = useToast();
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(staffMember.avatar);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<EditStaffMemberValues>({
    resolver: zodResolver(staffMemberSchema),
    defaultValues: staffMember,
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(staffMember);
      setAvatarPreviewUrl(staffMember.avatar);
    }
  }, [staffMember, form, isOpen]);
  
  const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processFormSubmit = (values: EditStaffMemberValues) => {
    onCommit({
      ...staffMember,
      ...values,
      avatar: avatarPreviewUrl || staffMember.avatar,
    });
    onVisibilityChange(false);
    toast({
      title: 'Profile Updated',
      description: `The profile for ${values.firstName} ${values.lastName} has been successfully updated.`,
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onVisibilityChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit Staff Member Profile</DialogTitle>
          <DialogDescription>
            Update the information for {staffMember.firstName} {staffMember.lastName}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processFormSubmit)} className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarPreviewUrl || undefined} alt="Staff Member Avatar" />
                <AvatarFallback>
                  <span className="text-3xl">{form.getValues('firstName')?.[0]}{form.getValues('lastName')?.[0]}</span>
                </AvatarFallback>
              </Avatar>
              <Input
                type="file"
                className="hidden"
                ref={avatarFileInputRef}
                onChange={handleAvatarFileChange}
                accept="image/*"
              />
              <Button type="button" variant="outline" onClick={() => avatarFileInputRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Change Profile Image
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                        <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {departments.map(dep => <SelectItem key={dep} value={dep}>{dep}</SelectItem>)}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {roles.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Work Location</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="e.g., Main Office" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
               <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biography</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="A brief professional summary..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <DialogFooter>
               <Button type="button" variant="ghost" onClick={() => onVisibilityChange(false)}>Cancel</Button>
              <Button type="submit" className="btn-3d">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
