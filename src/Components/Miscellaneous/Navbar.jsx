import {
  Box,
  Flex,
  Icon,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiList, FiPlus, FiLogOut } from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const location = useLocation();

  return (
    <>
      {!isSmallScreen && (
        <>
          <Box
            bg="white"
            py={4}
            position="fixed"
            left={0}
            top={0}
            h="100vh"
            width="5%"
            boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
            display={{ base: "none", md: "block" }}
            margin-left="5%"
          >
            <Flex
              direction="column"
              alignItems="center"
              color="black"
              padding="1rem"
              justifyContent="space-evenly"
              h="40vh"
              w="40%"
              marginLeft="35%"
              marginTop="8rem"
            >
              <Link to="/dashboard">
                <IconButton
                  aria-label="Dashboard"
                  icon={<Icon as={AiOutlineDashboard} />}
                  variant="ghost"
                  fontSize="4xl"
                  padding={2}
                  _hover={{ color: "#1278d5" }}
                  color={
                    location.pathname === "/dashboard" ? "#1278d5" : undefined
                  }
                />
              </Link>
              <Link to="/list">
                <IconButton
                  aria-label="Listing"
                  icon={<Icon as={FiList} />}
                  variant="ghost"
                  fontSize="4xl"
                  _hover={{ color: "#1278d5" }}
                  color={location.pathname === "/list" ? "#1278d5" : undefined}
                />
              </Link>
              <Link to="/project">
                <IconButton
                  aria-label="Create Project"
                  icon={<Icon as={FiPlus} />}
                  variant="ghost"
                  fontSize="4xl"
                  _hover={{ color: "#1278d5" }}
                  color={
                    location.pathname === "/project" ? "#1278d5" : undefined
                  }
                />
              </Link>
            </Flex>
            <Link to="/">
              <IconButton
                aria-label="Logout"
                icon={<Icon as={FiLogOut} />}
                variant="ghost"
                fontSize="3xl"
                marginLeft="35%"
                mt="14rem"
                _hover={{ color: "#1278d5" }}
              />
            </Link>
          </Box>
        </>
      )}

      {isSmallScreen && (
        <>
          <Box
            bg="white"
            py={4}
            px={8}
            borderTop="1px solid #E2E8F0"
            position="fixed"
            bottom={0}
            left={0}
            width="100%"
            // border="1px solid red"
            borderRadius="2rem"
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          >
            <Flex justifyContent="space-evenly" alignItems="center">
              <Flex alignItems="center" gap="50px">
                <Link to="/dashboard">
                  <IconButton
                    aria-label="Dashboard"
                    icon={<Icon as={AiOutlineDashboard} />}
                    variant="ghost"
                    fontSize="4xl"
                    _hover={{ color: "#1278d5" }}
                    mr={4}
                    color={
                      location.pathname === "/dashboard" ? "#1278d5" : undefined
                    }
                  />
                </Link>
                <Link to="/project">
                  <IconButton
                    aria-label="Create Project"
                    icon={<Icon as={FiPlus} />}
                    variant="ghost"
                    fontSize="4xl"
                    _hover={{ color: "#1278d5" }}
                    color={
                      location.pathname === "/project" ? "#1278d5" : undefined
                    }
                  />
                </Link>
                <Link to="/list">
                  <IconButton
                    aria-label="Listing"
                    icon={<Icon as={FiList} />}
                    variant="ghost"
                    fontSize="4xl"
                    _hover={{ color: "#1278d5" }}
                    mr={4}
                    color={
                      location.pathname === "/list" ? "#1278d5" : undefined
                    }
                  />
                </Link>
              </Flex>
            </Flex>
          </Box>
        </>
      )}
    </>
  );
}

export default Navbar;
