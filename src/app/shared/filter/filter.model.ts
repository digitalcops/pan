export class DateRange {
    start: any;
    end: any;
    constructor(date?) {
        this.start = date.start ? date.start : '';
        this.end = date.end ? date.end : '';
    }
}

export const productTypeOptionFilter = [
    { value: null, label: 'All' },
    { value: 'service', label: 'Service' },
    { value: 'plan', label: 'Plan' },
];

export class SortModel {
    'is_active': boolean;
    'financialInfo': boolean;
    'groups': string;
    'status_rating': string;
    offerType: string;
    page: string;
    type: string;
    priority: string;
    leadType: string;
    'created_at__range': DateRange;
    'due_date__range': DateRange;
    'search_keyword': '';
    'status_value': string;
    'commission_type': string;
    status: string;
    product_type: string;
    is_global: boolean;
    department: string;
    supervisor: string;
    designation: string;
    plabook_state: string;
    property_table: string;
    property_status: string;
    service_type: string;
    sales_person: string;
    'created_by': number;
    'published_by' : number;
    'due_date_source': Array<any>;
    types: string;
    group: number;
    start: number;
    end: number;
    assigned_to: number;
    transaction_status:string;
    subscription_plan: string;
    constructor(filter?) {
        this.is_global = filter.is_global ? filter.is_global : "";
        this.is_active = filter.is_active ? filter.is_active : "";
        this.product_type = filter.product_type ? filter.product_type : "";
        this.sales_person = filter.sales_person ? filter.sales_person : "";
        this.subscription_plan = filter.subscription_plan ? filter.subscription_plan : "";
        this.financialInfo = filter.financialInfo ? filter.financialInfo : "";
        this.groups = filter.groups ? filter.groups : 0;
        this.page = filter.page ? filter.page : 1;
        this.created_at__range = new DateRange({});
        this.due_date__range = new DateRange({});
        this.search_keyword = filter.search_keyword ? filter.search_keyword : '';
        this.type = filter.type ? filter.type : '';
        this.priority = filter.priority ? filter.priority : '';
        this.status = filter.status ? filter.status : null;
        this.status_value = filter.status_value ? filter.status_value : '';
        this.status = filter.status ? filter.status : '';
        this.created_by = filter.created_by ? filter.created_by : '';
        this.published_by = filter.published_by ? filter.published_by : '';
        this.types = filter.types ? filter.types : '';
        this.group = filter.group ? filter.group : '';
        this.plabook_state = filter.plabook_state ? filter.plabook_state : '';
        this.assigned_to = filter.assigned_to ? filter.assigned_to : '';
        this.property_table = filter.property_table ? filter.property_table : '';
        this.property_status = filter.property_status ? filter.property_status : '';
        this.service_type = filter.service_type ? filter.service_type : '';
        this.start = filter.start ? filter.start : null;
        this.end = filter.end ? filter.end : null;
        this.leadType = filter.leadType ? filter.leadType : contactAgent;
        this.department = filter.department ? filter.department : "";
        this.supervisor = filter.supervisor ? filter.supervisor : "";
        this.designation = filter.designation ? filter.designation : "";
        this.commission_type = filter.commission_type ? filter.commission_type : "";
        this.status_rating = filter.status_rating ? filter.status_rating : "";
        this.offerType = filter.offerType ? filter.offerType : "";
        this.transaction_status = filter.transaction_status ? filter.transaction_status : "";
    }
}

