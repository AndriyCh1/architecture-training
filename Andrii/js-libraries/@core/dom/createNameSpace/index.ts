export const createNameSpace = (rootName: string) => {
  const lowerCasedRootName = rootName.toLowerCase()

  return {
    root: () => lowerCasedRootName,
    child: (childName: string) => ({
      value: () => `${lowerCasedRootName}--${childName}`,
    }),
  }
}
