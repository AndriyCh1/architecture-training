export type CreateNameSpacePipeline = {
  root: () => string;
  child: (className: string, cacheID?: string, separator?: string) => CreateNameSpacePipeline;
  value: () => string;
};

export type CreateNameSpaceRootPipeline = CreateNameSpacePipeline & {
  get: (cacheID: string) => CreateNameSpacePipeline;
};

export type CreateNameSpace = (
  rootClassName: string,
  options?: {
    separators?: string[];
    transformRootClassName?: (cn: string) => string;
  },
) => CreateNameSpaceRootPipeline;
