import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import CreateProjectForm from "../Miscellaneous/CreateProjectForm";
import Navbar from "../Miscellaneous/Navbar";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Project = () => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  return (
    <>
      <Navbar />

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
                  &lt; Create Project
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
          {/* Form */}
          <Box
            p={2}
            // border="2px solid red"
            height={["auto", "75vh"]}
            width="100%"
            marginBottom="5rem"
          >
            <CreateProjectForm />
          </Box>
          <Navbar />
        </>
      )}

      {!isSmallScreen && (
        <>
          {/* <Navbar /> */}
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
                  &lt; Create Project
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

            {/* Form */}
            <Box
              p={2}
              // border="2px solid red"
              height={["auto", "75vh"]}
              width="100%"
            >
              <CreateProjectForm />
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default Project;
