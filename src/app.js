// this is an example of improting data from JSON
import orders from '../data/orders.json';
import users from '../data/users.json';
import companies from '../data/companies.json';

export default (function () {
    // YOUR CODE GOES HERE
    // next line is for example only

    /*for (let k = 0; k < orders.length; k++) {
        console.log(orders[k].id);
    }*/

    function tableCreate() {

        let container = document.querySelector('#app');
        let tbl = document.createElement("table");
        let tblHeader = document.createElement("thead");
        let tblBody = document.createElement("tbody");


        let headerRow = document.createElement("tr");
        createHeaderCell('Transaction ID', headerRow);
        createHeaderCell('User Info', headerRow);
        createHeaderCell('Order Date', headerRow);
        createHeaderCell('Order Amount', headerRow);
        createHeaderCell('Card Number', headerRow);
        createHeaderCell('Card Type', headerRow);
        createHeaderCell('Location', headerRow);

        tblHeader.appendChild(headerRow);

        //todo foreach
        for (let j = 0; j < orders.length; j++) {
            let row = document.createElement("tr");
            let order = orders[j];
            row.id = `order_${order.id}`;


            createTextCell(order.transaction_id, row, true);

            let user = findUser(users, order.user_id);
            let company = findCompany(companies, user.company_id);
            createUserCell(user, company, row);


            createTextCell(order.created_at, row, true);
            createTextCell(new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'USD'
            }).format(order.total), row, true);
            createTextCell(replace(order.card_number), row, true);
            createTextCell(order.card_type, row, true);
            createTextCell(`${order.order_country} (${order.order_ip})`, row, true);

            tblBody.appendChild(row);

        }

        tbl.appendChild(tblHeader);
        tbl.appendChild(tblBody);
        container.appendChild(tbl);
    }

    tableCreate();
}());

function createHeaderCell(text, headerRow) {
    let cell = document.createElement('th');
    let cellText = document.createTextNode(text);
    cell.appendChild(cellText);
    headerRow.appendChild(cell);
}

function findUser(users, userId) {
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (userId === user.id) {
            return user;
        }
    }
}

function findCompany(companies, companyId) {
    for (let i = 0; i < companies.length; i++) {
        let company = companies[i];
        if (companyId === company.id) {
                return company;
            }
    }
}

function createUserCell(user, company, row) {
    let text = fillUserInfo(user.gender, user.first_name, user.last_name);
    let cell = document.createElement('td');
    let link = createLink(text);
    cell.appendChild(link);
    let userDiv = createUserDiv(user, company);
    cell.appendChild(userDiv);
    row.appendChild(cell);
}

function fillUserInfo(gender, firstName, lastName) {
    let text = `${firstName} ${lastName}`;
    if (gender === 'Male') {
        text = `Mr. ${text}`;
    } else {
        text = `Ms. ${text}`
    }
    return text;
}

function createUserDiv(user, company) {
    let userDiv = createDiv();
    createTextP(`Birthday: ${user.birthday}`, userDiv);
    let img = createImg(user.avatar);
    console.log(img);
    createP(userDiv).appendChild(img);
    if (company){
        createLink();
        createTextP(`Company: ${company.title}`, userDiv);
        createTextP(`Industry: ${company.industry}`, userDiv);
    }
    return userDiv;
}

function createText(text, parent) {
    let cellText = document.createTextNode(text);
    parent.appendChild(cellText);
}

function createLink(text) {
    let content = document.createElement('a');
    content.href = '#';
    createText(text, content);
    return content;
}

function createTextP(text, parent) {
    let content = document.createElement('p');
    createText(text, content);
    parent.appendChild(content);
}

function createP(parent) {
    let content = document.createElement('p');
    parent.appendChild(content);
    return content;
}

function createImg(url){
    let img = document.createElement('img');
    img.src = url;
    img.style.width = '100px';
    return img;
}

function createTextCell(text, row) {
    let cell = document.createElement('td');
    createText(text, cell);
    row.appendChild(cell);
}

function createDiv() {
    return document.createElement('div');
}

function replace(cardNumber) {
    let re = cardNumber.slice(2, -4);
    let replacement = '';
    for (let i = 0; i < re.length; i++) {
        replacement += '*';
    }
    return cardNumber.replace(re, replacement);
}


/*function dateTime(ms) {
    let currentDate = new Date(ms);

    let options = { year: "2-digit", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", timeZoneName: "short" };
    let americanDateTime = new Intl.DateTimeFormat("en-US", options).format;

    return americanDateTime(currentDate);
}*/
