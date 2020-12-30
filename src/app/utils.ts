import { isEmpty } from 'rxjs/operators';
import * as moment from 'moment';

export class Utils {

    /**
     * To Sort data
     * @param data List
     * @param key Key to sort
     * @param order Asc/Des
     */
    sortData(data, key, order) {
        data.sort((a, b) => {
            if (order === 'asc') {
                return a[key] - b[key];
            } else {
                return b[key] - a[key];
            }

        });
        return data;
    }

    /**
     * To format date
     * @param fieldDate Date to be format
     */
    formatDate(fieldDate) {
        const dat = new Date(Date.parse(fieldDate));
        const myMonth = ('0' + (dat.getMonth() + 1)).slice(-2);
        const myDat = ('0' + dat.getDate()).slice(-2);
        return `${myMonth}/${myDat}/${dat.getFullYear()}`;
    }

    getCategoriesList(list: Array<any>): Array<any> {
        let list_category_type = [];
        list_category_type = [
            { label: "Contacts", value: "Contacts" },
            { label: "Service Provider", value: "ServiceProvider" },
            { label: "Transactions", value: "Transactions" },
        ];
        return list_category_type;
    }

    getCategoriesListMeta(list: Array<any>): Array<any> {
        let list_category_meta = [];
        list.forEach((obj) => {
            list_category_meta[obj.value] = obj.label;
        });
        return list_category_meta;
    }

    /**
     * To Augment Dropdown data
     * @param data Dropdown data
     * @param active To filter only active users
     */
    augmentDropdownData(data, active?) {
        let updatedData = [];
        if (data.length > 0) {
            updatedData = data.map((item) => ({
                label: `${item.prefix ? item.prefix : ''} ${item.first_name} ${item.middle_name ? item.middle_name : ''} ${item.last_name}`,
                value: item.id,
                isActive: item.is_active ? item.is_active : ''
            }));
            if (active) {
                updatedData = updatedData.filter((obj) => obj.isActive);
            }
        } else {
            updatedData = [];
        }
        return updatedData;
    }

    /**
     * To Augment Dropdown data
     * @param data Dropdown data
     */
    augmentDropdown(data) {
        let updatedData = [];
        if (data.length > 0) {
            updatedData = data.map((item) => ({
                label: item.name,
                value: item.name
            }));
        } else {
            updatedData = [];
        }
        return updatedData;
    }

    /**
     * To format filters
     * @param filter Filters
     * @param page Page
     * @param rows Rows
     */
    formatFilters(filter, page, rows) {
        let filters = JSON.parse(JSON.stringify(filter));
        const filterKeys = ['search_keyword', 'groups', 'is_active', 'status_value', 'status', 'provider', 'service_type', 'type', 'priority', 'group_id'];
        for (const key of filterKeys) {
            if (key === 'search_keyword') {
                filters[key] = filters[key] ? filters[key].trim() : '';
            }
            if (filters[key] === '' || filters[key] === 0 || filters[key] === 'all') {
                if (key === 'status') {
                    filters[key] = null;
                } else {
                    delete filters[key];
                }
            }
        }
        filters = this.updateDateRange(filters, ['created_at__range', 'due_date__range']);
        filters['page'] = page;
        filters['limit'] = rows;
        return filters;
    }

    /**
     * To update Date Ranges
     * @param filters Filters
     * @param keys Keys to filter
     */
    updateDateRange(filters, keys) {
        for (const key of keys) {
            if (filters[key]) {
                if (filters[key].start === '' || filters[key].end === '' ||
                    filters[key].start === null || filters[key].end === null) {
                    delete filters[key];
                }
            }
        }
        return filters;
    }

    /**
     * To update checkbox on select/unselect all
     * @param event Checkbox
     * @param data Data
     */
    updateCheckbox(event, data) {
        if (event) {
            data.forEach((tag) => tag.selected = true);
        } else {
            data.forEach((tag) => tag.selected = false);
        }
        return data;
    }

    /**
     * To update select all
     * @param event Checkbox
     * @param data Data
     */
    updateSelectAll(event, data) {
        let status = false;
        if (event) {
            const allCheck = data.every((tag) => tag.selected);
            if (allCheck) {
                status = true;
            }
        }
        return status;
    }

