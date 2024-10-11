export default function returnUrlWithParams(basePath: string, id: number, type: 'branch' | 'group' | 'teacher' | 'student' | 'lesson'): string {
  if (type === 'branch') {
    return `/${basePath}?branch=${id || 1}`;
  }

  if (type === 'group') {
    return `/${basePath}?group=${id || 1}`;
  }

  if (type === 'teacher') {
    return `/${basePath}?teacher=${id || 1}`;
  }

  if (type === 'lesson') {
    return `/${basePath}?lesson=${id || 1}`;
  }

  return `/${basePath}`;
}