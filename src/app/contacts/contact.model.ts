export const TagsTableCols = [
    { field: 'is_active', header: 'Status' },
    { field: 'tag_name', header: 'Tag' },
    { field: 'description', header: 'Description' },
    { field: 'slug', header: 'Slug' },
    { field: 'tag_count', header: 'Count' },
];

export const TagsTableDmsCols = [
    { field: 'is_active', header: 'Status' },
    { field: 'tag_name', header: 'Tag' },
    { field: 'slug', header: 'Slug' },
    { field: 'description', header: 'Description' },
    { field: 'globalTag', header: 'Global Tag' },
];

export const PlayTableCols = [
    { field: 'is_active', header: 'Status' },
    { field: 'playbook_state', header: 'Playbook Status' },
    { field: 'playbook_name', header: 'Name' },
    { field: 'total_views', header: 'Total Views' },
    { field: 'created', header: 'Created By' },
    { field: 'date_created', header: 'Date Created' },
    { field: 'modified_at', header: 'Modified At' },
];
export const columnsData = [
    { label: 'Name' },
    { label: 'Email' },
    { label: 'Phone Number' },
    { label: 'Address'},
    { label: 'Budget'},
    { label: 'Created on'},
    { label: 'Last Activity'},
];

export const GroupTableCols = [
    { field: 'is_active', header: 'Status' },
    { field: 'group_name', header: 'Group Name' },
    { field: 'description', header: 'Description' },
    { field: 'no_of_contact', header: 'No. of Contacts' },
];


export const StatusOptions = [
    { label: 'Active', value: true },
    { label: 'Deactive', value: false }
];

export const PlaybookOptions = [
    { label: 'Draft', value: "DRAFT" },
    { label: 'Published', value: "PUBLISHED" }
];

const spProvider = 'Service Providers';
export const ImportOptions = [
    { label: 'Contacts', value: 'contacts' },
    { label: spProvider, value: spProvider },
    { label: 'Groups', value: 'Groups' },
    { label: 'Leads', value: 'Leads' }
];

export const ExportOptions = [
    { label: 'Contacts', value: 'contacts' },
    { label: 'Tasks', value: 'tasks' },
    { label: 'Tickets', value: 'tickets' },
    { label: 'Tags', value: 'tags' },
    { label: 'Groups', value: 'groups' },
    { label: 'Templates', value: 'templates' },
    { label: 'Campaigns', value: 'campaigns' },
    { label: 'Service Providers', value: 'service' },
];

export const ImportType = [
    { label: 'Add New Records', value: 'Add New Records' },
    { label: 'Update Existing records', value: 'Update Existing records' },
    { label: 'Add New and update existing records', value: 'Add New and update existing records' },
];

export const ContactTableCols = [
    { field: 'contact_status', header: 'Status' },
    { field: 'name', header: 'Name' },
    { field: 'details', header: 'Details'},
    { field: 'note', header: 'Contact Type' },
    { field: 'actions', header: 'Sales Person' },
    { field: 'activity', header: 'Sales Team' },
    { field: 'created_on', header: 'Created Date' },
];
export const ContactTableColsTab = [
    { field: 'contact_status', header: 'Status' },
    { field: 'name', header: 'Name' },
    { field: 'phone', header: 'Phone' },
    { field: 'email', header: 'Email' },
    { field: 'details', header: 'Details'},
    { field: 'group', header: 'Group' },
    { field: 'created_on', header: 'Created' },
    { field: 'assigned_to', header: 'Assigned To' },
    { field: 'note', header: 'Note' },
    { field: 'edit', header: '' },
];

export const ServiceTableCols = [
    { field: 'status', header: 'Status' },
    { field: 'company_name', header: 'Provider Name' },
    { field: 'type', header: 'Provider Type' },
    { field: 'street', header: 'Details' },
    { field: 'name', header: 'Contact' },
    { field: 'group', header: 'Group' },
    { field: 'fee', header: 'Fee' },
    { field: 'created_at', header: 'Created Date' },
    { field: 'note', header: 'Note' },
];
export const ServiceLineCols = [
    { field: 'status', header: 'Status' },
    { field: 'company_name', header: 'Provider Name' },
    { field: 'licence_no', header: 'Licence Number' },
    { field: 'policy_no', header: 'Policy Number' },
    { field: 'street', header: 'Address' },
    { field: 'phone_no', header: 'Phone Number' },
    { field: 'email_id', header: 'Email Id' },
    { field: 'name', header: 'Contact' },
    { field: 'group', header: 'Group' },
    { field: 'fee', header: 'Fee' },
    { field: 'created_at', header: 'Created Date' },
    { field: 'note', header: 'Note' },
];
export const ServiceOptions = [
    { label: 'Individual', value: 'Individual' },
    { label: 'Company', value: 'Company' },
];

export const VendorOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
];

export const AddWebsiteOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
];

export const ContactStatus = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false },
];

export const GroupOptions = [
    { label: 'Buyers', value: 'buyer' },
    { label: 'Sellers', value: 'seller' },
    { label: 'Investors', value: 'investor' }
];
export const GenderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
];
export const TimeFrameOptions = [
    { label: 'Days', value: 'Days' },
    { label: 'Months', value: 'Months' },
    { label: 'Years', value: 'Years' },
];

