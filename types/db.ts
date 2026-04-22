export type UnitStatus = 'Occupied' | 'Vacant' | 'Turnover';
export type LeaseStatus = 'Active' | 'Expired' | 'Upcoming';
export type RentStatus = 'Paid' | 'Partial' | 'Unpaid' | 'Late';
export type MaintenancePriority = 'Low' | 'Medium' | 'High';
export type MaintenanceStatus = 'Open' | 'Scheduled' | 'In Progress' | 'Waiting' | 'Completed';

export interface Property {
  id: string;
  user_id: string;
  name: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  zip: string;
  notes?: string;
}
