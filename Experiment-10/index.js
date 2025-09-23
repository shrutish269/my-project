const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (q) => new Promise(resolve => rl.question(q, ans => resolve(ans)));

let employees = [
  { name: 'Alice', id: 'E101' },
  { name: 'Bob', id: 'E102' },
  { name: 'Charlie', id: 'E103' }
];

async function main() {
  console.log('Employee Management System');
  while (true) {
    console.log('\n1. Add Employee\n2. List Employees\n3. Remove Employee\n4. Exit\n');
    const choice = (await question('Enter your choice: ')).trim();

    switch (choice) {
      case '1':
        await addEmployee();
        break;
      case '2':
        listEmployees();
        break;
      case '3':
        await removeEmployee();
        break;
      case '4':
        console.log('Goodbye!');
        rl.close();
        process.exit(0);
      default:
        console.log('Invalid choice. Please enter 1-4.');
    }
  }
}

async function addEmployee() {
  const name = (await question('Enter employee name: ')).trim();
  const id = (await question('Enter employee ID: ')).trim();
  if (!name || !id) {
    console.log('Name and ID are required.');
    return;
  }
  if (employees.some(e => e.id === id)) {
    console.log(`An employee with ID ${id} already exists.`);
    return;
  }
  employees.push({ name, id });
  console.log(`Employee ${name} (ID: ${id}) added successfully.`);
}

function listEmployees() {
  console.log('\nEmployee List:');
  if (employees.length === 0) {
    console.log('No employees found.');
    return;
  }
  employees.forEach((e, i) => {
    console.log(`${i + 1}. Name: ${e.name}, ID: ${e.id}`);
  });
}

async function removeEmployee() {
  const id = (await question('Enter employee ID to remove: ')).trim();
  const idx = employees.findIndex(e => e.id === id);
  if (idx === -1) {
    console.log(`Employee with ID ${id} not found.`);
    return;
  }
  const removed = employees.splice(idx, 1)[0];
  console.log(`Employee ${removed.name} (ID: ${removed.id}) removed successfully.`);
}

main();