export const LanguageOptions = [
    { label: 'Afrikaans', value: 'Afrikaans' },
    { label: 'Albanian', value: 'Albanian' },
    { label: 'Amharic', value: 'Amharic' },
    { label: 'Arabic', value: 'Arabic' },
    { label: 'Armenian', value: 'Armenian' },
    { label: 'Azerbaijani', value: 'Azerbaijani' },

    { label: 'Basque', value: 'Basque' },
    { label: 'Belarusian', value: 'Belarusian' },
    { label: 'Bengali', value: 'Bengali' },
    { label: 'Bosnian', value: 'Bosnian' },
    { label: 'Bulgarian', value: 'Bulgarian' },
    { label: 'Burmese', value: 'Burmese' },

    { label: 'Catalan', value: 'Catalan' },
    { label: 'Cebuano', value: 'Cebuano' },
    { label: 'Chewa', value: 'Chewa' },
    { label: 'Chinese (Simplified)', value: 'Chinese (Simplified)' },
    { label: 'Chinese (Traditional)', value: 'Chinese (Traditional)' },
    { label: 'Corsican', value: 'Corsican' },
    { label: 'Croatian', value: 'Croatian' },
    { label: 'Czech', value: 'Czech' },

    { label: 'Danish', value: 'Danish' },
    { label: 'Dutch', value: 'Dutch' },

    { label: 'English', value: 'English' },
    { label: 'Esperanto', value: 'Esperanto' },
    { label: 'Estonian', value: 'Estonian' },

    { label: 'Filipino', value: 'Filipino' },
    { label: 'Finnish', value: 'Finnish' },
    { label: 'French', value: 'French' },

    { label: 'Galician', value: 'Galician' },
    { label: 'Georgian', value: 'Georgian' },
    { label: 'German', value: 'German' },
    { label: 'Greek', value: 'Greek' },
    { label: 'Gujarati', value: 'Gujarati' },

    { label: 'Haitian Creole', value: 'Haitian Creole' },
    { label: 'Hausa', value: 'Hausa' },
    { label: 'Hawaiian', value: 'Hawaiian' },
    { label: 'Hebrew', value: 'Hebrew' },
    { label: 'Hindi', value: 'Hindi' },
    { label: 'Hmong', value: 'Hmong' },
    { label: 'Hungarian', value: 'Hungarian' },

    { label: 'Icelandic', value: 'Icelandic' },
    { label: 'Igbo', value: 'Igbo' },
    { label: 'Indonesian', value: 'Indonesian' },
    { label: 'Irish', value: 'Irish' },
    { label: 'Italian', value: 'Italian' },

    { label: 'Japanese', value: 'Japanese' },
    { label: 'Javanese', value: 'Javanese' },

    { label: 'Kannada', value: 'Kannada' },
    { label: 'Kazakh', value: 'Kazakh' },
    { label: 'Khmer', value: 'Khmer' },
    { label: 'Kinyarwanda', value: 'Kinyarwanda' },
    { label: 'Korean', value: 'Korean' },
    { label: 'Kurdish (Kurmanji)', value: 'Kurdish (Kurmanji)' },
    { label: 'Kyrgyz', value: 'Kyrgyz' },

    { label: 'Lao', value: 'Lao' },
    { label: 'Latin', value: 'Latin' },
    { label: 'Latvian', value: 'Latvian' },
    { label: 'Lithuanian', value: 'Lithuanian' },
    { label: 'Luxembourgish', value: 'Luxembourgish' },


    { label: 'Macedonian', value: 'Macedonian' },
    { label: 'Malagasy', value: 'Malagasy' },
    { label: 'Malay', value: 'Malay' },
    { label: 'Malayalam', value: 'Malayalam' },
    { label: 'Maltese', value: 'Maltese' },
    { label: 'Maori', value: 'Maori' },
    { label: 'Marathi', value: 'Marathi' },
    { label: 'Mongolian', value: 'Mongolian' },

    { label: 'Nepali', value: 'Nepali' },
    { label: 'Norwegian (Bokmål)', value: 'Norwegian (Bokmål)' },

    { label: 'Odia', value: 'Odia' },

    { label: 'Pashto', value: 'Pashto' },
    { label: 'Persian', value: 'Persian' },
    { label: 'Polish', value: 'Polish' },
    { label: 'Portuguese', value: 'Portuguese' },
    { label: 'Punjabi (Gurmukhi)', value: 'Punjabi (Gurmukhi)' },

    { label: 'Romanian', value: 'Romanian' },
    { label: 'Russian', value: 'Russian' },

    { label: 'Samoan', value: 'Samoan' },
    { label: 'Scots Gaelic', value: 'Scots Gaelic' },
    { label: 'Serbian', value: 'Serbian' },
    { label: 'Sesotho', value: 'Sesotho' },
    { label: 'Shona', value: 'Shona' },
    { label: 'Sindhi', value: 'Sindhi' },
    { label: 'Sinhala', value: 'Sinhala' },
    { label: 'Slovak', value: 'Slovak' },
    { label: 'Slovenian', value: 'Slovenian' },
    { label: 'Somali', value: 'Somali' },
    { label: 'Spanish', value: 'Spanish' },
    { label: 'Sundanese', value: 'Sundanese' },
    { label: 'Swahili', value: 'Swahili' },
    { label: 'Swedish', value: 'Swedish' },

    { label: 'Tajik', value: 'Tajik' },
    { label: 'Tamil', value: 'Tamil' },
    { label: 'Tatar', value: 'Tatar' },
    { label: 'Telugu', value: 'Telugu' },
    { label: 'Thai', value: 'Thai' },
    { label: 'Turkish', value: 'Turkish' },
    { label: 'Turkmen', value: 'Turkmen' },

    { label: 'Ukrainian', value: 'Ukrainian' },
    { label: 'Urdu', value: 'Urdu' },
    { label: 'Uyghur', value: 'Uyghur' },
    { label: 'Uzbek', value: 'Uzbek' },

    { label: 'Vietnamese', value: 'Vietnamese' },

    { label: 'Welsh', value: 'Welsh' },
    { label: 'West Frisian', value: 'West Frisian' },

    { label: 'Xhosa', value: 'Xhosa' },

    { label: 'Yiddish', value: 'Yiddish' },
    { label: 'Yoruba', value: 'Yoruba' },

    { label: 'Zulu', value: 'Zulu' },

];


