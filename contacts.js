const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

// TODO: задокументировать каждую функцию
function listContacts() {
  // ...твой код
  fs.readFile(contactsPath)
    .then((data) => console.table(data.toString()))
    .catch((err) => console.log(err.message));
}

async function getContactById(contactId) {
  // ...твой код
  try {
    const data = await fs.readFile(contactsPath);
    const currentData = JSON.parse(data);
    return currentData.filter(
      (contact) => contactId === Number.parseInt(contact.id)
    );
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  // ...твой код
  try {
    const data = await fs.readFile(contactsPath);
    const currentData = JSON.parse(data);
    const currentContacts = currentData.filter(
      (contact) => contactId !== Number.parseInt(contact.id)
    );
    await fs.writeFile(contactsPath, JSON.stringify(currentContacts));

    return currentContacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  // ...твой код
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const currentData = JSON.parse(data);
    currentData.push({ name, email, phone });
    await fs.writeFile(contactsPath, JSON.stringify(currentData));

    return currentData;
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = { listContacts, getContactById, removeContact, addContact };
