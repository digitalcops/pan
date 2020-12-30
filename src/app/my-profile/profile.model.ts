export interface IUserFixedDetails {
    'groups': string;
    'group_name': string;
    'first_name': string;
    'middle_name':string;
    'last_name':string;
    'email': string;
    'country_code': string;
}

export interface IDropDownList {
    'label' : string;
    'value' : string;
}

export interface IDropDownListYN {
    'label' : string;
    'value' : boolean;
}

export interface IRoleDropDownList {
    'label' : string;
    'value' : number;
}

export class ContactInfoDetails {
    user_fixed_details : IUserFixedDetails;
    roleId: number;
    first_name: string;
    middle_name:string;
    last_name:string;
    email: string;
    gender: string;
    primary_mobile: string;
    primary_mobile_label: string;
    secondary_mobile: string;
    secondary_mobile_label: string;
    other_mobile: string;
    other_mobile_label: string;
    secondary_email: string;
    secondary_email_label: string;
    other_email: string;
    other_email_label: string;
    fax: string;
    skype_user_name: string;
    licence_no: string;
    website_url_1: string;
    website_url_2: string;
    home_address: string;
    city: string;
    state: string;
    zip_code: string
    county: string;
    country: string;
    country_code: string;
    same_as_home_address: boolean;
    mailing_address: string;
    mailing_city: string;
    mailing_state: string;
    mailing_zip_code: string;
    mailing_county: string;
    mailing_country: string;
    mailing_country_code: string;
    user_id: number;

    constructor(loggedInUserId: number) {
        this.user_fixed_details =   {
                                        first_name: '',
                                        middle_name:'',
                                        last_name:'',
                                        groups: '',
                                        email: '',
                                        group_name: '',
                                        country_code: ''
                                    };

        this.roleId = loggedInUserId;
        this.first_name = '';
        this.middle_name='';
        this.last_name='';
        this.email = '';
        this.gender = '';
        this.primary_mobile = '';
        this.primary_mobile_label = '';
        this.secondary_mobile = '';
        this.secondary_mobile_label = '';
        this.other_mobile = '';
        this.other_mobile_label = '';
        this.secondary_email = '';
        this.secondary_email_label = '';
        this.other_email = '';
        this.other_email_label = '';
        this.fax = '';
        this.skype_user_name = '';
        this.licence_no = '';
        this.website_url_1 = '';
        this.website_url_2 = '';
        this.home_address = '';
        this.city = '';
        this.state = '';
        this.zip_code = '';
        this.county = '';
        this.country = '';
        this.country_code = '';
        this.same_as_home_address = false;
        this.mailing_address = '';
        this.mailing_city = '';
        this.mailing_state = '';
        this.mailing_zip_code = '';
        this.mailing_county = '';
        this.mailing_country = '';
        this.mailing_country_code = '';
        this.user_id = loggedInUserId;
    }
}
export class PublicInfoDetails {
    user_id: number;
    language: string;
    business_title: string;
    experience: string;
    team_name: string;
    slogan: string;
    specialties: string;
    biography: string;
    education: string;
    awards: string;
    interests: string;
    books: string;
    movies: string;
    travel: string;

    constructor(loggedInUserId: number) {
        
        this.user_id = loggedInUserId;
        this.language = "";
        this.business_title = "";
        this.experience = "";
        this.team_name = "";
        this.slogan = "";
        this.specialties = "";
        this.biography = "";
        this.education = "";
        this.awards = "";
        this.interests = "";
        this.books = "";
        this.movies = "";
        this.travel = "";
    }
}

export class RealtorMembershipDetails {
    id: number;
    user_id: number;
    membership_name: string;
    membership_id: string;
    national_association_realtor_id: string;
    state_association_realtor: IAssociationProviderList[];
    local_association_realtor: IAssociationProviderList[];
    mls_provider: IAssociationProviderList[];
    mls_public_id: string;
    mls_public_id2: string;
    mls_public_id3: string;

    constructor(loggedInUserId: number) {
        this.id = loggedInUserId;
        this.user_id = loggedInUserId;
        this.membership_name = "";
        this.membership_id = "";
        this.national_association_realtor_id = "";
        this.state_association_realtor = [];
        this.local_association_realtor = [];
        this.mls_provider = [];
        this.mls_public_id = "";
        this.mls_public_id2 = "";
        this.mls_public_id3 = "";
    }
}

export interface IAssociationProviderList {
    'id': string;
    'itemName': string;
}

export interface IServiceAreaColumns {
    'field': string;
    'header': string;
}

export class ServiceAreaInfoDetails {
    id: number;
    user_id: number;
    city: string;
    state: string;
    county: string;
    country: string;
    zip_code: string;
    community: string;
    country_code:string;