export const CalendarLocale = {
    firstDayOfWeek: 0,
    dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

export const CalendarLocalePlaybook = {
    dateFormat: 'mm/dd/yy',
    firstDayOfWeek: 0,
    dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

export const StatusOption = [
    { label: 'All', value: null },
    { label: 'Active', value: true },
    { label: 'Inactive', value: false },
];

export const TicketTypeOption = [
    { label: 'Request', value: 'Request' },
    { label: 'Issue', value: 'Issue' },
    { label: 'Query', value: 'Query' },
];

export const userPlanOptions = [
    { label: 'All', value: null },
    { label: 'Open', value: 'open' },
    { label: 'Close', value: 'close' },
    { label: 'Refunded', value: 'refunded' },
];


export const DocRangeTypeList = [
    { label: 'Today', value: 'Today' },
    { label: 'Yesterday', value: 'Yesterday' },
    { label: 'One Week', value: 'One Week' },
    { label: 'This month', value: 'This month' },
    { label: 'This Year', value: 'This Year' },
];

export const AccessTypeList = [
    { label: 'Personal', value: 'PERSONAL' },
    { label: 'Public', value: 'PUBLIC' },
];

export const DocListTypeList = [
    { label: 'My Drive', value: 'PERSONAL' },
    { label: 'Public', value: 'PUBLIC' },
    { label: 'Shared with me', value: 'SHARED_IN_GROUPS' },
    { label: 'Recent', value: 'RECENT' },
    { label: 'Starred', value: 'STARRED' },
    { label: 'Trash', value: 'TRASH' },
];

export const DocViewTypeList = [
    { label: 'User Workspace', value: 'User Workspace' },
    { label: 'Default Workspace', value: 'Default Workspace' },
];

export const CalenderTypeList = [
    { label: 'System Calender', value: 'System Calender' },
    { label: 'Google Calender', value: 'Google Calender' },
];

export const documentOptions = [
    { label: 'All', value: 'all' },
    { label: 'Shared With Me', value: 'Open' },
    { label: 'Recent', value: 'Recent' },
    { label: 'Starred', value: 'Starred' },
]
export const ProviderType = [
    { label: 'Company', value: 'Company' },
    { label: 'Individual', value: 'Individual' }
];
export const departmentType = [
    { label: 'All', value: null },
    { label: 'HR Department', value: 'HR Department' },
    { label: 'Company', value: 'Company' },
    { label: 'Sales', value: 'Sales' },
    { label: 'Marketing', value: 'Marketing' }
];

export const supervisorList = [
    { label: 'Jeff', value: 'Jeff' },
    { label: 'Jonny', value: 'Jonny' },
    { label: 'Mark', value: 'Mark' }
];
export const designationList = [
    { label: 'All', value: null },
    { label: 'Admin', value: 'Admin' },
    { label: 'Marketing', value: 'Marketing' },
];
export const ModifyOption = [
    { label: 'New', value: 'New' },
    { label: 'Viewed', value: 'Viewed' },
    { label: 'Called', value: 'Called' },
    { label: 'Emailed', value: 'Emailed' },
    { label: 'Left Message', value: 'Left Message' },
    { label: 'Follow Up', value: 'Follow Up' },
    { label: 'Hot', value: 'Hot' },
    { label: 'Cold', value: 'Cold' },
    { label: 'Referred Out', value: 'Referred Out' },
    { label: 'Working With', value: 'Working With' },
    { label: 'Sold', value: 'Sold' },
    { label: 'Has Agent', value: 'Has Agent' },
    { label: 'Out of Service', value: 'Out of Service' },
    { label: 'No Answer', value: 'No Answer' },
];

export const GroupStatusOption = [
    { label: 'Active', value: true },
    { label: 'Deactive', value: false }
];

export const StatusOptions = [
    { label: 'New', value: 'new' },
    { label: 'Assigned', value: 'assigned' },
    { label: 'Working', value: 'working' },
    { label: 'On hold', value: 'on_hold' },
    { label: 'Done', value: 'done' },
];

export const RatingOption = [
    { label: 'All', value: null },
    { label: 'Hot', value: 'Hot' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Cold', value: 'Cold' },
    { label: 'Dead', value: 'Dead' },
];
export const RatingOptionTable = [
    { label: 'Hot', value: 'Hot' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Cold', value: 'Cold' },
    { label: 'Dead', value: 'Dead' },
];

export const AssignOption = [
    { label: 'Group', value: 'group' },
    { label: 'Buyers', value: 'buyer' },
    { label: 'Sellers', value: 'seller' },
    { label: 'Investors', value: 'investor' },
    { label: 'Real Estate Agents', value: 'agent' }
];

export const PlaybookOptions = [
    { label: 'All', value: null },
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Published', value: 'PUBLISHED' },
];

export const PlaybookBulkOptions = [
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Published', value: 'PUBLISHED' },
];

export const TypeOption = [
    { label: 'All', value: 'all' },
    { label: 'Email', value: 'Email' },
    { label: 'To-Do', value: 'To-Do' },
    { label: 'Follow Up', value: 'Follow up' },
    { label: 'SMS', value: 'SMS' },
    { label: 'Call', value: 'Call' },
];

export const userStatusOptions = [
    { label: 'All', value: null },
    { label: 'Active', value: true },
    { label: 'Deactive', value: false },
];

export const ListGlobaltag = [
    { label: 'All', value: null },
    { label: 'Yes', value: true },
    { label: 'No', value: false },
];

export const userUpdateStatus = [
    { label: 'Active', value: true },
    { label: 'Deactive', value: false },
];

export const appOptions = [
    { label: 'All', value: null },
    { label: 'Initial Qualification', value: 'Initial Qualification' },
    { label: 'First Interview', value: 'First Interview' },
    { label: 'Second Interview', value: 'Second Interview' },
    { label: 'Contract Proposal', value: 'Contract Proposal' },
    { label: 'Contract Signed', value: 'Contract Signed' },

];
export const reminderOptions = [
    { label: 'Active', value: true },
    { label: 'Deactive', value: false },
];
export const  billingTypeStatus = [
    { label: 'Payment To', value: 'Payment To ' },
    { label: 'Payment From', value: 'Payment From' },
  ];
  export const  billingStatus = [
    { label: 'Completed', value: 'Completed ' },
    { label: 'Paid', value: 'Paid' },
  ];
export const activeDeactive = [
    { label: 'All', value: null },
    { label: 'Active', value: 'active' },
    { label: 'Deactive', value: 'deactivate' },
];

export const dashboardOptions = [
    { label: 'Summary', value: 'summary' },
    { label: 'Contact', value: 'contact' },
];
export const transaferOptions = [
    { label: 'All', value: null },
    { label: 'New', value: 'New' },
    { label: 'Transferred', value: 'Transferred' },
    { label: 'Done', value: 'Done' },
];
export const createdbyOptions = [
    { label: 'Mark', value: null },
    { label: 'Jeff', value: true },
    { label: 'Sam', value: false },
];
export const EmployeeStatusOptions = [
    { label: 'All', value: null },
    { label: 'Active', value: "Active" },
    { label: 'Deactive', value: "Deactive" },
    { label: 'Suspended', value: "Suspended" },
];
export const commissionStatusOptions = [
    { label: 'Broker', value: null },
    { label: 'Agent', value: "Active" },
];
export const announcemetOptions = [
    { label: 'All', value: null },
    { label: 'Draft', value: 'Draft' },
    { label: 'Waiting For Approval', value: 'Waiting For Approval' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Refused', value: 'Refused' },
];

export const propertyOptions = [
    { label: 'Agent Line 1', value: null },
    { label: 'Agent Line 2', value: null },
    { label: 'Agent Line 3', value: null },
]
export const playbookStatusOptions = [
    { label: 'Active', value: true },
    { label: 'Deactive', value: false },
];

export const PriorityOption = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
    { label: 'None', value: 'None' },
];

export const TemplateTypes = [
    { label: 'All', value: null },
    { label: 'SMS', value: 'SMS' },
    { label: 'Email', value: 'Email' }
];


export const List_service_type = [
    { label: 'Entry Only', value: 'Entry Only' },
    { label: 'Limited Service', value: 'Limited Service' },
    { label: 'Full Service', value: 'Full Service' }
];

export const TemplateTypesOptions = [
    { label: 'SMS', value: 'SMS' },
    { label: 'Email', value: 'Email' }
];

export const list_commission_type = [
    { label: 'All', value: null },
    { label: 'Generic', value: 'Generic' },
    { label: 'Custom', value: 'Custom' }
];

export const BlogType = [
    { label: 'All', value: null },
    { label: 'Draft', value: 'draft' },
    { label: 'Pending For Approval', value: 'pending for approval' },
    { label: 'Publish', value: 'publish' },
    { label: 'Moderate', value: 'moderate' },
];


export const UserName = [
    { label: 'Mark', value: 'Mark' },
    { label: 'Mark', value: 'Mark' },
    { label: 'Mark', value: 'Mark' }
];

export const TransactionOption = [
    { label: 'Sales', value: 'Sales' },
    { label: 'Referrals', value: 'Referrals' },
    { label: 'Lease', value: 'Lease' }
];

export const TagsFilter = [
    { label: 'Active', value: 'active' },
    { label: 'Deactivated', value: 'deactivated' },
];

export const TagsDeactive = [
    { label: 'Active', value: 'active' },
    { label: 'Deactive', value: 'deactivate' },
];


export const SavedStatusOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false }
];

export const AvailableType = {
    contact: "Contacts",
    user: "User",
    service: "ServiceProvider",
    employees: "User",
    transactions: "Transactions",
};

export const AvailableFilterType = {
    contact: "Contact",
    user: "User",
    service: "Service Provider",
    employees: "Employee",
    tag: 'Tag',
    group: 'Group',
    playbook: 'PlayBook',
    tasks: 'Task',
    websiteblog: 'Websiteblog',
    ticket: 'Ticket',
    templates: 'Template',
    programRoles: 'Program',
    Lead_provider: 'Lead Provider',
    websitetags : 'Websitetag',
    websitecategory : 'Website Categorie'
};

export const BlogTypewebsite = [
    { label: 'Draft', value: 'draft' },
    { label: 'Pending For Approval', value: 'pending for approval' },
    { label: 'Publish', value: 'publish' },
    { label: 'Moderate', value: 'moderate' },
];


export const cmsStatus = [
    { label: "Save", value: 'Save' },
    { label: "Draft", value: 'Draft' }
];
const contactAgent = 'Contact an Agent';
export const agentViewOption = [
    { label: "Contacted", value: contactAgent },
    { label: "Requested", value: 'Requested a Showing' },
    { label: "Offered", value: 'Writing an Offer' }
];

export const financialInfoList = [
    { label: "All", value: null },
    { label: "Requested", value: true },
    { label: "Not Requested", value: false }
];
export const  assigneeToList= [
    { label: "All", value: 'All' },
    { label: "Mark", value: 'Mark' }
];
export const  typeViewOption= [
    { label: "All", value: null },
  { label: 'Finanicng', value: 'Finanicng' },
  { label: 'Rent', value: 'Rent' },
  { label: 'Loan', value: 'Loan' },
  { label: 'EMI', value: 'EMI' },
];
export const PopupOpeningOptions = {
    assignModifyPopup: false,
    activeModifyPopup: false,
    serviceModifyPopup: false,
    activeEmployeePopup: false,
    FollownModifyPopup: false,
    superModifyPopup: false,
    remanDateodifyPopup: false,
    remanTimeModifyPopup: false,
    descriptionModifyPopup: false,
    contactModifyPopup: false,
    activeTagModifyPopup: false,
    descriptionTagModifyPopup: false,
    slugTagModifyPopup: false,
    activeTicketModifyPopup: false,
    TypeTagModifyPopup: false,
    TypeTicketModifyPopup: false,
    TypeTasksModifyPopup: false,
    PriorityTasksModifyPopup: false,
    activePriorityModifyPopup: false,
    activeTaskModifyPopup: false,
};

export const ImportTransactionFileOptions = {
    "Admin": "https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/transactions/5cc3e-transaction_for_admin.zip",
    "Agent": "https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/transactions/63158-transaction_for_agent.zip",
    "Broker": "https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/transactions/55630-transaction_for_broker.zip",
};

export const ImportOptionsFilter = {
    "contact": "https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/contacts/61af1-crm_module.zip",
    "group": "https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/contacts/e9ac6-Groups_import.csv",
    "group-detail": "",
    "playbook": "",
    "service": "https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/ServiceProvider/d1ee9-service_provider.zip",
    "tag": "https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/contacts/a80ba-Tags_import.csv",
    "announcement": "",
    "applicant": "https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/hrms/7ef62-applicant.csv",
    "attendance": "",
    "commision": "",
    "contract": "",
    "department": "https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/hrms/e7e69-department.csv",
    "employees": " https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/employees/bb654-employee_detais.zip",
    "offices": "https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/hrms/7a029-office.csv",
    "job_position": "https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/hrms/e7de6-job_position.csv",
    "reminder": "",
    "transfer": "",
    "templates": "https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/contacts/28c1e-Templates_import.csv",
    "Lead_provider": "",
    "property-details": "",
    "securityRoles": "",
    "ticket": "https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/contacts/b4826-Ticket_import.csv",
    "programRoles": "",
    "tasks": "https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/contacts/ef614-Task_import.csv",
    "transactions": "https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/transactions/3cdd8-Transaction.csv",
    "checklist": "",
    "user": "https://crmdevenv.s3.amazonaws.com/Public-Storage/import_files/employees/b94f6-personal_info.csv"
};

export const statusSubscripAllOptions = [
    { label: 'All', value: null },
    { label: 'Draft', value: 'draft' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Hold', value: 'hold' },
    { label: 'Closed', value: 'closed' },
];
export const statusInvoiceAllOptions = [
    { label: 'All', value: null },
    { label: 'Draft', value: 'draft' },
    { label: 'Posted', value: 'posted' },
    { label: 'Paid', value: 'paid' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Refund', value: 'refund' },
];
export const statusSaleAllOptions = [
    { label: 'All', value: null },
    { label: 'Draft', value: 'draft' },
    { label: 'Quotation', value: 'quotation' },
    { label: 'Quotation Sent', value: 'quotation_sent' },
    { label: 'Sales Order', value: 'sales_order' },
    { label: 'Sales Order Sent', value: 'sales_order_sent' },
    { label: 'Expired', value: 'expired' },
    { label: 'Cancelled', value: 'cancelled' },
];
