import { useState, useMemo } from "react"

export const DOTS = '...';
export const usePagination = ({
    totalCount, // totalCount max num of pages
    currentPage,
    pageSize,
    siblingCount,
}) => {
    
    console.log('Page Size', pageSize)
     const paginationRange = useMemo(() => {
        const range = (start, end) => {
            let length = end - start + 1;
            /*
                Create an array of certain length and set the elements within it from
              start value to end value.
            */
            return Array.from({ length }, (_, idx) => idx + start);
          };
            
          const totalPageCount = Math.ceil(totalCount / pageSize);
          const totalPageNumbers = siblingCount + 5;
    
            if (totalPageNumbers >= totalPageCount) {
                return range(1, totalPageCount);
            }

            const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
            const rightSiblingIndex = Math.min(
                  currentPage + siblingCount,
                  totalPageCount
            );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }
     
    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
        
    }, [totalCount, currentPage, pageSize, siblingCount]);

    console.log(paginationRange);
    return paginationRange || [];
};