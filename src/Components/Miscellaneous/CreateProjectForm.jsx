import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Grid,
  Button,
  Select,
  Text,
  useBreakpointValue,
  Flex,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const CreateProjectForm = () => {
  // State variables for form inputs
  const [projectName, setProjectName] = useState("");
  const [reason, setReason] = useState("");
  const [type, setType] = useState("");
  const [division, setDivision] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const status = "Registered"; // Constant field

  const toast = useToast();

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the end date is smaller than the start date
    if (endDate < startDate) {
      toast({
        title: "Invalid Date Range",
        description: "End date should grater then the starting date",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return; // Stop form submission
    }

    let formData = {
      projectName,
      reason,
      type,
      division,
      category,
      priority,
      department,
      startDate,
      endDate,
      location,
      status,
    };

    submitFormData(formData);
  };

  // Submit form data to server
  const submitFormData = async (formData) => {
    try {
      const response = await axios.post(
        "https://curious-blue-pig.cyclic.app/api/submit",
        formData
      );
      console.log(response.data.message);
      toast({
        title: "Project Created.",
        description: "We've created your project",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("An error occurred while submitting form data:", error);
    }
  };

  const gridColumnTemplate = useBreakpointValue({
    base: "repeat(1, 1fr)", // For small screens
    md: "repeat(3, 1fr)", // For larger screens
  });
  return (
    <>
      <Box
        p={4}
        bg="white"
        borderRadius="1rem"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        mt={["5rem", "auto"]}
        // border="1px solid red"
      >
        <form onSubmit={handleSubmit}>
          <Box padding={["0.5rem", "2rem"]}>
            {/* <FormLabel isRequired>Project Name</FormLabel> */}
            <Input
              // w="60%"
              w={["100%", "60%"]}
              h="8vh"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              placeholder="Enter Project Name"
            />

            <Button
              type="submit"
              colorScheme="blue"
              float="right"
              borderRadius="2rem"
              display={{ base: "none", md: "block" }}
            >
              Save Project
            </Button>
          </Box>

          <Box padding={["0.5rem", "2rem"]}>
            <Grid templateColumns={gridColumnTemplate} gap={6} mt={4}>
              {/* Reason */}
              <FormControl isRequired>
                <FormLabel>Reason</FormLabel>
                <Select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  // border="1px solid red"
                  h="6vh"
                >
                  <option value="">Select a reason</option>
                  <option value="Business">Business</option>
                  <option value="Dealership">Dealership</option>
                  <option value="Transport">Transport</option>
                </Select>
              </FormControl>

              {/* Type */}
              <FormControl isRequired>
                <FormLabel>Type</FormLabel>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                  h="6vh"
                >
                  <option value="">Select a type</option>
                  <option value="Internal">Internal</option>
                  <option value="External">External</option>
                  <option value="Vendor">Vendor</option>
                </Select>
              </FormControl>

              {/* Division */}
              <FormControl isRequired>
                <FormLabel>Division</FormLabel>
                <Select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  required
                  h="6vh"
                >
                  <option value="">Select a Division</option>
                  <option value="Filters">Filters</option>
                  <option value="Glass">Glass</option>
                  <option value="Pumps">Pumps</option>
                </Select>
              </FormControl>

              {/* category */}
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  h="6vh"
                >
                  <option value="">Select a Category</option>
                  <option value="Quality A">Quality A</option>
                  <option value="Quality B">Quality B</option>
                  <option value="Quality C">Quality C</option>
                  <option value="Quality D">Quality D</option>
                </Select>
              </FormControl>

              {/* priority */}
              <FormControl isRequired>
                <FormLabel>Priority</FormLabel>
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  required
                  h="6vh"
                >
                  <option value="">Select a Priority</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                </Select>
              </FormControl>

              {/* department */}
              <FormControl isRequired>
                <FormLabel>Department</FormLabel>
                <Select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                  h="6vh"
                >
                  <option value="">Select a Department</option>
                  <option value="Quality">Quality</option>
                  <option value="Finance">Finance</option>
                  <option value="Stores">Stores</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Senior Technical Officer">
                    Senior Technical Officer
                  </option>
                  <option value="Human Resources">Human Resources</option>
                </Select>
              </FormControl>

              {/* startDate */}
              <FormControl isRequired>
                <FormLabel>Start Date as per project plane</FormLabel>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormControl>

              {/* endDate */}
              <FormControl isRequired>
                <FormLabel>End Date as per project plane</FormLabel>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </FormControl>

              {/* Location */}
              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  h="6vh"
                >
                  <option value="">Select a Location</option>
                  <option value="Pune">Pune</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                </Select>
              </FormControl>
            </Grid>
          </Box>
        </form>
        {useBreakpointValue({
          md: (
            <Text marginLeft="67.5%" fontSize="18px" marginBottom="2rem">
              Status:{" "}
              <Text as="span" fontSize="20px" fontWeight="medium">
                {status}
              </Text>
            </Text>
          ),
          base: (
            <Flex
              marginLeft="0.5rem"
              marginBottom="2rem"
              mt={4}
              align="center"
              gap={1}
            >
              <Text fontSize="17px">Status: </Text>
              <Text as="span" fontSize="18px" fontWeight="medium">
                {status}
              </Text>
            </Flex>
          ),
        })}

        {useBreakpointValue({
          base: (
            <Flex
              justifyContent="center"
              mt={4}
              display={{ base: "block", md: "none" }}
              // border="1px solid red"
            >
              <Button
                type="submit"
                colorScheme="blue"
                borderRadius="2rem"
                w="100%"
                fontSize="large"
              >
                Save Project
              </Button>
            </Flex>
          ),
        })}
      </Box>
    </>
  );
};

export default CreateProjectForm;
