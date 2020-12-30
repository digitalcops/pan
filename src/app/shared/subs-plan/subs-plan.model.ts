
export const durationTypeOption = [
    { value: 'days', label: 'Days' },
    { value: 'weeks', label: 'Weeks' },
    { value: 'months', label: 'Months' },
    { value: 'years', label: 'Years' },
];

export const termsTypeOption = [
    { label: 'Immediate payment', value: '0' },
    { label: 'Five Days', value: '5' },
    { label: 'Ten Days', value: '10' },
    { label: 'Fifteen Days', value: '15' },
    { label: 'Thirty Days', value: '30' },
    { label: 'Two Months', value: '60' },
];


export const termsTypeMapping = {
    '0' : 'Immediate payment', 
    '5' : 'Five Days', 
    '10' : 'Ten Days', 
    '15' : 'Fifteen Days', 
    '30' : 'Thirty Days', 
    '60' : 'Two Months', 
}