export class ModalState {
    addUser = false;
    addTag = false;
    addContact = false;
    addService=false;
    addGroup = false;
    addTask = false;
    addTicket = false;
    addProgram = false;
    addEmp = false
}

export const TypeOptions = [
    { label: 'Email', value: 'Email' },
    { label: 'SMS', value: 'SMS' }
];

export const WeekOptions = [
    { label: '1 week', value: 1 },
    { label: '2 weeks', value: 2 },
    { label: '3 weeks', value: 3 },
    { label: '4 weeks', value: 4 }
];

export const PropertyTableList = [
    { label: 'Residential Sale', value: 'get-all-residential' },
    { label: 'Residential Lease', value: 'get-all-residential-lease' },
    { label: 'Residential Income', value: 'get-all-residential-income' },
    { label: 'Land Lot', value: 'Land Lot' },
    { label: 'Mobile Homes', value: 'Mobile Homes' },
    { label: 'Commercial Sale', value: 'Commercial Sale' },
    { label: 'Commercial Lease', value: 'Commercial Lease' },
    { label: 'Business', value: 'Business' }
];

export const GetPropertyTableDetails = { 
    'get-all-residential'           : "get-residentialsale-details", 
    'get-all-residential-lease'     : 'get-residentiallease-details',
    'get-all-residential-income'    : 'get-residential-income-details',
    'Land Lot'                      : 'get-land-details',
    'Mobile Homes'                  : 'get-mobile-home-details',
    'Commercial Sale'               : 'get-commercial-sale-details',
    'Commercial Lease'              : 'get-commerciallease-details',
    'Business'                      : 'get-business-details'
}