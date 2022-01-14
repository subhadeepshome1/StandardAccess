export interface UserState {
    userData?: UserData;
    tree_id?: string;
    treeData?: any;
    last_attended_event: any;
}

export interface UserData {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    uid: string;
}

export interface LoginPayload {
    grant_type?: string;
    client_id?: string;
    client_secret?: string;
    username: string;
    password: string;
    fcm: string;
}

export interface startPayload {
    nid: string;
    event: string;
}

export interface endPayload {
    nid: string;
    event: string;
}

export interface snoozePayload {
    nid: string;
    event: string;
}