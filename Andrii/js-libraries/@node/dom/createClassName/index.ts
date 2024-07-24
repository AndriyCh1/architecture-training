import { createClassName as originalCreateClassName } from '#libraries/@core/dom/createClassName'

export const createClassName = (classNames: string[]) => {
  return originalCreateClassName(classNames)
}
