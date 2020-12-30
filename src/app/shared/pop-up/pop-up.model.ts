export class AddUser {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    groups: number;
}

export class AddEmp {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    groups: number;
  static email: boolean;
}



export class AddProgram {
    name: string;
    groups: number;
    templates: number;
    schedule_options: string;
    scheduled_date: number;
    schedule_week: number;
    schedule_day_on: number;
    schedule_day: number;
    schedule_hours: number;
    schedule_minutes: number;
    is_active: boolean;
    types: string;
    content: string;
}


export class AddTag {
    tag_name: string;
    description: string;
    slug: string;
    is_global: boolean;
}

export class AddGroup {
    group_name: string;
    description: string;
    contact_id: Array<number>;
}

export class EmailOption {
    email: '';
    'email_label': '';
    emailExist: false;
    dropdown: false;
    valid: boolean;
    constructor() {
        this.valid = this.valid ? this.valid : true;
        this.emailExist = this.emailExist ? this.emailExist : false;
    }
}


export class PhoneDetails {
    internationalNumber: '';
    nationalNumber: '';
    countryCode: '';
    dialCode: '';
    constructor() {
        this.internationalNumber = this.internationalNumber ? this.internationalNumber : '';
        this.nationalNumber = this.nationalNumber ? this.nationalNumber : '';
        this.countryCode = this.countryCode ? this.countryCode : '';
        this.dialCode = this.dialCode ? this.dialCode : '';
    }
}

export class MobileDetails {
    number: PhoneDetails;
    constructor() {
        this.number = new PhoneDetails();
    }
}

export class MobileOption {
    mobile: MobileDetails;
    'mobile_label': '';
    mobileExist: false;
    dropdown: false;
    constructor() {
        this.mobile = new MobileDetails();
        this.mobile_label = this.mobile_label ? this.mobile_label : '';
        this.mobileExist = this.mobileExist ? this.mobileExist : false;
        this.dropdown = this.dropdown ? this.dropdown : false;
    }
}

export const LabelOption = [
    { name: 'Home', value: 'home' },
    { name: 'Work', value: 'Work' },
    { name: 'Other', value: 'other' },
];

export const EmailsOption = [
    { name: 'Personal', value: 'personal' },
    { name: 'Work', value: 'Work' },
    { name: 'Primary', value: 'primary' },
    { name: 'Secondary', value: 'secondary' },
    { name: 'Other', value: 'other' },
];

export const EmailOptionLabel = [
    { label: 'Personal', value: 'personal' },
    { label: 'Work', value: 'Work' },
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
    { label: 'Other', value: 'other' },
];


export const PhoneOptionLabel= [
    { label: 'Personal', value: 'personal' },
    { label: 'Work', value: 'Work' },
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
    { label: 'Other', value: 'other' },
];

export const PhoneOption= [
    { label: 'Personal', value: 'personal' },
    { label: 'Work', value: 'Work' },
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
    { label: 'Other', value: 'other' },
];

export const GenderOptions = [
    { label: 'Other', value: 'Other' },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
];

export const AllServiceTypes = [
    {label: 'Individual', value: 'Individual'},
    {label: 'Company', value: 'Company'}
]
export const VendorOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
];


export const PreProviderOption = {
    2: "Company",
    4: "Realtor",
    1: "Individual",
};

export const AddWebsiteOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
];

export const TimeFrame = [
    { label: 'Days', value: 'Days' },
    { label: 'Months', value: 'Months' },
    { label: 'Years', value: 'Years' },
];

export class AddContact {
    prefix: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    serviceType: string;
    label: string;

    email: string;
    secondary_email: string;
    other_email: string;
    email_label: string;
    secondary_email_label: string;
    other_email_label: string;
    phone: any;
    secondary_phone: any;
    other_phone: any;
    phone_label: string;
    secondary_phone_label: string;
    other_phone_label: string;

    address_line: string;
    job_title: string;
    address_line2: string;
    interested_address: string;
    interested_address2: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    image: string;
    gender: String;
    customer: string;
    supplier: string;
    'is_investor': string;
    status: string;
    comment: string;
    criteria: string;
    function: string;
    'timeframe': string;
    'budget_min': number;
    'budget_max': number;
    source: string;
    'sub_source': string;
    groups: Array<any>;
    address: string;
    'company_name': string;
    status_rating: string;
    tags: Array<any>;
    constructor() {
        this.gender = '';
    }
}