export const EmailsOption = [
    { label: 'Personal', value: 'Personal' },
    { label: 'Work', value: 'Home' },
    { label: 'Primary', value: 'Primary' },
    { label: 'Secondary', value: 'Secondary' },
    { label: 'Other', value: 'Other' },
];

export const PhoneOption = [
    { label: 'Personal', value: 'Personal' },
    { label: 'Work', value: 'Home' },
    { label: 'Primary', value: 'Primary' },
    { label: 'Secondary', value: 'Secondary' },
    { label: 'Other', value: 'Other' },
];

export const EditContactRatingOption = [
    { label: 'Rating', value: 0 },
    { label: 'A', value: 1 },
    { label: 'B', value: 2 },
    { label: 'C', value: 3 },
    { label: 'D', value: 4 },
];

export const LeadProviders = [
    { field: 'is_active', header: '' },
    { field: 'image', header: 'Photo' },
    { field: 'save_status', header: 'Property Status' },
    { field: 'status', header: 'Status' },
    { field: 'expiration_Date', header: 'Expiration Date' },
    { field: 'property', header: 'Subject Property' },
    { field: 'price', header: 'Price' },
];

export const LeadProvidersLineView = [
    { field: 'is_active', header: '', full_header: '' },
    { field: 'compact_save_status', header: 'PS', full_header: 'Property Status' },
    { field: 's_no', header: 'S', full_header: 'Status' },
    { field: 'listing_key', header: 'Listing ID', full_header: 'Listing Key' },
    { field: 'listing_id', header: 'MLS #', full_header: 'MLS #' },
    { field: 'sub_type', header: 'Sub Type', full_header: 'Property Subtype' },
    { field: 'slc', header: 'ST', full_header: 'Sale Type' },
    { field: 'st_name', header: 'St# St Name', full_header: 'Street # Street Name' },
    { field: 'city', header: 'City', full_header: 'City' },
    { field: 'area', header: 'Area', full_header: 'Area' },
    { field: 'lc_price', header: 'L/C Price', full_header: 'List Price' },
    { field: 'sqft', header: 'Bldg LA', full_header: 'Building Living Area' },
    { field: 'br_ba', header: 'Br/Ba', full_header: 'Total bedrooms / Total bathrooms' },
    { field: 'l_sqft_ac', header: 'LSqft/ Ac', full_header: 'Lot Square Footage / Lot Acres' },
    { field: 'yr_built', header: 'YrBuilt', full_header: 'Year built' },
    { field: 'per_sqft', header: '$/Sqft', full_header: 'Price per square foot' },
    { field: 'dom', header: 'DOM', full_header: 'Days on Market' },
    { field: 'v_value', header: 'V', full_header: 'View' },
    { field: 'pp_value', header: 'PP', full_header: 'Pool' },
    { field: 'bac_value', header: 'CR', full_header: 'Commission Rate' },
    { field: 'date_value', header: 'Date', full_header: 'Date listed' },
    { field: 'mls_value', header: 'MLS', full_header: `MLS it's under` },
];

const addLeads = '/property/add-leads-listing';
export const LeadProviderListing = [
    {name:'Residential Sale', url: addLeads},
    {name:'Residential Lease', url: addLeads},
    {name:'Residential Income', url: addLeads},
    {name:'Land Lot', url: addLeads},
    {name:'Mobile Homes', url: addLeads},
    {name:'Commercial Sale', url: addLeads},
    {name:'Commercial Lease', url: addLeads},
    {name:'Business', url: addLeads}
]

export class viewUserContactDetails {
    tag: Array<any>;
    group: Array<any>;
    connections: Array<any>;
    social_media_links: Array<any>;

    constructor(data?) {
        this.tag = data.tag ? data.tag : [];
        this.group = data.group ? data.group : [];
        this.connections = data.connections ? data.connections : [];
        this.social_media_links = data.social_media_links ? data.social_media_links : [];
    }
}

export class ImportModel {
    importOption: string;
    importType: string;
    constructor() {
    }
}

export const PropertyDescExclusive = [
    { label: 'AREA', value: '' },
    { label: 'LIST $ ORIGINAL', value: '' },
    { label: 'BASEMENT SQFT', value: '' },
    { label: 'COUNTY', value: '' },
    { label: 'COMMON WALLS', value: '' },
    { label: 'SENIOR COMMUNITY?', value: '' },
    { label: 'PARKING', value: '' },
    { label: 'CERTIFIED 433A?', value: '' },
    { label: 'PROBATE AUTHORTIY', value: '' },
];

export const PropertyDescResIncExclusive = [
    { label: 'AREA', value: 'AAA' },
    { label: 'LIST $ ORIGINAL', value: '' },
    { label: 'SUBTYPE', value: '' },
    { label: 'COUNTY', value: '' },
    { label: 'COMMON WALLS', value: '' },
    { label: 'SENIOR COMMUNITY?', value: '' },
    { label: 'PARKING', value: '' },
    { label: 'GROSS EQUITY', value: '' },
    { label: '# OF BUILDINGS TOTAL', value: '' },
    { label: 'PRESENT LOANS $', value: '' },
    { label: 'RENT CONTROL ?', value: '' },
    { label: 'HAVE', value: '' },
    { label: 'PROPERTY ATTACHED', value: '' },
];

