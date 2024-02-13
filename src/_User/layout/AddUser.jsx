/* eslint-disable no-unused-vars */
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Tag,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Select from 'react-select';
import BreadCrumbNav from '../../components/BreadCrumbNav';

const AddUser = () => {
  const [itemTypeName, setItemType] = useState('');
  const dispatch = useDispatch();

  // const { loading } = useSelector((state) => state.itemType);
  // const departmentData = useSelector((state) => state.departments.data);
  // const userTypeData = useSelector((state) => state.userType.data);

  const inputValues = {
    itemTypeName,
  };

  // const departmentOptions = departmentData && departmentData.map((item) => (
  //   { value: item.id, label: item.departmentName }
  // ));

  // const userTypeOptions = userTypeData && userTypeData.map((item) => (
  //   { value: item.id, label: item.userTypeName }
  // ));

  return (
    <VStack
      w="full"
      h="100vh"
      alignItems="center"
      bgColor="gray.50"
      mt="65px"
      p={3}
    >
      <BreadCrumbNav
        addBtn={false}
      />
      <VStack
        w="50%"
        mt={5}
        bgColor="white"
        boxShadow="lg"
        p={5}
        rounded="lg"
        spacing={4}
      >

        {/* department */}
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input size="lg" placeholder="Enter Full Name" />
        </FormControl>

        {/* department */}
        <FormControl>
          <FormLabel>Mobile Number</FormLabel>
          <Input size="lg" placeholder="Enter Mobile Number" />
        </FormControl>

        {/* email */}
        {/* sub item */}
        <FormControl>
          <FormLabel>Email Address</FormLabel>
          <Input
            placeholder="Enter Email Address"
            value={itemTypeName}
            size="lg"
            onChange={(e) => setItemType(e.target.value)}
          />
        </FormControl>

        {/* department */}
        <FormControl>
          <FormLabel>Select Department</FormLabel>
          <Select />
        </FormControl>

        {/* hospital */}
        <FormControl>
          <HStack
            w="full"
            justifyContent="space-between"
          >
            <FormLabel>Select User Type</FormLabel>
            <Tag colorScheme="green">Add New</Tag>
          </HStack>
          <Select />
        </FormControl>

        <FormControl>
          <HStack
            w="full"
            justifyContent="space-between"
            mb={1}
          >
            <FormLabel>
              Password
            </FormLabel>
            <Button size="sm">Generate</Button>
          </HStack>
          <Input size="lg" placeholder="Enter password" />
        </FormControl>

        <HStack w="full" justifyContent="end">
          <Button
            size="lg"
            colorScheme="blue"
            // onClick={() => dispatch(addItemType(inputValues))}
            w="full"
          >
            {/* {loading ? 'loading...' : 'Save'} */}
            Save
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default AddUser;
