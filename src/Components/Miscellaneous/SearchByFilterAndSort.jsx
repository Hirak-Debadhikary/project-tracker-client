import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Select,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HiOutlineSearch } from "react-icons/hi";
import { BsFilterLeft } from "react-icons/bs";

const SearchByFilterAndSort = ({ projects, setFilteredProjects }) => {
  const [searchText, setSearchText] = useState(""); // State for the search text
  const [selectedSortColumn, setSelectedSortColumn] = useState(""); // State for the selected sort column

  useEffect(() => {
    // Filter projects based on the search text
    const filtered = projects.filter((project) => {
      // Check if the search text matches any column's text in the project data
      const values = Object.values(project).join(" ").toLowerCase();
      return values.includes(searchText.toLowerCase());
    });

    // Sort filtered projects based on the selected sort column
    const sorted = selectedSortColumn
      ? filtered.slice().sort(compareValues(selectedSortColumn))
      : filtered;

    setFilteredProjects(sorted); // Update the filtered projects

    // setFilteredProjects(filtered); // Alternatively, you can update the projects without sorting
  }, [searchText, projects, selectedSortColumn, setFilteredProjects]);

  // Function to compare values for sorting
  const compareValues = (key) => {
    return (a, b) => {
      const valueA = a[key].toUpperCase();
      const valueB = b[key].toUpperCase();

      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    };
  };

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {!isSmallScreen && (
        <>
          {" "}
          <Flex
            alignItems="center"
            justifyContent="space-between"
            // border="1px solid red"
            gap="50px"
          >
            {/* Search UI */}
            <Box w="15%">
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<HiOutlineSearch color="gray.300" />}
                  />
                  <Input
                    id="search"
                    placeholder="Search..."
                    border="none"
                    borderBottom="1px"
                    borderColor="gray.300"
                    variant="flushed"
                    _focus={{ border: "none" }}
                    _hover={{ border: "none" }}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
            </Box>

            {/* Sorting UI */}
            <Box w="18%">
              <FormControl>
                <Flex>
                  <FormLabel htmlFor="sort" fontSize="18px" mt="1px">
                    Sort by:
                  </FormLabel>
                  <Select
                    variant="outline"
                    id="sort"
                    w="50%"
                    fontSize="18px"
                    value={selectedSortColumn}
                    onChange={(e) => setSelectedSortColumn(e.target.value)}
                  >
                    <option value="priority">Priority</option>
                    <option value="projectName">ProjectName</option>
                    <option value="reason">Reason</option>
                    <option value="type">Type</option>
                    <option value="division">Division</option>
                    <option value="category">Category</option>
                    <option value="priority">Priority</option>
                    <option value="department">Department</option>
                    <option value="location">Location</option>
                    <option value="status">Status</option>
                  </Select>
                </Flex>
              </FormControl>
            </Box>
          </Flex>
        </>
      )}

      {isSmallScreen && (
        <>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            // border="1px solid red"
            gap="5px"
          >
            {/* Search UI */}
            <Box w="60%">
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<HiOutlineSearch color="gray.300" />}
                  />
                  <Input
                    id="search"
                    placeholder="Search..."
                    border="none"
                    borderBottom="1px"
                    borderColor="gray.300"
                    variant="flushed"
                    _focus={{ border: "none" }}
                    _hover={{ border: "none" }}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
            </Box>

            {/* Sorting UI */}
            <Box w="40%">
              <FormControl>
                <Flex>
                  <FormLabel htmlFor="sort" fontSize="3xl" mt="1px">
                    <BsFilterLeft />
                  </FormLabel>
                  <Select
                    id="sort"
                    w="60%"
                    fontSize="15px"
                    value={selectedSortColumn}
                    onChange={(e) => setSelectedSortColumn(e.target.value)}
                  >
                    {" "}
                    <option value="priority">Priority</option>
                    <option value="projectName">ProjectName</option>
                    <option value="reason">Reason</option>
                    <option value="type">Type</option>
                    <option value="division">Division</option>
                    <option value="category">Category</option>
                    <option value="priority">Priority</option>
                    <option value="department">Department</option>
                    <option value="location">Location</option>
                    <option value="status">Status</option>
                  </Select>
                </Flex>
              </FormControl>
            </Box>
          </Flex>
        </>
      )}
    </>
  );
};

export default SearchByFilterAndSort;
