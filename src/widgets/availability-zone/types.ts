export interface IAreaInfo {
	caption: string;
	value: number;
}

export interface IGroupOrganization {
	count: number;
	group_id: string;
	group_name: string;
	order: number;
	org: IOrganization[];
}

export interface IOrganization {
	distance: number;
	name: string;
	lat: string;
	lng: string;
}

export interface IAvailabilityZone {
	area_time: number;
	area_type: number;
	area_len: number;
	id: number;
	area: number[][];
	area_info: IAreaInfo[];
	orgs: IGroupOrganization[];
}
