export const createClassName = (classNames: string[]) => {
  return classNames.filter(Boolean).join(' ').toLowerCase()
}
