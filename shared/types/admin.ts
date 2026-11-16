export interface AdminUser {
  name: string;
  email: string;
}

export interface AdminSession {
  authenticated: boolean;
  user: AdminUser | null;
}

/** Current values stored in KV; `null` means a key is not configured yet. */
export interface AdminContactLocation {
  place: string | null;
  country: string | null;
  timezone: string | null;
}

/** Editable values bound to the admin form. */
export interface ContactLocationDraft {
  place: string;
  country: string;
  timezone: string;
}

/** Geocoding result; every field is optional because resolution may be partial. */
export interface AdminLocationResult {
  place?: string;
  country?: string;
  timezone?: string;
}
