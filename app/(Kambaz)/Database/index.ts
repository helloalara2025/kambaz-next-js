/*
  tiny db exports
  unified data layer for kambaz app
  clean json imports + safe fallbacks
*/

/*
  tiny db exports
  unified data layer for kambaz app
  clean json imports + safe fallbacks
*/

import coursesData from './courses.json' assert { type: 'json' };
import modulesData from './modules.json' assert { type: 'json' };
import assignmentsData from './assignments.json' assert { type: 'json' };
import usersData from './users.json' assert { type: 'json' };

// core data exports
export const courses = coursesData ?? [];
export const modules = modulesData ?? [];
export const assignments = assignmentsData ?? [];
export const users = usersData ?? [];