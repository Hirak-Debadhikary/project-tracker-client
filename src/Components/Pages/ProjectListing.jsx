import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import Navbar from "../Miscellaneous/Navbar";
import SearchByFilterAndSort from "../Miscellaneous/SearchByFilterAndSort";
import Pagination from "../Miscellaneous/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const ProjectListing = () => {
  // State to store all projects
  const [projects, setProjects] = useState([]);
  // State to store filtered projects
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from the API
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://sore-puce-magpie-sari.cyclic.app/api/getAll"
        );
        setProjects(response.data); // Set the projects state with the fetched data
        setFilteredProjects(response.data); // Initialize filtered projects with all projects
      } catch (error) {
        console.error("Error occurred while fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleStatusChange = async (projectId, status) => {
    try {
      // Update the status of the project in the API
      await axios.put(
        `https://sore-puce-magpie-sari.cyclic.app/api/projects/${projectId}/status`,
        {
          status: status,
        }
      );
      // If the status change is successful, update the projects state
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === projectId ? { ...project, status: status } : project
        )
      );
    } catch (error) {
      console.error("Error occurred while updating project status:", error);
    }
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1); // State to store the current page number
  const projectsPerPage = 10; // Number of projects to display per page

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Update the current page number
  };
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  //Format the date function
  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    // Format the date as "Month-Day-Year"
    return `${month}-${day}-${year}`;

    // Button size for different breakpoints
  }
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  return (
    <>
      <Navbar />
      {!isSmallScreen && (
        <>
          <div className="project-bg">
            <Box height="14vh" padding={4}>
              <Flex justifyContent="space-between" mt={["-1.5rem", "auto"]}>
                <Button
                  mt={["0.5rem", "1rem"]}
                  fontSize={["20px", "2xl"]}
                  bg="transparent"
                  color="white"
                  _hover={{ bg: "transparent" }}
                >
                  &lt; Project Listing
                </Button>
                {/* For Small Screen */}
                <Link
                  to="/"
                  style={{ marginLeft: "auto", marginTop: "0.6rem" }}
                >
                  <IconButton
                    display={{ base: "block", md: "none" }}
                    aria-label="Logout"
                    icon={<Icon as={FiLogOut} />}
                    variant="ghost"
                    fontSize="3xl"
                    _hover={{ backgroundColor: "transparent", color: "black" }}
                    color="white"
                  />
                </Link>
              </Flex>
              <Box
                className="project-Logo"
                display={{ base: "none", md: "block" }}
              ></Box>
            </Box>

            {/* Projects */}
            <Box
              bg="white"
              borderRadius="5px"
              boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            >
              {/* Search Filter */}
              <Box textAlign="center" borderRadius="5px" p={2} w="100%">
                <SearchByFilterAndSort
                  projects={projects}
                  setFilteredProjects={setFilteredProjects}
                />
              </Box>
              <Table bg="blue.50">
                <Thead>
                  <Tr>
                    <Th>Project Name</Th>
                    <Th>Reason</Th>
                    <Th>Type</Th>
                    <Th>Division</Th>
                    <Th>Category</Th>
                    <Th>Priority</Th>
                    <Th>Department</Th>
                    <Th>Location</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody fontSize="15px" bg="white">
                  {currentProjects.map((project, index) => (
                    <Tr key={index}>
                      <Td>
                        <Text fontSize="md" fontWeight="bold">
                          {project.projectName}
                        </Text>
                        <Text>
                          {formatDate(project.startDate)} to{" "}
                          {formatDate(project.endDate)}
                        </Text>
                      </Td>
                      <Td>{project.reason}</Td>
                      <Td>{project.type}</Td>
                      <Td>{project.division}</Td>
                      <Td>{project.category}</Td>
                      <Td>{project.priority}</Td>
                      <Td>{project.department}</Td>
                      <Td>{project.location}</Td>
                      <Td color="rgb(20,116,205)" fontWeight="medium">
                        {project.status}
                      </Td>
                      <Td w="18%">
                        {" "}
                        <Button
                          onClick={() =>
                            handleStatusChange(project._id, "Running")
                          }
                          colorScheme="blue"
                          size="sm"
                          mr="10px"
                          borderRadius="1rem"
                          w="30%"
                          _hover={{
                            boxShadow:
                              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                          }}
                          boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
                        >
                          Start
                        </Button>
                        <Button
                          size="sm"
                          mr="10px"
                          borderRadius="1rem"
                          w="30%"
                          border="1px solid rgb(20,116,205)"
                          background="white"
                          color="rgb(20,116,205)"
                          _hover={{
                            bg: "white",
                            boxShadow:
                              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                          }}
                          boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
                          onClick={() =>
                            handleStatusChange(project._id, "Closed")
                          }
                        >
                          Close
                        </Button>
                        <Button
                          size="sm"
                          borderRadius="1rem"
                          w="30%"
                          border="1px solid rgb(20,116,205)"
                          background="white"
                          color="rgb(20,116,205)"
                          _hover={{
                            bg: "white",
                            boxShadow:
                              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                          }}
                          boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
                          onClick={() =>
                            handleStatusChange(project._id, "Cancelled")
                          }
                        >
                          Cancel
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}

      {isSmallScreen && (
        <>
          {" "}
          <div className="project-bg">
            <Box height="14vh" padding={4}>
              <Flex justifyContent="space-between" mt={["-1.5rem", "auto"]}>
                <Button
                  mt={["0.5rem", "1rem"]}
                  fontSize={["20px", "2xl"]}
                  bg="transparent"
                  color="white"
                  _hover={{ bg: "transparent" }}
                >
                  &lt; Project Listing
                </Button>
                {/* For Small Screen */}
                <Link
                  to="/"
                  style={{ marginLeft: "auto", marginTop: "0.6rem" }}
                >
                  <IconButton
                    display={{ base: "block", md: "none" }}
                    aria-label="Logout"
                    icon={<Icon as={FiLogOut} />}
                    variant="ghost"
                    fontSize="3xl"
                    _hover={{ backgroundColor: "transparent", color: "black" }}
                    color="white"
                  />
                </Link>
              </Flex>
              <Box
                className="project-Logo"
                display={{ base: "none", md: "block" }}
              ></Box>
            </Box>
          </div>
          {/* Search Filter */}
          <Box
            textAlign="center"
            borderRadius="5px"
            p={2}
            w="100%"
            // border="1px solid red"
            mt="5rem"
          >
            <SearchByFilterAndSort
              projects={projects}
              setFilteredProjects={setFilteredProjects}
            />
          </Box>
          <Box p={2} mb="5rem">
            {currentProjects.map((project, index) => (
              <Box
                bg="white"
                borderRadius="15px"
                boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                overflowX="auto"
                width="100%"
                mt="0.5rem"
                // mb="4rem"
                p={2}
                key={index}
              >
                <Flex justifyContent="space-between" p={2}>
                  <Box fontSize="xl">
                    <Text fontWeight="bold">{project.projectName}</Text>
                    <Text fontSize="md">
                      {formatDate(project.startDate)} to{" "}
                      {formatDate(project.endDate)}
                    </Text>
                  </Box>
                  <Box>
                    <Text color="rgb(20,116,205)" fontWeight="medium">
                      {project.status}
                    </Text>
                  </Box>
                </Flex>

                <Box p={2} fontSize="16px">
                  <Flex gap={2}>
                    <Text style={{ color: "gray", fontWeight: "500" }}>
                      Reason:{" "}
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>{project.reason}</Text>
                  </Flex>

                  <Flex gap={2}>
                    <Text style={{ color: "gray", fontWeight: "500" }}>
                      Type:
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>{project.type}</Text>
                  </Flex>

                  <Flex gap={2}>
                    <Text style={{ color: "gray", fontWeight: "500" }}>
                      Category:
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      {project.category}
                    </Text>
                  </Flex>

                  <Flex gap={2}>
                    <Text style={{ color: "gray", fontWeight: "500" }}>
                      Dept:
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      {project.department}
                    </Text>
                  </Flex>

                  <Flex gap={2}>
                    <Text style={{ color: "gray", fontWeight: "500" }}>
                      Location:
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      {project.location}
                    </Text>
                  </Flex>

                  <Flex gap={2}>
                    <Text style={{ color: "gray", fontWeight: "500" }}>
                      Priority:
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      {project.priority}
                    </Text>
                  </Flex>
                </Box>

                <Flex justifyContent="space-evenly" mt="1rem" mb="1rem">
                  {" "}
                  <Button
                    colorScheme="blue"
                    size="sm"
                    mr="10px"
                    borderRadius="2rem"
                    w="25%"
                    fontSize="xl"
                    h="2.5rem"
                    _hover={{
                      boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                    }}
                    boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
                    onClick={() => handleStatusChange(project._id, "Running")}
                  >
                    Start
                  </Button>
                  <Button
                    border="1px solid rgb(20,116,205)"
                    background="white"
                    color="rgb(20,116,205)"
                    size="sm"
                    mr="10px"
                    borderRadius="2rem"
                    w="25%"
                    fontSize="xl"
                    h="2.5rem"
                    _hover={{
                      boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                    }}
                    boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
                    onClick={() => handleStatusChange(project._id, "Closed")}
                  >
                    Close
                  </Button>
                  <Button
                    border="1px solid rgb(20,116,205)"
                    background="white"
                    color="rgb(20,116,205)"
                    size="sm"
                    mr="10px"
                    borderRadius="2rem"
                    w="25%"
                    fontSize="xl"
                    h="2.5rem"
                    _hover={{
                      boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                    }}
                    boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
                    onClick={() => handleStatusChange(project._id, "Cancelled")}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Box>
            ))}
          </Box>
          <Navbar />
        </>
      )}
    </>
  );
};

export default ProjectListing;
