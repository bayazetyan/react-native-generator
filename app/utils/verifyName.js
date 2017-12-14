import componentNameCheck from "./componentNameCheck";

export const verifyName = (value, type) => {
    const regExpSymbols = /[-!$@#%^&*()_+|~=`{}\[\]:";'<>?,\/]/g;
    const regExpNumbers = /^[0-9]/;
    const regExpContainerName = /^(\w)+(container)$/i;

    const checkedValue = type === 'container' ? `${value}Container.js` : value;

    if(regExpContainerName.test(value)) {

        return 'Please set the container name without "Container"'.yellow;

    }  else if(componentNameCheck(checkedValue, type)) {

        return 'That name already exists.'.red;

    } else if(/\s/g.test(value)) {

        return 'You cannot use whitespace character'.yellow;

    } else if(regExpNumbers.test(value)) {

        return 'The Class name can not start with number'.yellow

    } else if(regExpSymbols.test(value)) {

        return 'You cannot use symbols: ' + '( - ! @ $ # % ^ & * ( ) _ + | ~ = ` { } [ ] : " ; \' < > ? , / )'.red;

    } else {

        return true;
    }
};