export const PropertyDescInclusive = [
    { label: 'ROOM TYPE', value: '' },
    { label: 'COOLING', value: '' },
    { label: 'EATING AREA', value: '' },
    { label: 'HEATING', value: '' },
    { label: 'VIEW', value: '' },
    { label: 'WATERFRONT', value: '' },
    { label: 'LAUNDRY', value: '' }
];

export const PropertyDesResIncInclusive = [
    { label: 'ROOM TYPE', value: '' },
    { label: 'COOLING', value: '' },
    { label: 'UTILITIES', value: '' },
    { label: 'HEATING', value: '' },
    { label: 'ELECTRIC', value: '' },
    { label: 'VIEW', value: '' },
    { label: 'WATER', value: '' },
    { label: 'WATERFRONT', value: '' },
    { label: 'LAUNDRY', value: '' },
    { label: 'PROBATE AUTHORITY', value: '' },
];

export const PropertyResIncInterior = [
    { label: 'INTERIOR', value: '' },
    { label: 'APPLIANCES', value: '' },
    { label: 'ENTRY LOC/ ENTRY LVL:', value: '' },
    { label: 'ACCESSIBILITY', value: '' },
    { label: 'FIREPLACE', value: '' },
    { label: 'SQFT STUDIO LEVEL', value: '' },
    { label: 'FLOORING', value: '' },
    { label: 'SQFT 1 BED AVG', value: '' },
    { label: 'SQFT 2 BED AVG', value: '' },
    { label: 'SQFT 3 BED AVG', value: '' }
];

export const PropertyInterior = [
    { label: 'INTERIOR', value: '' },
    { label: 'ACCESSIBILITY', value: '' },
    { label: 'FLOORING', value: '' },
    { label: 'MAIN LEVEL BEDROOMS', value: '' },
    { label: 'APPLIANCES', value: '' },
    { label: 'ENTRY LOC/ ENTRY LVL:', value: '' },
    { label: 'MAIN LEVEL BATHROOMS', value: '' },
    { label: 'BATHROOM FEATURES', value: '' },
    { label: 'KITCHEN FEATURES', value: '' },
    { label: 'FIREPLACE', value: '' }
];

export const PropertyExterior = [
    { label: 'EXTERIOR', value: '' },
    { label: 'SECURITY', value: '' },
    { label: 'LOT', value: '' },
    { label: 'PATIO/ PORCH', value: '' },
    { label: 'FENCING', value: '' },
    { label: 'SEWER', value: '' },
    { label: 'POOL', value: '' },
    { label: 'SPA', value: '' },
    { label: 'DIRECTION FACES', value: '' }
];

export const PropertyResIncExterior = [
    { label: 'EXTERIOR', value: '' },
    { label: 'SECURITY', value: '' },
    { label: 'LOT', value: '' },
    { label: 'FENCING', value: '' },
    { label: 'SEWER', value: '' },
    { label: 'POOL', value: '' },
    { label: 'SPA', value: '' },
    { label: 'DIRECTION FACES', value: '' }
];

export const PropertyAnalysis = [
    { label: 'GROSS SCHEDULED INCOME', value: '' },
    { label: 'GROSS SPENDABLE INCOME', value: '' },
    { label: 'VACANCY ALLOWANCE $', value: '' },
    { label: 'LOAN PAYMENT (ANNUAL)', value: '' },
    { label: 'GROSS OPERATING INCOME', value: '' },
    { label: 'GROSS MULTIPLIER', value: '' },
    { label: 'NET OPERATING', value: '' },
    { label: 'CAP RATE', value: '' },
    { label: 'OPERATING EXPENSE', value: '' },
    { label: 'IMPROVEMENTS TOTAL $', value: '' },
    { label: 'LAND DOLLAR VALUE $', value: '' },
    { label: 'PERSONAL PROPERTY', value: '' },
];

export const IncomeType = [
    { label: '# OF RENTED GARAGES', value: '' },
    { label: 'OTHER INCOME 1', value: '' },
    { label: 'GARAGE RENTAL RATE', value: '' },
    { label: 'OTHER INCOME 2', value: '' },
    { label: 'GARAGE RENTAL INCOME', value: '' },
    { label: 'OTHER INC. DESCRIPTION', value: '' },
    { label: 'LAUNDRY INCOME', value: '' },
    { label: 'LAUNDRY INC OWN/ LEASE ?', value: '' },
];

export const PropertyAnnualExpense = [
    { label: 'TOTAL OPERATING EXPENSE', value: '' },
    { label: 'FURNITURE REPLACEMENT', value: '' },
    { label: 'MAINTENANCE', value: '' },
    { label: 'OTHER EXPENSE', value: '' },
    { label: 'ELECTRIC', value: '' },
    { label: 'TRASH', value: '' },
    { label: 'WORKMAN\'S COMP', value: '' },
    { label: 'OTHER EXPENSE DESCRIPTION', value: '' },
    { label: 'GAS', value: '' },
    { label: 'CABLE TV', value: '' },
    { label: 'PROFESSIONAL MANAGEMENT', value: '' },
    { label: 'LICENSES', value: '' },
    { label: 'GARDENER', value: '' },
    { label: 'NEW TAXES', value: '' },
    { label: 'INSURANCE', value: '' },
    { label: 'WATER SEWER', value: '' },
];

export const PropertyTax = [
    { label: 'TAX RATE', value: '' },
    { label: 'TAX YEAR', value: '' },
    { label: 'TAX ANNUAL AMOUNT', value: '' },
    { label: 'TAX AREA', value: '' },
];

export const PropertyUnitInfo = [
    { label: '# OF UNITS WITH', value: '' },
];