export class AddService {
    service_type           :         any;
    groups                 :         string;
    add_to_website         :         boolean;
    approved_vendor        :         boolean;
    first_name             :         string;
    middle_name            :         string;
    last_name              :         string;
    company_name           :         string;
    user_id                :         string;
    password               :         string;
    country                :         string;
    country_code           :         string;
    state                  :         string;
    city                   :         string;
    zip_code               :         string;
    longitude              :         number;
    latitude              :         number;
    phone                  :         any;
    phone2                 :         any;
    phone3                 :         any;
    phone_label            :         string;
    phone_label2           :         string;
    phone_label3           :         string;
    email                  :         string;
    email2                 :         string;
    email3                 :         string;
    email_label            :         string;
    email_label2           :         string;
    email_label3           :         string;
    label                  :         string;
    fax                    :         string;
    website_url            :         string;
    address_line1          :         string;
    address_line2          :         string;
    license                :         string;
    policy_membership      :         string;
    fee_dollar             :         any;
    image_url              :         string;
    associated_contacts    :         Array<any>;
    contactInfo            :         Array<any>;
    title                  :         string;
    contact_phone          :         string;
    contact_email          :         string;
    contact_phone_label    :         string; 
    description            :         string;
}

export class AddTicket {
    'associated_contacts': Array<any>;
    status: string;
    type: string;
    subject: string;
    description: string;
    'assigne_to': number;
    priority: string;
    attachment: Array<any>;
    category_type: string;
}

export class field{
    _id?:any;
    name?:any;
    type?:any;
    icon?:any;
    toggle?:any;
    required?:any;
    regex?:any;
    errorText?:any;
    label?:any;
    description?:any;
    placeholder?:any;
    className?:any;
    subtype?:any;
    handle?:any;
    min?:number;
    max?:number;
    inline?:any;
    value?:any;
    values?:Array<value>;
}
  
export class value{
    label?:any="";
    value?:any="";
}
  
export interface IProperty {
    url?: string;
    loading?: boolean;
    itemsPerPage?: number;
    total?: number;
    p?: number;
    sizeLimit?: number;
    title?: string;
    text?: string;
    items?: any[];
    sub?: any;
    isBlocked?: boolean;
    isDeleted?: boolean;
    isEmailVerified?: string;
    successMsg?: string;
    msg?: string;
    userId?: string;
    status?: number;
    userPlaceholder?: string;
    searchKey?: string;
    fullName?: string;
    email?: string;
    countryCode?: string;
    dialCode?: string;
    phoneNumber?: string;
    value?: Date;
    data?: any;
    name_es?: string;
    name_en?: string;
    countries?: any;
    states?: any;
    cities?: any;
    countries1?: any;
    states1?: any;
    cities1?: any;
    countries2?: any;
    states2?: any;
    cities2?: any;
    localities?: any;
    buildings?: any;
    country_id?: string;
    state_id?: string;
    city_id?: string;
    locality_id?: string;
    building_id?: string;
    countryCount?: number;
    stateCount?: number;
    cityCount?: number;
    stateCityCount?: number;
    localityCount?: number;
    buildingCount?: number;
    countriesAdd?: any;
    statesAdd?: any;
    citiesAdd?: any;
    localitiesAdd?: any;
    country_idAdd?: string;
    state_idAdd?: string;
    city_idAdd?: string;
    locality_idAdd?: string;
    countryCountAdd?: number;
    stateCountAdd?: number;
    cityCountAdd?: number;
    localityCountAdd?: number;
    successText?: string;
    propertyTypes?: any;
    propertyTypesCount?: number;
    amenities?: any;
    amenitiesCount?: number;
    projectTypes?: any;
    projectTypesCount?: number;
    routeName?: string;
    icon?: any;
    userType?: string;
    overlay?: any;
    is_broker_seller_dev?: number;
    is_buyer_renter?: number;
    is_broker?: number;
    is_data_collector?: number;
    image?: any;
    index?: number;
    name?: string;
    phone?: string;
    type?: number;
    property_id?: string;
    banks?: any;
    bankCount?: string;
    flag?: number;
    page?: number;
    property_for?: any;
    status_id?:any;
    type_id?:any;
    post_type?:any;
    developer_id?:any;
}

export const Group_IDs = {
    FREQUENTLY_USED_FIELDS: "frequently_used_fields",
    CONTACT_INFORMATION: "contact_information"
};

export const ContactPropertiesList = [
    {
        sub_header: "Frequently used fields",
        tab_opened: true,
        sub_header_id : "frequently_used_fields",
        controls_list: []
    },
    {
        sub_header : "Contact information",
        tab_opened: true,
        sub_header_id : "contact_information",
        controls_list: []
    }
];

