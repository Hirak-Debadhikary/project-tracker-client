import React, { useState, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { GrPrevious, GrNext } from "react-icons/gr";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [displayedPages, setDisplayedPages] = useState([]);

  // Function to update the displayed pages based on current page
  const updateDisplayedPages = () => {
    const totalDisplayPages = Math.min(totalPages, 20);
    const pages = [];

    if (currentPage <= 3) {
      // Display pages 1 to totalDisplayPages
      for (let i = 1; i <= totalDisplayPages; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      // Display pages from totalPages - totalDisplayPages + 1 to totalPages
      for (let i = totalPages - totalDisplayPages + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Display current page - 2 to current page + 2
      const startPage = currentPage - 2;
      const endPage = currentPage + 2;

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    setDisplayedPages(pages);
  };

  // Handle page change
  const handlePageChange = (page) => {
    onPageChange(page);
    updateDisplayedPages();
  };

  // Handle previous page click
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // Handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Update displayed pages on component mount
  useEffect(() => {
    updateDisplayedPages();
  }, []);

  return (
    <Box display="flex" justifyContent="center" p="2rem">
      <Button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        mr={2}
        bg="transparent"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
        _hover={{
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          fontSize: "20px",
        }}
      >
        <GrPrevious />
      </Button>

      {displayedPages.map((page) => (
        <Button
          mr={2}
          key={page}
          onClick={() => handlePageChange(page)}
          bg="transparent"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
          _hover={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          }}
        >
          {page}
        </Button>
      ))}

      <Button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        bg="transparent"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
        _hover={{
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          fontSize: "20px",
        }}
      >
        <GrNext />
      </Button>
    </Box>
  );
};

export default Pagination;