export const PropertySubType = [
    { label: 'PROP SUB TYPE', value: '' }
];

export const StructureType = [
    { label: 'STRUCTURE TYPE', value: '' }
];

export const CommonInterest = [
    { label: 'COMMON INTEREST', value: '' }
];

export const BuildingFeaturesList = [
    { label: 'BUILDING NAME', value: '' },
    { label: 'ARCH STYLE', value: '' },
    { label: 'ROOF', value: '' },
    { label: 'CONSTR MTLS', value: '' },
    { label: 'MAKE', value: '' },
    { label: 'DOOR', value: '' },
    { label: 'FOUNDATION DTLS', value: '' },
    { label: 'OTHER STRUCT', value: '' },
    { label: 'BUILD MODEL', value: '' },
    { label: 'WINDOW', value: '' },
    { label: 'PROP COND', value: '' },
    { label: 'NEW CONSTRUCTION YN', value: '' },
    { label: 'TAX MODEL', value: '' }
];

export const BuildingResIncList = [
    { label: 'BUILDER NAME', value: '' },
    { label: 'ARCH STYLE', value: '' },
    { label: 'ROOF', value: '' },
    { label: 'CONSTR MTLS', value: '' },
    { label: 'DOOR', value: '' },
    { label: 'FOUNDATION DTLS', value: '' },
    { label: 'OTHER STRUCT', value: '' },
    { label: 'BUILD MODEL', value: '' },
    { label: 'WINDOW', value: '' },
    { label: 'PROP COND', value: '' },
    { label: 'NEW CONSTRUCTION YN', value: '' },
];

export const GarageAndParking = [
    { label: 'ATTACHED GARAGE ?', value: '' },
    { label: 'PARKING TOTAL', value: '' },
    { label: 'GARAGE SPACES', value: '' },
    { label: 'CARPORT SPACES', value: '' },
    { label: 'UNCOVERED SPACES', value: '' },
    { label: '# REMOTES', value: '' },
    { label: 'RV PARK DIM', value: '' },
];

export const GarageResIncParking = [
    { label: 'ATTACHED GARAGE ?', value: '' },
    { label: 'PARKING TOTAL', value: '' },
    { label: 'GARAGE SPACES', value: '' },
    { label: 'CARPORT SPACES', value: '' },
    { label: 'UNCOVERED SPACES', value: '' },
];

export const GreenFeaturesList = [
    { label: 'GREEN BLDG VERIFICATION TYPE', value: '' },
    { label: 'GREEN VERIFICATION BODY', value: '' },
    { label: 'GREEN VERIFICATION YR', value: '' },
    { label: 'GREEN VERIFICATION RATING', value: '' },
    { label: 'GREEN ENERGY GEN', value: '' },
    { label: 'GREEN ENERGY EFFICIENT', value: '' },
    { label: 'GREEN SUSTAIN', value: '' },
    { label: 'GREEN WATER CONSERV', value: '' },
    { label: 'WALK SCORE', value: '' }
];

export const PowerProduction = [
    { label: 'POWER PRODUCTION TYPE', value: '' },
    { label: 'POWER PRODUCTION SIZE', value: '' },
    { label: 'POWER PRODUCTION YR INSTALL', value: '' },
    { label: 'POWER PRODUCTION ANNUAL', value: '' },
    { label: 'POWER PRODUCTION ANNUAL STATUS', value: '' }
];

export const CommunityFeaturesList = [
    { label: 'HOA FEE', value: '' },
    { label: 'HOA NAME', value: '' },
    { label: 'HOA PHONE', value: '' },
    { label: 'NUMBER OF UNITS', value: '' },
    { label: 'HOA FEE 2', value: '' },
    { label: 'HOA NAME 2', value: '' },
    { label: 'HOA PHONE 2', value: '' },
    { label: 'NUMBER OF UNITS IN COMMUNITY', value: '' },
    { label: 'COMMUNITY', value: '' },
    { label: 'HOA AMENITIES', value: '' },
    { label: 'HOA MANAGEMENT NAME', value: '' },
    { label: 'HOA MANAGEMENT NAME 2', value: '' }
];

export const CommunityResIncList = [
    { label: 'HOA DUES 1', value: '' },
    { label: 'HOA NAME', value: '' },
    { label: 'HOA PHONE', value: '' },
    { label: 'HOA AMENITIES', value: '' },
    { label: 'HOA DUES 2', value: '' },
    { label: 'HOA NAME 2', value: '' },
    { label: 'HOA PHONE 2', value: '' },
    { label: 'STORIES TOTAL', value: '' },
    { label: 'COMMUNITY', value: '' },
    { label: 'HOA MANAGEMENT NAME', value: '' },
    { label: 'HOA MANAGEMENT NAME 2', value: '' }
];

export const LandFeaturesList = [
    { label: 'LAND LEASE ?', value: '' },
    { label: 'LAND LEASE AMOUNT', value: '' },
    { label: 'UTILITIES', value: '' },
    { label: 'TAX LOT', value: '' },
    { label: 'PARCEL NUMBER', value: '' },
    { label: 'LAND LEASE AMOUNT FREQUENCY', value: '' },
    { label: 'ELECTRIC', value: '' },
    { label: 'TAX BLOCK', value: '' },
    { label: 'ADDITIONAL APN(s)', value: '' },

    { label: 'LAND LEASE PURCHASE ?', value: '' },
    { label: 'WATER SOURCE', value: '' },
    { label: 'TAX TRACT NUMBER', value: '' },
    { label: 'LAND LEASE RENEW', value: '' },
    { label: 'LOT SIZE DIM', value: '' },
    { label: 'ZONING', value: '' },
    { label: 'ASSESSMENTS', value: '' }
];