export const CreateFieldsList = [
    {
        "label_name" : "Single-line text", 
        "control_enabled": true,
        "required": false,
        "type": "text",
        "icon": "../../../../assets/images/Single line text.svg",
        "iconClass": "iconImage",
        "name": "",
        "label": "Single-line text",
        "description": "",
        "placeholder": "",
        "className": "form-control",
        "subtype": "text",
        "regex" : "",
        "group_id": "", 
        "handle":true
    },
    {
        "label_name" : "Number", 
        "control_enabled": true,
        "required": false,
        "type": "number",
        "icon": "../../../../assets/images/Single line number.svg",
        "iconClass": "iconImage",
        "name": "",
        "label": "Number",
        "description": "",
        "placeholder": "",
        "className": "form-control",
        "subtype": "number",
        "regex" : "",
        "group_id": "", 
        "handle":true
    },
    {
        "label_name" : "Single checkbox", 
        "required": false,
        "control_enabled": true,
        "type": "checkbox",
        "icon": "../../../../assets/images/Single check box.svg",
        "iconClass": "iconImageModified",
        "name": "",
        "label": "Single checkbox",
        "description": "",
        "placeholder": "",
        "className": "form-control",
        "subtype": "checkbox",
        "regex" : "",
        "group_id": "", 
        "handle":true
    },
    {
        "label_name" : "Multiple checkboxes", 
        "control_enabled": true,
        "required": false,
        "type": "multi_checkbox",
        "iconClass": "iconImage",
        "icon": "../../../../assets/images/Double checkbox.svg",
        "name": "",
        "label": "Multiple checkboxes",
        "description": "",
        "placeholder": "",
        "className": "form-control",
        "subtype": "multi_checkbox",
        "regex" : "",
        "group_id": "", 
        "handle":true
    },
    {
        "label_name" : "Dropdown", 
        "control_enabled": true,
        "required": false,
        "type": "autocomplete",
        "iconClass": "iconImage",
        "icon": "../../../../assets/images/dropdown.svg",
        "name": "",
        "label": "Dropdown",
        "description": "",
        "placeholder": "",
        "className": "form-control",
        "subtype": "autocomplete",
        "regex" : "",
        "group_id": "", 
        "handle":true,
        "values":[]
    },
    {
        "label_name" : "Multi-line text", 
        "required": false,
        "control_enabled": true,
        "type": "textarea",
        "icon": "../../../../assets/images/Multimedia.svg",
        "iconClass": "iconImage",
        "name": "",
        "label": "Multi-line text",
        "description": "",
        "placeholder": "",
        "className": "form-control",
        "subtype": "textarea",
        "regex" : "",
        "group_id": "", 
        "handle":true
    },
    {
        "label_name" : "Radio", 
        "required": false,
        "control_enabled": true,
        "type": "radio",
        "icon": "../../../../assets/images/Radio.svg",
        "iconClass": "iconImage",
        "name": "",
        "label": "",
        "description": "Radio",
        "placeholder": "",
        "className": "form-control",
        "subtype": "radio",
        "regex" : "",
        "group_id": "", 
        "handle":true
    },
    {
        "label_name" : "Date picker", 
        "required": false,
        "control_enabled": true,
        "type": "date",
        "icon": "../../../../assets/images/Calander.svg",
        "iconClass": "iconImageModified",
        "name": "",
        "label": "Date picker",
        "description": "",
        "placeholder": "",
        "className": "form-control",
        "subtype": "date",
        "regex" : "",
        "group_id": "", 
        "handle":true
    },
    {
        "label_name" : "File", 
        "required": false,
        "control_enabled": true,
        "type": "file",
        "icon": "../../../../assets/images/file.svg",
        "iconClass": "iconImageModified",
        "name": "",
        "label": "File",
        "description": "",
        "placeholder": "",
        "className": "form-control",
        "subtype": "file",
        "regex" : "",
        "group_id": "", 
        "handle":true
    },
    {
        "label_name" : "Paragraph (RichText)", 
        "required": false,
        "control_enabled": true,
        "type": "paragraph",
        "icon": "../../../../assets/images/Paragraph.svg",
        "iconClass": "iconImageModified",
        "name": "",
        "label": "Paragraph (RichText)",
        "description": "",
        "placeholder": "",
        "className": "form-control",
        "subtype": "paragraph",
        "regex" : "",
        "group_id": "", 
        "handle":true
    }
];

export const supportedFieldsList = [
    {id: 1,field_type : "text"},
    {id: 2,field_type : "number"},
    {id: 3,field_type : "checkbox"},
    {id: 4,field_type : "multi_checkbox"},
    {id: 5,field_type : "select"},
    {id: 6,field_type : "date"},
    {id: 7,field_type : "textarea"},
    {id: 8,field_type : "radio"},
    {id: 9,field_type : "file"},
    {id: 10,field_type : "H1"},
    {id: 11,field_type : "paragraph"},
    {id: 12,field_type : "image"}
];

export const supportedFieldsTypes = {
    "TEXT"          : "text",
    "NUMBER"        : "number",
    "CHECKBOX"      : "checkbox",
    "MULTI_CHECKBOX": "multi_checkbox",
    "SELECT"        : "select",
    "AUTO_COMPLETE"  : "autocomplete",
    "DATE"          : "date",
    "TEXTAREA"      : "textarea",
    "RADIO"         : "radio",
    "FILE"          : "file",
    "H1"            : "H1",
    "PARAGRAPH"     : "paragraph",
    "IMAGE"         : "image"
};

export const ObjectTypeList = [
    {value: 1,label : "Contact"},
]

export const SortTypeList = [
    { label: "Custom", value: "Custom" },
    { label: "Alphabatical", value: "Alphabatical" }
];