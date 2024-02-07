import {
  Box, HStack, IconButton, Text, VStack,
} from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import { FaBookMedical } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BreadCrumbNav from '../components/BreadCrumbNav';

const data = [
  {
    id: nanoid(),
    text: 'General Store',
    quantity: '75',
    link: '/',
  },
  {
    id: nanoid(),
    text: 'Pharmaceuticals',
    quantity: 34,
    link: '/pharmaceuticals',
  },
  {
    id: nanoid(),
    text: 'Non Pharmaceuticals',
    quantity: 50,
    link: '/',
  },
];

const Stores = () => {
  const navigate = useNavigate();
  return (
    <VStack
      mt={10}
      height="100vh"
      w="full"
      alignItems="center"
      bgColor="gray.50"
      p={3}
    >
      <BreadCrumbNav />
      <HStack w="full" justifyContent="space-between">
        {data.map((item) => (
          <Box
            rounded="lg"
            // boxShadow="lg"
            p={3}
            key={item.id}
            border="1px"
            borderColor="gray.100"
            onClick={() => navigate('/pharmaceuticals')}
            _hover={{
              cursor: 'pointer',
              boxShadow: 'sm',
            }}
            bgColor="white"
          >
            <IconButton rounded="full">
              <FaBookMedical />
            </IconButton>
            <Box ml={10} w="200px">
              <Text fontSize="lg" color="gray.500">
                {item.text}
              </Text>
              <Text fontSize="2xl" fontWeight="semibold">
                {item.quantity}
              </Text>
            </Box>
          </Box>
        ))}
      </HStack>
    </VStack>
  );
};

export default Stores;
