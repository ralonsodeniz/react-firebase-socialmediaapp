import React, { Fragment } from "react";

import {
  ScreamSkeletonCard,
  ScreamSkeletonCardMedia,
  ScreamSkeletonCardContent,
  ScreamSkeletonHandle,
  ScreamSkeletonDate,
  ScreamSkeletonFullLine,
  ScreamSkeletonHalfLine
} from "./ScreamSkeleton.styles";

import NoImg from "../../media/no-image.webp";

const ScreamSkeleton = () => {
  // we create an array of length 4 using the array constructor
  const content = Array.from({ length: 4 }).map((skeleton, skeletonIndex) => (
    <ScreamSkeletonCard key={skeletonIndex}>
      <ScreamSkeletonCardMedia image={NoImg} />
      <ScreamSkeletonCardContent>
        <ScreamSkeletonHandle />
        <ScreamSkeletonDate />
        <ScreamSkeletonFullLine />
        <ScreamSkeletonFullLine />
        <ScreamSkeletonHalfLine />
      </ScreamSkeletonCardContent>
    </ScreamSkeletonCard>
  ));

  return <Fragment>{content}</Fragment>;
};

export default ScreamSkeleton;
