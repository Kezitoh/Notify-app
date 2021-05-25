
export interface User {
    id?: number;
    id_group?: string;
    id_role?: string;
    user?: string;
    password?: string;
    name?: string;
    surname?: string;
    email?: string;
    is_online?: boolean;
    is_activated?: boolean;
    last_online?: Date; 
    updated_at?: Date;
    created_at?: Date;


}

export interface Componente {
    title: string;
    url: string;
    icon: string;
}

export interface Notification {
  id?: number;
  id_type: number;
  title: string;
  text: string;
  attachment?: string;
  end_time?: string;
  users?: number[];
  groups?: number[];
  is_active?: number;
}