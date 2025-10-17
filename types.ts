export type ModStatus = 'Planned' | 'Ordered' | 'Installed' | 'Returned' | 'Canceled';

export type Build = {
  id: string;
  user_id?: string | null;
  name: string | null;
  make: string | null;
  model: string | null;
  year: number | null;
  image_url?: string | null;
  created_at?: string;
};

export type Mod = {
  id: string;
  build_id: string;
  date: string | null;
  category: string | null;
  part: string | null;
  brand: string | null;
  status: ModStatus;
  total_cost: number | null;
};

export type Maintenance = {
  id: string;
  build_id: string;
  date: string | null;
  type: string | null;
  mileage: number | null;
  vendor: string | null;
  cost: number | null;
};
