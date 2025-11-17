export default function ModulesDao(db) {
 function findModulesForCourse(courseId) {
   const { modules } = db;
   return modules.filter((module) => module.course === courseId);
 }
 return {
   findModulesForCourse,
 };
}


function createModule(module) {
  const newModule = { ...module, _id: uuidv4() };
  db.modules = [...db.modules, newModule];
  return newModule;
}
function deleteModule(moduleId) {
  const { modules } = db;
  db.modules = modules.filter((module) => module._id !== moduleId);
}
function updateModule(moduleId, moduleUpdates) {
  const { modules } = db;
  const foundModule = modules.find((m) => m._id === moduleId);
  if (!foundModule) return null;
  Object.assign(foundModule, moduleUpdates);
  return foundModule;
}