export const LandResIncList = [
    { label: 'LAND LEASE ?', value: '' },
    { label: 'ELEVATION', value: '' },
    { label: 'TAX LOT', value: '' },
    { label: 'TAX BLOCK', value: '' },
    { label: 'COMMON INTEREST', value: '' },
    { label: 'ASSESSMENTS', value: '' },
    { label: 'LOT SIZE DIM', value: '' },
    { label: 'TAX TRACT NUMBER', value: '' },
    { label: 'LAND LEASE AMOUNT', value: '' },
    { label: 'PARCEL NUMBER', value: '' },
    { label: 'ZONING', value: '' },
    { label: 'LAND LEASE AMOUNT FREQUENCY', value: '' },
    { label: 'ADDITIONAL PARCEL(s)', value: '' },
];

export const SchoolFeaturesList = [
    { label: 'HIGH SCHOOL DISTRICT', value: '' },
    { label: 'ELEMENTARY', value: '' },
    { label: 'MIDDLE/JR HIGH', value: '' },
    { label: 'HIGH SCHOOL', value: '' },
    { label: 'ELEMENTARY OTHER', value: '' },
    { label: 'MIDDLE/JR HIGH OTHER', value: '' },
    { label: 'HIGH SCHOOL OTHER', value: '' },
];

export const ListingFeaturesList = [
    { label: 'BAC', value: '' },
    { label: 'TERMS', value: '' },
    { label: 'BAC REMARKS', value: '' },
    { label: 'LIST AGREEMENT', value: '' },
    { label: 'DUAL/VARI COMP?', value: '' },
    { label: 'LIST SERVICE', value: '' },
    { label: 'LEASE CONSIDERED?', value: '' },
    { label: 'AD NUMBER', value: '' },
    { label: 'CURRENT FINANCING', value: '' },
    { label: 'DISCLOSURES', value: '' },
    { label: 'POSSESSION', value: '' },
    { label: 'SIGN ON PROPERTY?', value: '' },
    { label: 'INTERNET? / ADDRESS?', value: '' },
    { label: 'CONTINGENCY LIST', value: '' },
    { label: 'CONTINGENCY', value: '' },
    { label: 'PRIVATE REMARKS', value: '' }
];

export const ListingResIncList = [
    { label: 'BAC', value: '' },
    { label: 'LIST TERMS', value: '' },
    { label: 'LIST CONTRACT DATE', value: '' },
    { label: 'BAC REMARKS', value: '' },
    { label: 'LIST AGREEMENT', value: '' },
    { label: 'START SHOWING DATE', value: '' },
    { label: 'DUAL/VARI COMP?', value: '' },
    { label: 'LIST SERVICE', value: '' },
    { label: 'ON MARKET DATE', value: '' },
    { label: 'CURRENT FINANCING', value: '' },
    { label: 'AD NUMBER', value: '' },
    { label: 'PRICE CHG TIMESTAMP', value: '' },
    { label: 'POSSESSION', value: '' },
    { label: 'DISCLOSURES', value: '' },
    { label: 'STATUS CHG TIMESTAMP', value: '' },
    { label: 'FINANCIAL INFO AS OF', value: '' },
    { label: 'INTERNET,AVM? / COMM?', value: '' },
    { label: 'MOD TIMESTAMP', value: '' },
    { label: 'CONTINGENCY LIST', value: '' },
    { label: 'INTERNET? / ADDRESS?', value: '' },
    { label: 'EXPIRED DATE', value: '' },
    { label: 'PURCH CONTRACT DATE', value: '' },
    { label: 'ENDING DATE', value: '' },
    { label: 'CONTINGENCY', value: '' },
    { label: 'PRIVATE REMARKS', value: '' }
];

export const DatesFeaturesList = [
    { label: 'LIST CONTRACT DATE', value: '' },
    { label: 'START SHOWING DATE', value: '' },
    { label: 'ON MARKET DATE', value: '' },
    { label: 'STATUS CHG TIMESTAMP', value: '' },
    { label: 'MOD TIMESTAMP', value: '' },
    { label: 'EXPIRED DATE', value: '' },
    { label: 'PURCH CONTRACT DATE', value: '' },
    { label: 'ENDING DATE', value: '' }
];

export const ShowingInformation = [
    { label: 'SHOW CONTACT TYPE', value: '' },
    { label: 'LOCK BOX LOCATION', value: '' },
    { label: 'OCCUPANT TYPE', value: '' },
    { label: 'SHOW CONTACT NAME', value: '' },
    { label: 'LOCK BOX TYPE', value: '' },
    { label: 'OWNER\'s NAME', value: '' },
    { label: 'SHOW CONTACT PH', value: '' },
    { label: 'SHOW INSTRUCTIONS', value: '' },
    { label: 'DIRECTIONS', value: '' }
];

export const AgentInformation = [
    { label: 'LA', value: '' },
    { label: 'LA STATE LICENSE', value: '' },
    { label: 'CO LA', value: '' },
    { label: 'CO LA STATE LICENSE', value: '' },
    { label: 'LO', value: '' },
    { label: 'LO STATE LICENSE', value: '' },
    
    { label: 'LO PHONE', value: '' },
    { label: 'LO FAX', value: '' },
    { label: 'CO LO', value: '' },
    { label: 'CO LO STATE LICENSE', value: '' },
    { label: 'CO LO PHONE', value: '' },
    { label: 'CO LO FAX', value: '' },
    { label: 'OFFERS EMAIL', value: '' }
];

export const ContactPriorityInformation = [
    { label: 'LA CELL', value: '' },
    { label: 'LA EMAIL', value: '' },
];

