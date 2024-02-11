/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import {
  Avatar,
  Box,
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
// import { useAddVitalSignsMutation } from '../api/vitalSigns.api';

const testedOptions = [
  { value: 0, label: 'NO' },
  { value: 1, label: 'YES' },
];

const keyPopulationOptions = [
  { value: 1, label: 'MSM' },
  { value: 2, label: 'IDU' },
  { value: 3, label: 'Sex Worker' },
  { value: 4, label: 'Others' },
];

const tbOptions = [
  { value: 1, label: 'Presumed TB-Pr TB' },
  { value: 2, label: 'On TB Treatment-TB Tx' },
  { value: 3, label: 'No Signs-NS' },
];

const gbvOptions = [
  { value: 1, label: 'Sexual' },
  { value: 2, label: 'Physical' },
  { value: 3, label: 'Emotional' },
  { value: 4, label: 'NA' },
  { value: 5, label: 'Not Done' },
];

const TestedForm = () => (
  <>
    <FormControl>
      <FormLabel
        fontWeight="bold"
        fontSize="14px"
      >
        Date
      </FormLabel>
      <Input
        type="date"
      />
    </FormControl>

    {/*  */}
    <FormControl>
      <FormLabel
        fontWeight="bold"
        fontSize="14px"
      >
        Test Results
      </FormLabel>
      <Input />
    </FormControl>
  </>
);

const AddEligibilityScreening = () => {
  const [searchParams] = useSearchParams();
  const appointment_id = searchParams.get('appointment_id');
  const [isTested, setIsTested] = useState('');

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
      title: 'Eligibility',
      link: '/',
      isCurrentPage: true,
    },
  ];

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
            fontSize="16px"
            fontWeight="semibold"
            // color="gray.500"
          >
            Eligibility
          </Text>
        </HStack>
        {/* sub item */}

        <FormControl>
          <FormLabel
            fontWeight="bold"
            fontSize="14px"
          >
            Tested for HIV before
          </FormLabel>
          <Select
            options={testedOptions}
            value={isTested}
            onChange={(val) => setIsTested(val)}
          />
        </FormControl>

        {isTested.value === 1 && <TestedForm />}

        {/* item code prefix */}
        <FormControl>
          <FormLabel
            fontSize="14px"
            fontWeight="bold"
          >
            Key Population
          </FormLabel>
          <Select
            options={keyPopulationOptions}
          />
        </FormControl>

        <FormControl>
          <FormLabel
            fontSize="14px"
            fontWeight="bold"
          >
            TB Screening
          </FormLabel>
          <Select
            options={tbOptions}
          />
        </FormControl>

        <FormControl>
          <FormLabel
            fontSize="14px"
            fontWeight="bold"
          >
            GBV
          </FormLabel>
          <Select
            options={gbvOptions}
          />
        </FormControl>
        <FormControl>

          <FormLabel
            fontSize="14px"
            fontWeight="bold"
          >
            Eligible for Testing
          </FormLabel>
          <Select
            options={testedOptions}
          />
        </FormControl>

        <FormControl>

          <FormLabel
            fontSize="14px"
            fontWeight="bold"
          >
            Reason for Testing
          </FormLabel>
          <Input
            // size="lg"
            placeholder="Enter BMI"
            // value={bmi}
            onChange={(e) => setVitalValues({ ...vitalValues, bmi: e.target.value })}
          />
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

export default AddEligibilityScreening;
