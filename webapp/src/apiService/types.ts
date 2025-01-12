import { AutomationData } from "types/automations";

export interface ListParams {
  offset: number;
  limit: number;
}
export type APIRequest<D> = {
  path: string;
  method?: "POST" | "DELETE" | "GET" | "PUT";
  data?: D;
};

export type APIResponse<D> =
  | {
      ok: true;
      data: D;
    }
  | {
      ok: false;
      error: string;
    };
export type Waitable<D> =
  | { ready: undefined }
  | ({ ready: true } & APIResponse<D>)
  | {
      ready: false;
    };
export interface ListData<D> {
  params: ListParams;
  totalItems: number;
  data: D[];
}

export interface ApiState {
  automations: Waitable<ListData<AutomationData>>;
  userProfile: Waitable<UserProfile>;
}

export type UserProfile = {
  theme: string;
  lang: string;
};
