
const fs = require('fs');

const num_table = 3;

const guest_list = ["Madison Cawthorn", "Tammy Baldwin", "Julia Brownley", "Liz Cheney", "Ted Lieu", "Joe Manchin"];

const planner_preferences = [
    {
        "preference": "avoid",
        "guests": ["Madison Cawthorn", "Tammy Baldwin"],
    },
    {
        "preference": "avoid",
        "guests": ["Ted Lieu", "Madison Cawthorn"],
    },
    {
        "preference": "avoid",
        "guests": ["Ted Lieu", "Tammy Baldwin"],
    },
    {
        "preference": "pair",
        "guests": ["Tammy Baldwin", "Julia Brownley"],
    }
];

// This create the object that will store the table assignments
let table_assignments = Object.create({});

// The function that will set the number of table indexes in the table_assignments object
const createTables = () => {
    for (let i = 1; i <= num_table; i++) {

        // This names the properties in the table_assignments object for each number of tables
        table_assignments["table_" + i] = [];

    };
};

const assignSeats = () => {
    for (let i = 0; i < guest_list.length; i++) {

        // Automatically assign the first guest to table 1
        if (i == 0) {
            table_assignments.table_1.push(guest_list[i])
            i++;
        };

        for (let j = 1; j <= num_table; j++) {

            for (let k = 0; k < planner_preferences.length; k++) {

                // Checks if the selected guest is included in a preference and that preference is 'avoid'
                if (planner_preferences[k].guests.includes(guest_list[i]) && planner_preferences[k].preference === "avoid") {

                    // Checks if either of the guest in the 'avoid' preference and if so moves to next table
                    if (table_assignments[`table_${j}`].includes(planner_preferences[k].guests[0]) || table_assignments[`table_${j}`].includes(planner_preferences[k].guests[1])) {

                        j++;
                    }

                    // Otherwise assigns the current guest at the current table

                    table_assignments[`table_${j}`].push(guest_list[i]);
                    i++;

                }

                // Checks if the selected guest is included in a preference and that preference is 'paur'
                if (planner_preferences[k].guests.includes(guest_list[i]) && planner_preferences[k].preference === "pair") {

                    // Checks if either of the guest in the 'pair' preference and if so moves to next table
                    if (table_assignments[`table_${j}`].includes(planner_preferences[k].guests[0]) || table_assignments[`table_${j}`].includes(planner_preferences[k].guests[1])) {
                        table_assignments[`table_${j}`].push(guest_list[i]);
                        i++;
                    }

                }

                // Checks if the guest does not have a preference and is not assigned at the current table
                else if (!planner_preferences[k].guests.includes(guest_list[i]) && !table_assignments[`table_${j}`].includes(guest_list[i])) {
                    table_assignments[`table_${j}`].push(guest_list[i]);
                    i++;

                }
            }
        }
    }
};

createTables();
assignSeats();

const output = (data) => {
    fs.writeFileSync("output.json", JSON.stringify(data));
};

output(table_assignments);

// export to test

module.exports = { createTables, assignSeats }