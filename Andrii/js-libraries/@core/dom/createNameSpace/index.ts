export const createNameSpace = (rootName: string) => {
  rootName = rootName.toLowerCase()

  return {
    root: () => rootName,
    child: (childName: string) => ({
      value: () => `${rootName}--${childName}`,
    }),
  }
}
