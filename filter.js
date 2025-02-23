interface User { 
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
    { type: 'user', name: 'Rukayat Jimoh', age: 31, occupation: 'Entrepreneurer' }, 
    { type: 'admin', name: 'Abiola Owolabi', age: 32, role: 'Administrator' }, 
    { type: 'user', name: 'Ihenayi', age: 23, occupation: 'Front end engineer' }, 
    { type: 'admin', name: 'Desire Abdulmaleek', age: 4, role: 'Doctor' }, 
    { type: 'user', name: 'Abdulwasi', age: 2, occupation: 'Engineer' }, 
    { type: 'admin', name: 'Adebayo Owolabi', age: 35, role: 'Anti-virus engineer' } 
];

export function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}

// **Updated filterPersons function with correct typings**
export function filterPersons<T extends 'user' | 'admin'>(
    persons: Person[], 
    personType: T, 
    criteria: Omit<Partial<T extends 'user' ? User : Admin>, 'type'>
): T extends 'user' ? User[] : Admin[] {
    return persons
        .filter((person): person is T extends 'user' ? User : Admin => person.type === personType)
        .filter((person) => {
            let criteriaKeys = Object.keys(criteria) as (keyof typeof criteria)[];
            return criteriaKeys.every((fieldName) => person[fieldName] === criteria[fieldName]);
        }) as T extends 'user' ? User[] : Admin[];
}

// **Testing the function**
export const usersOfAge23 = filterPersons(persons, 'user', { age: 23 });
export const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 });

console.log('Users of age 23:');
usersOfAge23.forEach(logPerson);

console.log();

console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson);
