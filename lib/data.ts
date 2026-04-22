import { calculateRentStatus } from '@/lib/utils';

const now = new Date();
const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);

export const demoData = {
  properties: [
    {
      id: 'p1',
      name: 'West Lawn 3-Flat',
      address: '2018 W 63rd St, Chicago, IL 60636',
      units: 3,
      occupied: 2
    },
    {
      id: 'p2',
      name: 'Bryn Mawr Duplex',
      address: '1215 W Bryn Mawr Ave, Chicago, IL 60660',
      units: 2,
      occupied: 1
    }
  ],
  units: [
    { id: 'u1', property: 'West Lawn 3-Flat', unit_label: '1F', status: 'Occupied', current_rent: 1400, market_rent: 1500, tenant: 'Maria Ortiz', lease_end: '2026-11-30', bedrooms: 2, bathrooms: 1 },
    { id: 'u2', property: 'West Lawn 3-Flat', unit_label: '2F', status: 'Occupied', current_rent: 1450, market_rent: 1550, tenant: 'Darren Lee', lease_end: '2026-08-31', bedrooms: 2, bathrooms: 1 },
    { id: 'u3', property: 'West Lawn 3-Flat', unit_label: 'Garden', status: 'Vacant', current_rent: 1200, market_rent: 1300, tenant: null, lease_end: null, bedrooms: 1, bathrooms: 1 },
    { id: 'u4', property: 'Bryn Mawr Duplex', unit_label: 'A', status: 'Occupied', current_rent: 1800, market_rent: 1900, tenant: 'Ari Johnson', lease_end: '2026-06-30', bedrooms: 2, bathrooms: 2 },
    { id: 'u5', property: 'Bryn Mawr Duplex', unit_label: 'B', status: 'Turnover', current_rent: 0, market_rent: 1850, tenant: null, lease_end: null, bedrooms: 2, bathrooms: 2 }
  ],
  tenants: [
    { id: 't1', name: 'Maria Ortiz', phone: '(312) 555-1011', email: 'maria@example.com', unit: '1F', property: 'West Lawn 3-Flat', monthly_rent: 1400, lease_start: '2025-12-01', lease_end: '2026-11-30' },
    { id: 't2', name: 'Darren Lee', phone: '(312) 555-2222', email: 'darren@example.com', unit: '2F', property: 'West Lawn 3-Flat', monthly_rent: 1450, lease_start: '2025-09-01', lease_end: '2026-08-31' },
    { id: 't3', name: 'Ari Johnson', phone: '(773) 555-4444', email: 'ari@example.com', unit: 'A', property: 'Bryn Mawr Duplex', monthly_rent: 1800, lease_start: '2025-07-01', lease_end: '2026-06-30' }
  ],
  rentLedger: [
    { id: 'r1', tenant: 'Maria Ortiz', unit: '1F', monthly_rent: 1400, rent_due: 1400, amount_paid: 1400, due_date: `${monthStart}`, payment_dates: [monthStart] },
    { id: 'r2', tenant: 'Darren Lee', unit: '2F', monthly_rent: 1450, rent_due: 1450, amount_paid: 800, due_date: `${monthStart}`, payment_dates: [monthStart] },
    { id: 'r3', tenant: 'Ari Johnson', unit: 'A', monthly_rent: 1800, rent_due: 1800, amount_paid: 0, due_date: `${monthStart}`, payment_dates: [] }
  ],
  maintenance: [
    { id: 'm1', property: 'West Lawn 3-Flat', unit: '1F', issue_type: 'Plumbing', title: 'Kitchen sink leak', priority: 'High', status: 'Open', assigned_to: 'Neighborhood Plumbing', date_opened: '2026-04-18', estimated_cost: 240, actual_cost: null },
    { id: 'm2', property: 'Bryn Mawr Duplex', unit: 'B', issue_type: 'Paint', title: 'Touch-up painting', priority: 'Medium', status: 'In Progress', assigned_to: 'In-house', date_opened: '2026-04-14', estimated_cost: 350, actual_cost: null },
    { id: 'm3', property: 'West Lawn 3-Flat', unit: '2F', issue_type: 'Electrical', title: 'Bathroom exhaust fan replacement', priority: 'Low', status: 'Scheduled', assigned_to: 'Bright Wire Co', date_opened: '2026-04-16', estimated_cost: 180, actual_cost: null }
  ],
  vacancies: [
    { id: 'v1', property: 'West Lawn 3-Flat', unit: 'Garden', date_vacated: '2026-03-31', asking_rent: 1295, market_rent: 1300, status: 'Ready', notes: 'New listing photos needed' },
    { id: 'v2', property: 'Bryn Mawr Duplex', unit: 'B', date_vacated: '2026-04-10', asking_rent: 1850, market_rent: 1850, status: 'Cleaning', notes: 'Floor scrub scheduled' }
  ]
};

export function getDashboardStats() {
  const totalUnits = demoData.units.length;
  const occupiedUnits = demoData.units.filter((u) => u.status === 'Occupied').length;
  const vacantUnits = demoData.units.filter((u) => u.status !== 'Occupied').length;
  const rentCollected = demoData.rentLedger.reduce((sum, row) => sum + row.amount_paid, 0);
  const outstanding = demoData.rentLedger.reduce((sum, row) => sum + Math.max(row.rent_due - row.amount_paid, 0), 0);
  const openMaintenance = demoData.maintenance.filter((t) => t.status !== 'Completed').length;
  const leasesExpiring60 = demoData.tenants.filter((t) => {
    const end = new Date(t.lease_end).getTime();
    const diffDays = (end - Date.now()) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 60;
  }).length;

  return { totalUnits, occupiedUnits, vacantUnits, rentCollected, outstanding, openMaintenance, leasesExpiring60 };
}

export const rentRows = demoData.rentLedger.map((row) => ({
  ...row,
  balance: Math.max(row.rent_due - row.amount_paid, 0),
  status: calculateRentStatus(row.rent_due, row.amount_paid, row.due_date)
}));
