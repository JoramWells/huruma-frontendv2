/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  // eslint-disable-next-line no-unused-vars
  HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, Text,
} from '@chakra-ui/react';
import { FaBell, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MainNav = () => (
  <HStack
    p={2}
    bg="white"
    position="fixed"
    zIndex={10}
    w="100%"
    h="65px"
    top={0}
    justifyContent="space-between"
    borderBottom="1px"
    borderColor="gray.200"
  // boxShadow="lg"
  // bgColor="blue.900"
  >
    <Text
      fontSize="3xl"
      color="gray.800"
      fontWeight="bold"
    >
      Mother Angela
    </Text>

    <HStack>
      <IconButton>
        <FaBell />

      </IconButton>

      <Menu>
        <MenuButton>
          <Box
            p={2}
            backgroundColor="gray"
            rounded="full"
            _focus={{
              backgroundColor: 'teal',
            }}
          >
            <FaUser />
          </Box>
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Link to="/login">Login</Link>
          </MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </HStack>

  </HStack>
);

export default MainNav;
