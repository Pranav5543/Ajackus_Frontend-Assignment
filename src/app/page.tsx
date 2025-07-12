"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { StaffMember } from '@/lib/types';
import { initialStaff, departments, roles } from '@/lib/data';
import { StaffMemberCard } from '@/components/staff-member-card';
import { AddStaffMemberDialog } from '@/components/add-staff-member-dialog';
import { EditStaffMemberDialog } from '@/components/edit-staff-member-dialog';
import { StaffMemberDetailsDialog } from '@/components/staff-member-details-dialog';
import { StaffMemberTable } from '@/components/staff-member-table';
import { DeleteStaffMemberDialog } from '@/components/delete-staff-member-dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, Search, X, Briefcase } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DirectoryPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStaffMember, setActiveStaffMember] = useState<StaffMember | null>(null);
  const [editingStaffMember, setEditingStaffMember] = useState<StaffMember | null>(null);
  const [deletingStaffMember, setDeletingStaffMember] = useState<StaffMember | null>(null);
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentSelection, setDepartmentSelection] = useState('all');
  const [locationQuery, setLocationQuery] = useState('');
  const [roleSelection, setRoleSelection] = useState('all');

  useEffect(() => {
    const dataFetchTimer = setTimeout(() => {
      setStaff(initialStaff);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(dataFetchTimer);
  }, []);
  
  const filteredStaff = useMemo(() => {
    return staff
      .filter(member => {
        const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
      })
      .filter(member => departmentSelection === 'all' || member.department === departmentSelection)
      .filter(member => !locationQuery || member.location.toLowerCase().includes(locationQuery.toLowerCase()))
      .filter(member => roleSelection === 'all' || member.role === roleSelection);
  }, [staff, searchQuery, departmentSelection, locationQuery, roleSelection]);

  const onNewStaffMemberAdded = useCallback((newMemberData: Omit<StaffMember, 'id'>) => {
    const memberToAdd: StaffMember = {
      ...newMemberData,
      id: String(Date.now()),
      avatar: newMemberData.avatar || `https://placehold.co/100x100.png`,
    };
    setStaff(prev => [memberToAdd, ...prev]);
  }, []);

  const onStaffMemberUpdated = useCallback((updatedMember: StaffMember) => {
    setStaff(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
    setEditingStaffMember(null);
    if(activeStaffMember && activeStaffMember.id === updatedMember.id) {
        setActiveStaffMember(updatedMember);
    }
  }, [activeStaffMember]);
  
  const onStaffMemberDeleted = useCallback((memberId: string) => {
    setStaff(prev => prev.filter(m => m.id !== memberId));
    setDeletingStaffMember(null);
  }, []);

  const viewStaffMemberDetails = useCallback((member: StaffMember) => {
    setActiveStaffMember(member);
  }, []);

  const closeStaffMemberDetails = useCallback(() => {
    setActiveStaffMember(null);
  }, []);

  const beginEditStaffMember = useCallback((member: StaffMember) => {
    setEditingStaffMember(member);
  }, []);

  const beginDeleteStaffMember = useCallback((member: StaffMember) => {
    setDeletingStaffMember(member);
  }, []);

  const resetAllFilters = useCallback(() => {
    setSearchQuery('');
    setDepartmentSelection('all');
    setLocationQuery('');
    setRoleSelection('all');
  }, []);

  const areFiltersActive = departmentSelection !== 'all' || !!locationQuery || roleSelection !== 'all' || searchQuery !== '';

  return (
    <div className="min-h-screen bg-background text-foreground">
       <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-sm border-b shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                <Briefcase className="h-8 w-8 text-accent"/>
                <span>Staff Canvas</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <AddStaffMemberDialog onCommit={onNewStaffMemberAdded} />
            </div>
          </div>
        </div>
      </header>
      <div className="bg-card border-b border-t border-t-white/10 sticky top-20 z-20 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold mb-4 text-primary">Company Directory</h1>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search by name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 bg-background shadow-inner"
              />
            </div>
              <div className="hidden md:flex items-center gap-2">
              <Button variant={displayMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setDisplayMode('grid')}>
                <LayoutGrid className="h-5 w-5" />
              </Button>
              <Button variant={displayMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setDisplayMode('list')}>
                <List className="h-5 w-5" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:flex md:items-center gap-4 w-full md:w-auto">
              <Select value={departmentSelection} onValueChange={setDepartmentSelection}>
                <SelectTrigger className="w-full md:w-[180px] bg-background shadow-inner">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dep => <SelectItem key={dep} value={dep}>{dep}</SelectItem>)}
                </SelectContent>
              </Select>
                <Input 
                placeholder="Filter by location..."
                value={locationQuery}
                onChange={e => setLocationQuery(e.target.value)}
                className="w-full md:w-[180px] bg-background shadow-inner"
              />
                <Select value={roleSelection} onValueChange={setRoleSelection}>
                <SelectTrigger className="w-full md:w-[180px] bg-background shadow-inner">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {areFiltersActive && (
              <Button variant="ghost" onClick={resetAllFilters} className="w-full md:w-auto">
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
              <div className="flex w-full justify-between md:hidden">
                <AddStaffMemberDialog onCommit={onNewStaffMemberAdded} />
                <div className="flex items-center gap-2">
                  <Button variant={displayMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setDisplayMode('grid')}>
                      <LayoutGrid className="h-5 w-5" />
                  </Button>
                  <Button variant={displayMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setDisplayMode('list')}>
                      <List className="h-5 w-5" />
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 space-y-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-1/4 mt-2" />
              </div>
            ))}
          </div>
        ) : filteredStaff.length > 0 ? (
          displayMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredStaff.map(member => 
                <StaffMemberCard 
                  key={member.id} 
                  staffMember={member} 
                  onCardSelect={viewStaffMemberDetails} 
                  onEditRequest={beginEditStaffMember}
                  onDeleteRequest={beginDeleteStaffMember}
                />
              )}
            </div>
          ) : (
            <StaffMemberTable 
              staffList={filteredStaff}
              onRowSelect={viewStaffMemberDetails}
              onEditRequest={beginEditStaffMember}
              onDeleteRequest={beginDeleteStaffMember}
            />
          )
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">No Staff Found</h2>
            <p className="text-muted-foreground mt-2">Your search and filter criteria did not match any staff members.</p>
          </div>
        )}
      </main>
      
      {activeStaffMember && (
        <StaffMemberDetailsDialog 
          staffMember={activeStaffMember} 
          isOpen={!!activeStaffMember} 
          onVisibilityChange={(isOpen) => !isOpen && closeStaffMemberDetails()}
          onEditRequest={() => {
            closeStaffMemberDetails();
            beginEditStaffMember(activeStaffMember);
          }}
        />
      )}
      
      {editingStaffMember && (
        <EditStaffMemberDialog
          staffMember={editingStaffMember}
          isOpen={!!editingStaffMember}
          onVisibilityChange={(isOpen) => !isOpen && setEditingStaffMember(null)}
          onCommit={onStaffMemberUpdated}
        />
      )}

      {deletingStaffMember && (
        <DeleteStaffMemberDialog
          staffMember={deletingStaffMember}
          isOpen={!!deletingStaffMember}
          onVisibilityChange={(isOpen) => !isOpen && setDeletingStaffMember(null)}
          onConfirmDeletion={onStaffMemberDeleted}
        />
      )}
    </div>
  );
}
