import componentNameCheck from "./componentNameCheck";

export const verifyName = (value) => {
    const regExpSymbols = /[-!$@#%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g;
    const regExpNumbers = /^[0-9]/;

    if(componentNameCheck(value)) {

        return 'That component already exists.';

    } else if(/\s/g.test(value)) {

        return 'You cannot use whitespace character'

    } else if(regExpNumbers.test(value)) {

        return 'The Class name can not start with number'

    } else if(regExpSymbols.test(value)) {

        return 'You cannot use symbols: ' + '( - ! @ $ # % ^ & * ( ) _ + | ~ = ` { } [ ] : " ; \' < > ? , . / )'.red;

    } else {
        return true;
    }
};
