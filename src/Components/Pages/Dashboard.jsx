import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Navbar from "../Miscellaneous/Navbar";
import BarChart from "../Miscellaneous/BarChart";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Dashboard = () => {
  // State to store the count of all items
  const [allCount, setAllCount] = useState({});

  useEffect(() => {
    // Function to fetch the count of all items
    const fetchAllCount = async () => {
      try {
        const response = await axios.get(
          "https://sore-puce-magpie-sari.cyclic.app/api/status/count"
        );
        // Update the state with the fetched count
        setAllCount({ allCount, ...response.data });
      } catch (error) {
        console.error("Error occurred while fetching projects:", error);
      }
    };
    // Call the fetchAllCount function
    fetchAllCount();
  }, []);

  useEffect(() => {
    // Log the updated allCount whenever it changes
    console.log(allCount);
  }, [allCount]);

  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const fontSize = useBreakpointValue({ base: "15px", md: "18px" });
  const headingFontSize = useBreakpointValue({ base: "18px", md: "3rem" });

  return (
    <>
      <Navbar />
      <div className="project-bg">
        <Box height="12vh" padding={4}>
          <Flex justifyContent="space-between" mt={["-1.5rem", "auto"]}>
            <Button
              mt={["0.5rem", "1rem"]}
              fontSize={["20px", "2xl"]}
              bg="transparent"
              color="white"
              _hover={{ bg: "transparent" }}
            >
              &lt; Dashboard
            </Button>
            {/* For Small Screen */}
            <Link to="/" style={{ marginLeft: "auto", marginTop: "0.6rem" }}>
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

        {!isSmallScreen && (
          <>
            {" "}
            <Box
              w="100%"
              height="14vh"
              // border="1px solid red"
              mt={["5rem", "auto"]}
            >
              <Flex justifyContent="space-evenly" p="2" gap="20px">
                {/* Total Projects */}
                <Box
                  width={["45%", "20%"]}
                  height="12vh"
                  bg="white"
                  borderRadius="5px"
                  boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                  padding="0.5rem 0rem 0rem 1rem"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    height="100%"
                    width="6px"
                    bg="#76E4F7"
                    borderRadius="4px 0px 0px 4px"
                  />
                  <Text fontSize={fontSize} fontWeight="medium">
                    Total Projects
                  </Text>
                  <Heading fontSize={headingFontSize}>{allCount.count}</Heading>
                </Box>
                {/* Closed */}
                <Box
                  width={["45%", "20%"]}
                  height="12vh"
                  bg="white"
                  borderRadius="5px"
                  boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                  padding="0.5rem 0rem 0rem 1rem"
                  // textAlign="center"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    height="100%"
                    width="6px"
                    bg="#76E4F7"
                    borderRadius="4px 0px 0px 4px"
                  />
                  <Text fontSize={fontSize} fontWeight="medium">
                    Closed
                  </Text>
                  <Heading fontSize={headingFontSize}>
                    {allCount.closed}
                  </Heading>
                </Box>

                {/* Running */}
                <Box
                  width={["45%", "20%"]}
                  height="12vh"
                  bg="white"
                  borderRadius="5px"
                  boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                  padding="0.5rem 0rem 0rem 1rem"
                  // textAlign="center"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    height="100%"
                    width="6px"
                    bg="#76E4F7"
                    borderRadius="4px 0px 0px 4px"
                  />
                  <Text fontSize={fontSize} fontWeight="medium">
                    Running
                  </Text>
                  <Heading fontSize={headingFontSize}>
                    {allCount.running}
                  </Heading>
                </Box>

                {/* Closure Delay */}
                <Box
                  width={["45%", "20%"]}
                  height="12vh"
                  bg="white"
                  borderRadius="5px"
                  boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                  padding="0.5rem 0rem 0rem 1rem"
                  // textAlign="center"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    height="100%"
                    width="6px"
                    bg="#76E4F7"
                    borderRadius="4px 0px 0px 4px"
                  />
                  <Text fontSize={fontSize} fontWeight="medium">
                    Closure Delay
                  </Text>
                  <Heading fontSize={headingFontSize}>
                    {allCount.closerDelay}
                  </Heading>
                </Box>

                {/*Cancelled*/}
                <Box
                  width={["45%", "20%"]}
                  height="12vh"
                  bg="white"
                  borderRadius="5px"
                  boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                  padding="0.5rem 0rem 0rem 1rem"
                  // textAlign="center"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    height="100%"
                    width="6px"
                    bg="#76E4F7"
                    borderRadius="4px 0px 0px 4px"
                  />
                  <Text fontSize={fontSize} fontWeight="medium">
                    Cancelled
                  </Text>
                  <Heading fontSize={headingFontSize}>
                    {allCount.cancelled}
                  </Heading>
                </Box>
              </Flex>
            </Box>
          </>
        )}

        {isSmallScreen && (
          <>
            <Box w="100%" height="14vh">
              {" "}
              <Flex justifyContent="space-evenly" p="2" gap="20px">
                <Carousel showThumbs={false}>
                  <Flex justifyContent="space-evenly" gap="5px">
                    {/* Total Projects */}
                    <Box
                      width="40%"
                      height="12vh"
                      bg="white"
                      borderRadius="5px"
                      boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
                      padding="0.5rem 0rem 0rem 1rem"
                      position="relative"
                    >
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        height="100%"
                        width="6px"
                        bg="#76E4F7"
                        borderRadius="4px 0px 0px 4px"
                      />
                      <Text fontSize={fontSize} fontWeight="medium">
                        Total Projects
                      </Text>
                      <Heading fontSize={headingFontSize}>
                        {allCount.count}
                      </Heading>
                    </Box>
                    {/* Closed */}
                    <Box
                      width="40%"
                      height="12vh"
                      bg="white"
                      borderRadius="5px"
                      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                      padding="0.5rem 0rem 0rem 1rem"
                      // textAlign="center"
                      position="relative"
                    >
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        height="100%"
                        width="6px"
                        bg="#76E4F7"
                        borderRadius="4px 0px 0px 4px"
                      />
                      <Text fontSize={fontSize} fontWeight="medium">
                        Closed
                      </Text>
                      <Heading fontSize={headingFontSize}>
                        {allCount.closed}
                      </Heading>
                    </Box>
                  </Flex>
                  <Flex justifyContent="space-evenly" gap="5px">
                    {/* Running */}
                    <Box
                      width="40%"
                      height="12vh"
                      bg="white"
                      borderRadius="5px"
                      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                      padding="0.5rem 0rem 0rem 1rem"
                      // textAlign="center"
                      position="relative"
                    >
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        height="100%"
                        width="6px"
                        bg="#76E4F7"
                        borderRadius="4px 0px 0px 4px"
                      />
                      <Text fontSize={fontSize} fontWeight="medium">
                        Running
                      </Text>
                      <Heading fontSize={headingFontSize}>
                        {allCount.running}
                      </Heading>
                    </Box>
                    {/* Closure Delay */}
                    <Box
                      width="40%"
                      height="12vh"
                      bg="white"
                      borderRadius="5px"
                      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                      padding="0.5rem 0rem 0rem 1rem"
                      // textAlign="center"
                      position="relative"
                    >
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        height="100%"
                        width="6px"
                        bg="#76E4F7"
                        borderRadius="4px 0px 0px 4px"
                      />
                      <Text fontSize={fontSize} fontWeight="medium">
                        Closure Delay
                      </Text>
                      <Heading fontSize={headingFontSize}>
                        {allCount.closerDelay}
                      </Heading>
                    </Box>
                  </Flex>
                  <Flex marginLeft="6%" gap="5px">
                    {/*Cancelled*/}
                    <Box
                      width="40%"
                      height="12vh"
                      bg="white"
                      borderRadius="5px"
                      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                      padding="0.5rem 0rem 0rem 1rem"
                      // textAlign="center"
                      position="relative"
                    >
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        height="100%"
                        width="6px"
                        bg="#76E4F7"
                        borderRadius="4px 0px 0px 4px"
                      />
                      <Text fontSize={fontSize} fontWeight="medium">
                        Cancelled
                      </Text>
                      <Heading fontSize={headingFontSize}>
                        {allCount.cancelled}
                      </Heading>
                    </Box>
                  </Flex>
                </Carousel>
              </Flex>
            </Box>
          </>
        )}

        {/* Chart.js */}
        <Box w={{ base: "100%", md: "40%" }} mt="1rem" padding="1rem">
          <Text
            mb="1rem"
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="semibold"
          >
            Department wise - Total Vs Closed
          </Text>
          <BarChart />
        </Box>
      </div>
    </>
  );
};

export default Dashboard;
