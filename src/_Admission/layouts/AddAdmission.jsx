/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import Select from 'react-select';
import BreadCrumbNav from '../../components/BreadCrumbNav';
import { useGetWardsQuery } from '../../api/ward.api';
// import { useAddVitalSignsMutation } from '../api/vitalSigns.api';

const AddAdmission = () => {
  const [searchParams] = useSearchParams();
  const appointment_id = searchParams.get('appointment_id');

  const { id: patient_id } = useParams();
  const [vitalValues, setVitalValues] = useState({
    temperature: '',
    pulseRate: '',
    respiratoryRate: '',
    systolic: '',
    diastolic: '',
    weight: '',
    height: '',
    bmi: '',
    sp02: '',
  });

  const navigate = useNavigate();

  // const [addVitalSigns, { isLoading, error }] = useAddVitalSignsMutation();

  const inputValues = {
    patient_id,
    appointment_id,
    ...vitalValues,
  };

  const breadCrumbData = [
    {
      id: nanoid(),
      title: 'Patients',
      link: '/patients',
    },
    {
      id: nanoid(),
      // title: `${data?.patient.first_name} ${data?.patient.middle_name}`,
      title: 'Nursing Station',
      link: '/nursing-station',
    },
    {
      id: nanoid(),
      // title: `${data?.patient.first_name} ${data?.patient.middle_name}`,
      title: 'Add Vitals',
      link: '/',
      isCurrentPage: true,
    },
  ];

  const { data } = useGetWardsQuery();
  console.log(data);

  return (
    <VStack
      w="full"
      h="100vh"
      // alignItems="center"
      // justifyContent="center"
      bgColor="gray.50"
      mt="60px"
      p={3}
    >
      <HStack
        w="full"
        bgColor="white"
      >
        <BreadCrumbNav
          addBtn={false}
          breadCrumbData={breadCrumbData}
        />
        <Avatar
          // name={`${data?.patient?.first_name} ${data?.patient?.last_name}`}
          name="jay"
          size="sm"
          fontWeight="bold"
        />
      </HStack>
      <VStack
        w="45%"
        bgColor="white"
        // boxShadow="lg"
        p={5}
        rounded="lg"
        border="1px"
        borderColor="gray.200"
        spacing="1.3rem"
      >
        <HStack w="full" justifyContent="space-between">
          <IconButton
            size="sm"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </IconButton>
          <Text
            fontSize="18px"
            fontWeight="semibold"
          // color="gray.500"
          >
            New Admission
          </Text>
        </HStack>
        {/* sub item */}
        <FormControl>
          <FormLabel
            fontSize="14px"
            fontWeight="bold"
          >
            Select Doctor
          </FormLabel>
          <Select />
        </FormControl>

        {/* item code prefix */}
        <FormControl>
          <FormLabel
            fontSize="14px"
            fontWeight="bold"
          >
            Select Ward
          </FormLabel>
          <Select />
        </FormControl>

        <FormControl>
          <FormLabel
            fontSize="14px"
            fontWeight="bold"
          >
            Select Bed Number
          </FormLabel>
          <Select />
        </FormControl>

        <FormControl>
          <FormLabel
            fontSize="14px"
            fontWeight="bold"
          >
            Select Admission Category
          </FormLabel>
          <Select />
        </FormControl>
        <FormControl>

          <FormLabel
            fontSize="14px"
            fontWeight="bold"
          >
            Referral Type
          </FormLabel>
          <Select />
        </FormControl>

        <FormControl>

          <FormLabel
            fontSize="14px"
            fontWeight="bold"
          >
            Branch
          </FormLabel>
          <Input />
        </FormControl>

        {/* save btn */}
        <Button
          size="md"
          width="full"
          colorScheme="blue"
        // onClick={() => addVitalSigns(inputValues)}
        >
          {/* {isLoading ? 'loading' : 'Save'} */}
          Save
        </Button>
      </VStack>
    </VStack>
  );
};

export default AddAdmission;