export const OwnerInformation = [
    { label: 'Owner Name', value: '' },
    { label: 'Tax Billing Zip', value: '' },
    { label: 'Mail Owner Name', value: '' },
    { label: 'Tax Billing Zip+4', value: '' },
    { label: 'Mailing Address', value: '' },
    { label: 'Owner Occupied', value: '' },
    { label: 'Tax Billing City & State', value: '' }
];

export const LocationInformation = [
    { label: 'Zip Code', value: '' },
    { label: 'Comm College District Code', value: '' },
    { label: 'Carrier Route', value: '' },
    { label: 'Census Tract', value: '' },
    { label: 'Zoning', value: '' },
    { label: 'Township Range Sect', value: '' },
    { label: 'School District', value: '' }
];

export const EstimateValue = [
    { label: 'RealAVM™', value: '' },
    { label: 'Value As Of', value: '' },
    { label: 'Estimated Value Range High', value: '' },
    { label: 'Confidence Score', value: '' },
    { label: 'Estimated Value Range Low', value: '' },
    { label: 'Forecast Standard Deviation', value: '' },
];

export const TaxInformation = [
    { label: 'APN', value: '' },
    { label: 'Tax Area', value: '' },
    { label: 'Exemptions', value: '' },
    { label: 'Lot', value: '' },
    { label: '% Improved', value: '' },
    { label: 'Fire Dept. Tax Dist', value: '' },
    { label: 'Legal Description', value: '' },
];

export const AssessmentTaxes = [
    { label: 'Assessment Year', value1: '', value2: '', value3: '' },
    { label: 'Assessed Value - Total', value1: '', value2: '', value3: '' },
    { label: 'Assessed Value - Land', value1: '', value2: '', value3: '' },
    { label: 'Assessed Value - Improved', value1: '', value2: '', value3: '' },
    { label: 'YOY Assessed Change ($)', value1: '', value2: '', value3: '' },
    { label: 'YOY Assessed Change (%)', value1: '', value2: '', value3: '' },
    { label: 'Tax Year', value1: '', value2: '', value3: '' },
    { label: 'Total Tax', value1: '', value2: '', value3: '' },
    { label: 'Change ($)', value1: '', value2: '', value3: '' },
    { label: 'Change (%)', value1: '', value2: '', value3: '' },
    { label: 'Jurisdiction', value1: '', value2: '', value3: '' },
    { label: 'Fr Countywide Tax', value1: '', value2: '', value3: '' }
];

export const Characteristics = [
    { label: 'County Land Use', value: ''},
    { label: 'Universal Land Use', value: ''},
    { label: 'Lot Frontage', value: ''},
    { label: 'Lot Depth', value: ''},
    { label: 'Lot Acres', value: ''},
    { label: 'Lot Area', value: ''},
    { label: 'Style', value: ''},
    { label: 'Building Sq Ft', value: ''},
    { label: 'Gross Area', value: ''},
    { label: 'Basement Sq Ft', value: ''},
    { label: 'Stories', value: ''},
    { label: 'Bedrooms', value: ''},
    { label: 'Quality', value: ''},
    { label: 'Construction Type', value: ''},
    { label: 'Effective Year Built', value: ''},
    { label: 'Bldg Class', value: ''},
    { label: '# of Buildings', value: ''},
    ];

export const MarketSale = [
    { label: 'Recording Date', value: ''},
    { label: 'Sale Date', value: ''},
    { label: 'Sale Price', value: ''},
    { label: 'Nominal Indicator', value: ''},
    { label: 'Owner Name', value: ''},
    { label: 'Seller', value: ''},
    
];

export const ExportAllDataOptions = [
    { label: 'Contacts', value: 'crm/export-contact' },
    { label: 'Tasks', value: 'crm/export-task' },
    { label: 'Tickets', value: 'crm/export-ticket' },
    { label: 'Tags', value: 'crm/export-tag' },
    { label: 'Groups', value: 'crm/export-group' },
    { label: 'Templates', value: 'crm/export-template' },
    { label: 'Campaigns', value: 'crm/export-campaign' },
    { label: 'Playbook', value: 'playbook/export-playbook-form' }
];

