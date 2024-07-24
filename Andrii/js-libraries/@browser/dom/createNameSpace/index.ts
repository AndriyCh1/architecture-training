import { createNameSpace as originalCreateNameSpace } from '#libraries/@core/dom/createNameSpace'

export const createNameSpace = (rootName: string) => {
  return originalCreateNameSpace(rootName)
}
