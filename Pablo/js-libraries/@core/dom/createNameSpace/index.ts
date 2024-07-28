import { toKebabCase } from '#libraries/@core/strings/toKebabCase';
import {
  CreateNameSpace,
  CreateNameSpacePipeline,
  CreateNameSpaceRootPipeline,
} from './types';

export const settings = {
  transformRootClassName: (cn: string) => toKebabCase(cn),
  boundedSeparators: ['--'],
};

export const createNameSpace: CreateNameSpace = (
  rootNameSpace,
  options = {},
) => {
  const cacheIDs = new Map<string, string>();
  const rootCn = options?.transformRootClassName
    ? options.transformRootClassName(rootNameSpace)
    : settings.transformRootClassName(rootNameSpace);

  let result = rootCn;
  let partIndex = 0;

  const reset = (startValue?: string) => {
    result = startValue || rootCn;
    partIndex = 0;
  };

  const getSeparator = (
    index: number,
  ) => {
    const target = typeof options?.separators !== 'undefined' && options?.separators.length > 0
      ? options?.separators
      : settings.boundedSeparators;
    return target[index] || target[target.length - 1];
  };

  const pipeline: CreateNameSpacePipeline = {
    root: () => rootCn,
    value: () => {
      const saveResult = result;
      reset();
      return saveResult;
    },
    child: (className, cacheID, separator) => {
      if (!className) {
        return pipeline;
      }
      result = `${result}${separator || getSeparator(partIndex)}${className}`;
      partIndex++;
      if (cacheID) {
        cacheIDs.set(cacheID, result);
      }
      return pipeline;
    },
  };

  const rootPipeline: CreateNameSpaceRootPipeline = {
    ...pipeline,
    get: (cacheID) => {
      if (!cacheIDs.has(cacheID)) {
        return pipeline;
      }
      reset(cacheIDs.get(cacheID));
      return pipeline;
    },
  };

  return rootPipeline;
};