export const AvailableModelsForProperty = {
    "Residential Sale" : {
                            model_name: "Residential Sale",
                            link: 'listing',
                            tab_listing: [
                                {id:1,  label: 'Autofill Listing Information'},
                                {id:2,  label: 'Office/ Listing Information'},
                                {id:3,  label: 'Subject Property Basics'},
                                {id:4,  label: 'Property Description'},
                                {id:5,  label: 'Property Features'},
                                {id:6,  label: 'Green Features'},
                                {id:7,  label: 'Land and Terms'},
                                {id:8,  label: 'Showing Instructions'},
                                {id:9,  label: 'Open House'},
                                {id:11, label: 'Seller Net'},
                                {id:10, label: 'Photos'},
                            ]
                         },
    "Residential Income" : {
                            model_name: "Residential Income",
                            link: 'income',
                            tab_listing: [
                                {id:1,  label: 'Autofill Listing Information'},
                                {id:2,  label: 'Office/ Listing Information'},
                                {id:3,  label: 'Subject Property Basics'},
                                {id:4,  label: 'Property Description'},
                                {id:5,  label: 'Property Features'},
                                {id:6,  label: 'Green Features'},
                                {id:7,  label: 'Land and Terms'},
                                {id:12, label: 'Analysis'},
                                {id:14, label: 'Unit Information'},
                                {id:8,  label: 'Showing Instructions'},
                                {id:9,  label: 'Open House'},
                                {id:10, label: 'Photos'}
                            ]
                         },
    "Residential Lease" : {
                            model_name: "Residential Lease",
                            link: 'lease',
                            tab_listing: [
                                {id:1,  label: 'Autofill Listing Information'},
                                {id:2,  label: 'Office/ Listing Information'},
                                {id:3,  label: 'Subject Property Basics'},
                                {id:4,  label: 'Property Description'},
                                {id:5,  label: 'Property Features'},
                                {id:6,  label: 'Green Features'},
                                {id:7,  label: 'Land and Terms'},
                                {id:8,  label: 'Showing Instructions'},
                                {id:9,  label: 'Open House'},
                                {id:10, label: 'Photos'},
                            ]
                         },
    "Land Lot"          : {
                            model_name: "Land",
                            link: 'land-lot',
                            tab_listing: [
                                {id:1,  label: 'Autofill Listing Information'},
                                {id:2,  label: 'Office/ Listing Information'},
                                {id:3,  label: 'Subject Property Basics'},
                                {id:4,  label: 'Property Description'},
                                {id:5,  label: 'Property Features/Land'},
                                {id:7,  label: 'Land and Terms'},
                                {id:8,  label: 'Showing Instructions'},
                                {id:15, label: 'Analysis'},
                                {id:9,  label: 'Open House'},
                                {id:6,  label: 'Green Features'},
                                {id:10, label: 'Photos'},
                            ]
                         },
    "Mobile Homes"      : {
                            model_name: "Manufactured In Park",
                            link: 'mobile-homes',
                            tab_listing: [
                                {id:1,  label: 'Autofill Listing Information'},
                                {id:2,  label: 'Office/ Listing Information'},
                                {id:3,  label: 'Subject Property Basics'},
                                {id:4,  label: 'Property Description'},
                                {id:5,  label: 'Property Features'},
                                {id:7,  label: 'Land and Terms'},
                                {id:8,  label: 'Showing Instructions'},
                                {id:9,  label: 'Open House'},
                                {id:10, label: 'Photos'},
                                {id:16, label: 'Analysis'},
                            ]
                         },
    "Commercial Sale"   : {
                            model_name: "Commercial Sale",
                            link: 'commercial-sale',
                            tab_listing: [
                                {id:1, label: 'Autofill Listing Information'},
                                {id:2, label: 'Office/ Listing Information'}, 
                                {id:3, label: 'Subject Property Basics'},
                                {id:4, label: 'Property Description'},
                                {id:5, label: 'Property Features'},
                                {id:7, label: 'Land and Terms'},
                                {id:8, label: 'Showing Instructions'},
                                {id:6, label: 'Green Features'},
                                {id:13, label: 'Financial Information'},
                                {id:14, label: 'Unit Information'},
                                {id:9,  label: 'Open House'},
                                {id:10, label: 'Photos'},
                            ]
                         },
    "Commercial Lease"  : {
                            model_name: "Commercial Lease",
                            link: 'commercial-lease',
                            tab_listing: [
                                {id:1, label: 'Autofill Listing Information'},
                                {id:2, label: 'Office/ Listing Information'}, 
                                {id:3, label: 'Subject Property Basics'},
                                {id:4, label: 'Property Description'},
                                {id:5, label: 'Property Features'},
                                {id:7, label: 'Land and Terms'},
                                {id:8,  label: 'Showing Instructions'},
                                {id:6, label: 'Green Features'},
                                {id:9, label: 'Open House'},
                                {id:10, label: 'Photos'}
                            ]
                         },
    "Business"          : {
                            model_name: "Business Opportunity",
                            link: 'business',
                            tab_listing: [
                                {id:1, label: 'Autofill Listing Information'},
                                {id:2, label: 'Office/ Listing Information'}, 
                                {id:3, label: 'Subject Property Basics'},
                                {id:4, label: 'Property Description'},
                                {id:5, label: 'Property Features'},
                                {id:8,  label: 'Showing Instructions'},
                                {id:14, label: 'Unit Information'},
                                {id:9, label: 'Open House'},
                                {id:10, label: 'Photos'}
                            ]
                         },
};
export const AvailableModelsForAccounts = {
    "Account_Details" : {
                            model_name: "Account_Details",
                            link: 'listing',
                            tab_listing: [
                                {id:1,  label: 'Contact Information', routerlink:'info'},
                                {id:2,  label: 'Change Photo', routerlink:'change-pic'},
                                {id:3,  label: 'Public Information', routerlink:'public-info'},
                                {id:4,  label: 'Realtor Membership', routerlink:'realtor-memberships'},
                                {id:5,  label: 'Service Areas', routerlink:'service-areas'},
                                {id:6,  label: 'Company Information', routerlink:'company-info'},
                                {id:7,  label: 'Change Password', routerlink:'change-password'},
                                {id:8, label: 'General Settings', routerlink:'general-settings'},
                                {id:9, label: 'Social Media Links', routerlink:'social-links'},
                            ]
                         }
}

export const HrandHrRecruiterAccounts = {
    "Account_Details" : {
                            model_name: "Account_Details",
                            link: 'listing',
                            tab_listing: [
                                {id:1,  label: 'Contact Information', routerlink:'info'},
                                {id:2,  label: 'Change Photo', routerlink:'change-pic'},
                                {id:3,  label: 'Public Information', routerlink:'public-info'},
                                {id:6,  label: 'Company Information', routerlink:'company-info'},
                                {id:7,  label: 'Change Password', routerlink:'change-password'},
                                {id:8, label: 'General Settings', routerlink:'general-settings'},
                                {id:9, label: 'Social Media Links', routerlink:'social-links'},
                            ]
                         }
}
