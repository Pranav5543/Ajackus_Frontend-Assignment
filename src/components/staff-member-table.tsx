"use client";

import type { StaffMember } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';


interface StaffMemberTableProps {
  staffList: StaffMember[];
  onRowSelect: (staffMember: StaffMember) => void;
  onEditRequest: (staffMember: StaffMember) => void;
  onDeleteRequest: (staffMember: StaffMember) => void;
}

export function StaffMemberTable({ staffList, onRowSelect, onEditRequest, onDeleteRequest }: StaffMemberTableProps) {
  return (
    <div className="rounded-md border">
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead>Staff Member</TableHead>
            <TableHead className="hidden md:table-cell">Email Address</TableHead>
            <TableHead className="hidden sm:table-cell">Department</TableHead>
            <TableHead className="hidden lg:table-cell">Role</TableHead>
            <TableHead>
                <span className="sr-only">Actions</span>
            </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {staffList.map((member) => {
            const initials = `${member.firstName[0]}${member.lastName[0]}`;
            return (
                <TableRow key={member.id} onClick={() => onRowSelect(member)} className="cursor-pointer">
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={member.avatar} alt={member.firstName} />
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{`${member.firstName} ${member.lastName}`}</div>
                        </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{member.email}</TableCell>
                    <TableCell className="hidden sm:table-cell">{member.department}</TableCell>
                    <TableCell className="hidden lg:table-cell">{member.role}</TableCell>
                    <TableCell>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                                onClick={(e) => e.stopPropagation()}
                                >
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Toggle Actions Menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEditRequest(member); }}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDeleteRequest(member); }} className="text-destructive">
                                     <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            );
            })}
        </TableBody>
        </Table>
    </div>
  );
}
