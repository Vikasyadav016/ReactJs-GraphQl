const { v4: uuidv4 } = require('uuid');
const { readJson, writeJson } = require('../db/connection');

const STUDENT_FILE = 'students.json';

function getStudents() {
  return readJson(STUDENT_FILE);
}

function saveStudents(students) {
  writeJson(STUDENT_FILE, students);
}

const studentResolvers = {
  Query: {
    students: () => getStudents(),
    student: (_, { id }) => getStudents().find((student) => student.id === id) || null,
  },
  Mutation: {
    createStudent: (_, { input }) => {
      const students = getStudents();
      const newStudent = {
        id: uuidv4(),
        name: input.name,
        email: input.email,
        age: input.age,
        course: input.course,
      };
      students.push(newStudent);
      saveStudents(students);
      return newStudent;
    },
    updateStudent: (_, { id, input }) => {
      const students = getStudents();
      const index = students.findIndex((student) => student.id === id);
      if (index === -1) {
        throw new Error('Student not found');
      }
      const updated = {
        ...students[index],
        ...input,
      };
      students[index] = updated;
      saveStudents(students);
      return updated;
    },
    deleteStudent: (_, { id }) => {
      const students = getStudents();
      const index = students.findIndex((student) => student.id === id);
      if (index === -1) {
        return false;
      }
      students.splice(index, 1);
      saveStudents(students);
      return true;
    },
  },
};

module.exports = studentResolvers;