    /**
     * To validate email
     * @param email Email to validate
     */
    validateEmail(email) {
        // tslint:disable-next-line: max-line-length
        const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
        if (emailRegex.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * To augment data required by multiselect
     * @param list Data list 
     */
    augmentMultiselect(list) {
        let augmentedData = [];
        augmentedData = list.map((item) => ({
            id: item.id,
            itemName: this.formatContactName(item),
        }));
        return augmentedData;
    }

    augmentTicketsData(res) {
        const contacts = "Contacts";
        const serviceprovider = "ServiceProvider";
        const transactions = "Transactions";
        const augmentedData = {};
        augmentedData[contacts] = res[0].body.data.map((item) => ({
            id: item.id,
            itemName: this.formatContactName(item),
        }));
        augmentedData[serviceprovider] = res[3].body.data.map((item) => ({
            id: item.id,
            itemName: item.full_name,
        }));
        augmentedData[transactions] = res[4].data.map((item) => ({
            id: item.id,
            itemName: item.transaction_id,
        }));
        return augmentedData;
    }

    /**
     * To filter ticket name
     * @param name Name
     */
    filterTicketName(name) {
        let rawName = name.split('ticket_attachments/')[1];

        if (!rawName) {
            rawName = name.substring(name.lastIndexOf("/") + 1);
        }

        let splittedName = rawName.substring(rawName.indexOf("-") + 1);
        splittedName = splittedName.substring(0, splittedName.lastIndexOf("."));
        return splittedName;
    }

    /**
     * To remove un-necessary keys while filtering
     * @param data Filters
     */
    removeUnnecessaryKeys(data) {
        const filterKeys = Object.keys(data);
        for (const key of filterKeys) {
            if (!data[key] && data[key] !== false) {
                delete data[key];
            }
        }
        return data;
    }

    /**
     * To restrict enter in Textarea
     * @param event Enter event
     */
    restrictEnter(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            return false;
        }
    }

    /**
     * To create timestamp
     * @param date Date to convert
     */
    createTimestamp(date) {
        const sortedDate = new Date(date);
        const timeStamp = sortedDate.setDate(sortedDate.getDate() + 1) / 1000;
        return timeStamp;
    }

    createDateFromTimeStamp(timestamp) {
        return (new Date((new Date(timestamp * 1000)).getTime() - 1));
    }

    createDateFromTimeProperty(date) {
        return new Date(date);
    }

    modifyDateFromServerTime(timestamp) {
        return (new Date((new Date(timestamp)).getTime() - (new Date(timestamp)).getTimezoneOffset()));
    }

    /**
     * To get Name Initials
     * @param name Name
     */
    getInitials(name) {
        const splittedName = name.split(' ');
        const firstInitial = splittedName[0].charAt(0);
        const lastInitial = splittedName[1] ? splittedName[1].charAt(0) : '';
        return firstInitial + lastInitial;
    }

    /**
   * To format contact name
   * @param contact Selected contact
   */
    formatContactName(contact: any) {
        return ((contact.middle_name ?
            `${contact.prefix ? contact.prefix : ''} ${contact.first_name} ${contact.middle_name} ${contact.last_name}`
            : `${contact.prefix ? contact.prefix : ''} ${contact.first_name} ${contact.last_name}`) + " " + `(${contact.email})`);
    }

    formatContactNameOnly(contact: any) {
        return ((contact.middle_name ?
            `${contact.prefix ? contact.prefix : ''} ${contact.first_name} ${contact.middle_name} ${contact.last_name}`
            : `${contact.prefix ? contact.prefix : ''} ${contact.first_name} ${contact.last_name}`));
    }

    filterTicketAttachmentName(name) {
        let rawName = name.split('ticket_attachments/')[1];
        if (!rawName) {
            rawName = name.split('contact_attachments/')[1];
        }
        if (!rawName) {
            rawName = name.substring(name.lastIndexOf("/") + 1);
        }
        let splittedName = rawName.substring(rawName.indexOf("-") + 1);
        splittedName = splittedName.substring(0, splittedName.lastIndexOf("."));
        return splittedName;
    }

    isStartDateGreater(startDate, endDate): boolean {
        let ret = false
        if (startDate && endDate) {
            const d1 = new Date(startDate);
            const d2 = new Date(endDate);
            ret = (d1.getTime() > d2.getTime())
        }
        return ret;
    }

    fetchOnlyDate(timestamp: string) {
        return timestamp ? timestamp.substr(0, timestamp.indexOf("T")) : '';
    }

    fetchOnlyDateTime(timestamp: string) {
        let tempDate = '';
        if(timestamp){
            tempDate = timestamp.substr(timestamp.indexOf("T")).replace("T", "").replace("Z", "");
            tempDate = tempDate.substr(0, tempDate.lastIndexOf(":")).replace(":", "");
            tempDate = moment(tempDate, "hmm").format("HH:mm a");
        }
        return ({
            date: timestamp ? timestamp.substr(0, timestamp.indexOf("T")) : "",
            time: tempDate
        });
    }
}
