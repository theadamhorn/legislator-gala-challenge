const galaSeating = require('./galaSeating');

test('createTables function exists', () => {
    expect(galaSeating.createTables).toBeDefined();
});

test('assignSeats function exists', () => {
    expect(galaSeating.assignSeats).toBeDefined();
})

test('creates three tables', () => {
    expect(galaSeating.createTables).toEqual({ "table_1": [], "table_2": [], "table_3": [] })
});

// test('assigns guests', () => {
//     expect(assignSeats()).toEqual({ "table_1": ["Madison Cawthorn"], "table_2": ["Tammy Baldwin", "Julia Brownley", "Liz Cheney"], "table_3": ["Ted Lieu", "Joe Manchin", null] })
// });