    constructor(loggedInUserId, state, country) {
        this.id = loggedInUserId;
        this.user_id = loggedInUserId;
        this.city = "";
        this.state = state;
        this.county = "";
        this.country = country;
        this.zip_code = "";
        this.community = "";
        this.country_code="";
    }
}

export interface ICountyList {
    'name': string;
}

export class CompanyInfoDetails {
    id: number;
    company_name: string;
    company_type: string;
    ein: string;
    mailing_address: string;
    mailing_city: string;
    mailing_state: string;
    mailing_zip_code: string;
    mailing_county: string;
    w9_url: string;

    constructor(loggedInUserId: number) {
        this.id = loggedInUserId;
        this.company_name = "";
        this.company_type = "";
        this.ein = "";
        this.mailing_address = "";
        this.mailing_city = "";
        this.mailing_state = "";
        this.mailing_zip_code = "";
        this.mailing_county = "";
        this.w9_url = "";
    }
}

export class ChangePasswordDetails {
    current_password: string;
    new_password: string;
    confirm_new_password: string;

    constructor() {
        this.current_password = "";
        this.new_password = "";
        this.confirm_new_password = "";
    }
}

export class GeneralSettingDetails {
    user_id: number;
    time_zone: string;
    set_time: string;

    constructor(loggedInUserId: number) {
        this.user_id = loggedInUserId;
        this.time_zone = "";
        this.set_time = "";
    }
}

export class SocialMediaDetails {
    user_id: number;
    facebook_url: string;
    twitter_url: string;
    linkedin_url: string;
    pinterest_url: string;
    youtube_url: string;
    instagram_url: string;
    google_plus_url: string;
    wordpress_url: string;
    blog_url: string;
    
    constructor(loggedInUserId: number)
    {
        this.user_id = loggedInUserId;
        this.facebook_url = "";
        this.twitter_url = null;
        this.linkedin_url = null;
        this.pinterest_url = "";
        this.youtube_url = null;
        this.instagram_url = "";
        this.google_plus_url = "";
        this.wordpress_url = null;
        this.blog_url = null;
    }
}

export const ServiceAreaTableColumnList: IServiceAreaColumns[] =   [
    { field: 'country', header: 'Country' },
    { field: 'state', header: 'State' },
    { field: 'county', header: 'County' },
    { field: 'city', header: 'City' },
    { field: 'zip_code', header: 'Zip Code' },
    { field: 'community', header: 'Community' }
];

export const roleOptionsList: IDropDownList[] =   [
    {value: 'C-Corporation',label: 'C-Corporation'},
    {value: 'S-Corporation',label: 'S-Corporation'},
    {value: 'Limited Liability Company',label: 'Limited Liability Company'},
    {value: 'Limited Partenership',label: 'Limited Partenership'},
    {value: 'Sole Partenership',label: 'Sole Partenership'}
];

export const countyOptionsList: ICountyList[] =  [
    {name:'A'},
    {name:'B'},
    {name:'C'},
    {name:'D'}
];

export const workTypeOptionsList: IDropDownList[] =   [
    {label: 'Home', value:'Home'},
    {label: 'Work', value:'Work'},
    {label: 'Other', value:'Other'},
];

export const genderTypeOptionsList: IDropDownList[] =   [
    {value: 'Male', label: 'Male'},
    {value: 'Female', label: 'Female'},
];

export const stateAssociationListOptionsList: IAssociationProviderList[] =   [
    { "id": "California Association of REALTORS®", "itemName": "California Association of REALTORS®"}, 
    { "id": "Nevada Association of REALTORS®", "itemName": "Nevada Association of REALTORS®"}, 
    { "id": "Arizona Association of REALTORS®", "itemName": "Arizona Association of REALTORS®"}, 
    { "id": "Florida Association of REALTORS®", "itemName": "Florida Association of REALTORS®"}, 
];

export const localAssociationListOptionsList: IAssociationProviderList[] =   [
    {"id": "Southwest Riverside County Association of REALTORS®", "itemName": "Southwest Riverside County Association of REALTORS®"},
    {"id": "Orange County Association of REALTORS®", "itemName": "Orange County Association of REALTORS®"},
    {"id": "Southland Regional Association of REALTORS®", "itemName": "Southland Regional Association of REALTORS®"},
    {"id": "Inland Valley Association of REALTORS®", "itemName": "Inland Valley Association of REALTORS®"},
];

export const MLSProviderListOptionsList: IAssociationProviderList[] =   [
    {"id": "CRMLS", "itemName": "CRMLS"},
    {"id": "Sandicor MLS", "itemName": "Sandicor MLS"},
    {"id": "CARETS", "itemName": "CARETS"},
    {"id": "MetroList MLS", "itemName": "MetroList MLS"},
];

export const defaultImagePath= './assets/images/no-image.png';


